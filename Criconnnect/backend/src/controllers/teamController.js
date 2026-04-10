// src/controllers/teamController.js
const Team = require('../models/Team');
const PlayerProfile = require('../models/PlayerProfile');
const User = require('../models/User');
const AIService = require('../services/aiService');

/**
 * Create Team
 * POST /api/teams
 */
exports.createTeam = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { name, description, location, homeGround } = req.body;

    // Any authenticated user can create a team; creator becomes captain

    // Check if team already exists
    const existingTeam = await Team.findOne({ name });
    if (existingTeam) {
      return res.status(400).json({
        success: false,
        message: 'Team with this name already exists',
      });
    }

    // Create team
    const team = await Team.create({
      name,
      description,
      captainId: userId,
      location,
    });

    return res.status(201).json({
      success: true,
      message: 'Team created successfully',
      data: team,
    });
  } catch (error) {
    console.error('Create team error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error creating team',
      error: error.message,
    });
  }
};

/**
 * Get Team Details
 * GET /api/teams/:id
 */
exports.getTeam = async (req, res, next) => {
  try {
    const { id } = req.params;

    const team = await Team.findById(id)
      .populate('captainId', 'firstName lastName email')
      .populate('players')
      .populate('aiStrategy.predictedLineup');

    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: team,
    });
  } catch (error) {
    console.error('Get team error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching team',
      error: error.message,
    });
  }
};

/**
 * Add Player to Team
 * POST /api/teams/:teamId/players
 */
exports.addPlayerToTeam = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const { playerId } = req.body;
    const userId = req.user.userId;

    // Verify user is team captain
    const team = await Team.findById(teamId);
    if (!team || team.captainId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Only team captain can add players',
      });
    }

    // Check if player already in team
    if (team.players.includes(playerId)) {
      return res.status(400).json({
        success: false,
        message: 'Player already in team',
      });
    }

    // Add player
    team.players.push(playerId);
    await team.save();

    // Update player's current team
    await PlayerProfile.findByIdAndUpdate(playerId, { currentTeamId: teamId });

    return res.status(200).json({
      success: true,
      message: 'Player added to team',
      data: team,
    });
  } catch (error) {
    console.error('Add player to team error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error adding player to team',
      error: error.message,
    });
  }
};

/**
 * Remove Player from Team
 * DELETE /api/teams/:teamId/players/:playerId
 */
exports.removePlayerFromTeam = async (req, res, next) => {
  try {
    const { teamId, playerId } = req.params;
    const userId = req.user.userId;

    const team = await Team.findById(teamId);
    if (!team || team.captainId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Only team captain can remove players',
      });
    }

    // Remove player
    team.players = team.players.filter((id) => id.toString() !== playerId);
    await team.save();

    // Update player's team
    await PlayerProfile.findByIdAndUpdate(playerId, { currentTeamId: null });

    return res.status(200).json({
      success: true,
      message: 'Player removed from team',
      data: team,
    });
  } catch (error) {
    console.error('Remove player error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error removing player',
      error: error.message,
    });
  }
};

/**
 * Get Playing XI Suggestion
 * POST /api/teams/:teamId/playing-xi
 */
exports.getSuggestedPlayingXI = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const { matchType = 'T20' } = req.body;

    const team = await Team.findById(teamId).populate('players');

    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team not found',
      });
    }

    // Get AI suggestion
    const suggestion = AIService.suggestPlayingXI(team.players, matchType);

    // Update team's AI strategy
    team.aiStrategy.predictedLineup = suggestion.playingXI.map((p) => p._id);
    team.aiStrategy.lastUpdated = new Date();
    await team.save();

    return res.status(200).json({
      success: true,
      data: suggestion,
    });
  } catch (error) {
    console.error('Get playing XI error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error generating playing XI',
      error: error.message,
    });
  }
};

/**
 * Get Team Analytics
 * GET /api/teams/:teamId/analytics
 */
exports.getTeamAnalytics = async (req, res, next) => {
  try {
    const { teamId } = req.params;

    const team = await Team.findById(teamId).populate('players');

    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team not found',
      });
    }

    // Calculate team analytics
    const avgBattingAverage =
      team.players.reduce((sum, p) => sum + (p.battingStats?.average || 0), 0) / team.players.length;
    const avgStrikeRate =
      team.players.reduce((sum, p) => sum + (p.battingStats?.strikeRate || 0), 0) / team.players.length;
    const totalWickets = team.players.reduce((sum, p) => sum + (p.bowlingStats?.wickets || 0), 0);

    const analytics = {
      teamName: team.name,
      totalPlayers: team.players.length,
      statistics: team.statistics,
      averageBattingAverage: avgBattingAverage.toFixed(2),
      averageStrikeRate: avgStrikeRate.toFixed(2),
      totalWickets,
      topBatsmen: team.players
        .filter((p) => p.battingStats?.average > 0)
        .sort((a, b) => (b.battingStats?.average || 0) - (a.battingStats?.average || 0))
        .slice(0, 5),
      topBowlers: team.players
        .filter((p) => p.bowlingStats?.wickets > 0)
        .sort((a, b) => (b.bowlingStats?.wickets || 0) - (a.bowlingStats?.wickets || 0))
        .slice(0, 5),
    };

    return res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    console.error('Get team analytics error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching team analytics',
      error: error.message,
    });
  }
};
