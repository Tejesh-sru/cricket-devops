// src/controllers/matchController.js
const Match = require('../models/Match');
const Team = require('../models/Team');
const AIService = require('../services/aiService');

/**
 * Create Match
 * POST /api/matches
 */
exports.createMatch = async (req, res, next) => {
  try {
    const { title, matchType, team1Id, team2Id, venue, matchDate } = req.body;

    // Validation
    if (!title || !matchType || !team1Id || !team2Id || !matchDate) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Create match
    const match = await Match.create({
      title,
      matchType,
      team1Id,
      team2Id,
      venue,
      matchDate,
      status: 'scheduled',
    });

    return res.status(201).json({
      success: true,
      message: 'Match created successfully',
      data: match,
    });
  } catch (error) {
    console.error('Create match error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error creating match',
      error: error.message,
    });
  }
};

/**
 * Get Match Details
 * GET /api/matches/:id
 */
exports.getMatch = async (req, res, next) => {
  try {
    const { id } = req.params;

    const match = await Match.findById(id)
      .populate('team1Id')
      .populate('team2Id')
      .populate('scorecard.team1.bowling.bowlerId')
      .populate('scorecard.team2.bowling.bowlerId');

    if (!match) {
      return res.status(404).json({
        success: false,
        message: 'Match not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: match,
    });
  } catch (error) {
    console.error('Get match error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching match',
      error: error.message,
    });
  }
};

/**
 * Update Match Status
 * PUT /api/matches/:id/status
 */
exports.updateMatchStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const match = await Match.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!match) {
      return res.status(404).json({
        success: false,
        message: 'Match not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Match status updated',
      data: match,
    });
  } catch (error) {
    console.error('Update match status error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error updating match status',
      error: error.message,
    });
  }
};

/**
 * Record Match Scorecard
 * PUT /api/matches/:id/scorecard
 */
exports.recordScorecard = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { scorecard, result } = req.body;

    let match = await Match.findById(id);

    if (!match) {
      return res.status(404).json({
        success: false,
        message: 'Match not found',
      });
    }

    // Update scorecard
    if (scorecard) {
      match.scorecard = scorecard;
    }

    // Update result
    if (result) {
      match.result = result;
      match.status = 'completed';
    }

    await match.save();

    return res.status(200).json({
      success: true,
      message: 'Scorecard updated successfully',
      data: match,
    });
  } catch (error) {
    console.error('Record scorecard error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error recording scorecard',
      error: error.message,
    });
  }
};

/**
 * Get Match Prediction
 * GET /api/matches/:id/prediction
 */
exports.getMatchPrediction = async (req, res, next) => {
  try {
    const { id } = req.params;

    const match = await Match.findById(id)
      .populate('team1Id')
      .populate('team2Id');

    if (!match) {
      return res.status(404).json({
        success: false,
        message: 'Match not found',
      });
    }

    // Get team statistics
    const team1Stats = match.team1Id;
    const team2Stats = match.team2Id;

    // Use AI service to predict
    const prediction = AIService.predictMatchOutcome(team1Stats, team2Stats);

    return res.status(200).json({
      success: true,
      data: {
        ...prediction,
        matchType: match.matchType,
        venue: match.venue,
      },
    });
  } catch (error) {
    console.error('Get prediction error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching prediction',
      error: error.message,
    });
  }
};

/**
 * Get Match Analysis (AI Generated)
 * POST /api/matches/:id/analysis
 */
exports.getMatchAnalysis = async (req, res, next) => {
  try {
    const { id } = req.params;

    const match = await Match.findById(id);

    if (!match) {
      return res.status(404).json({
        success: false,
        message: 'Match not found',
      });
    }

    if (match.status !== 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Match must be completed for analysis',
      });
    }

    // Mock AI analysis
    const analysis = {
      keyMoments: [
        'Opening partnership set the tone',
        'Middle-order collapse in 10th over',
        'Death overs recovery',
        'Excellent bowling in powerplay',
      ],
      turningPoint: 'Run out in 15th over changed match momentum',
      analysis: 'Team 1 dominated first half but Team 2 made a strong comeback. Bowling in death overs was decisive.',
      performancePrediction: 'Both teams showed good balance. Consistency in batting and bowling is key for future matches.',
    };

    match.aiAnalysis = analysis;
    await match.save();

    return res.status(200).json({
      success: true,
      data: analysis,
    });
  } catch (error) {
    console.error('Get match analysis error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching match analysis',
      error: error.message,
    });
  }
};

/**
 * Get Matches by Team
 * GET /api/matches/team/:teamId
 */
exports.getMatchesByTeam = async (req, res, next) => {
  try {
    const { teamId } = req.params;

    const matches = await Match.find({
      $or: [{ team1Id: teamId }, { team2Id: teamId }],
    })
      .populate('team1Id', 'name')
      .populate('team2Id', 'name')
      .sort({ matchDate: -1 });

    return res.status(200).json({
      success: true,
      count: matches.length,
      data: matches,
    });
  } catch (error) {
    console.error('Get matches by team error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching matches',
      error: error.message,
    });
  }
};
