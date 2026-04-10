// src/controllers/playerController.js
const PlayerProfile = require('../models/PlayerProfile');
const User = require('../models/User');
const AIService = require('../services/aiService');

/**
 * Create Player Profile
 * POST /api/players/profile
 */
exports.createPlayerProfile = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const {
      battingHand,
      battingStyle,
      bowlingHand,
      bowlingType,
      jerseyNumber,
      dateOfBirth,
      height,
      weight,
      yearsActive,
    } = req.body;

    // Check if profile already exists
    let playerProfile = await PlayerProfile.findOne({ userId });

    if (playerProfile) {
      return res.status(400).json({
        success: false,
        message: 'Player profile already exists for this user',
      });
    }

    // Create new player profile
    playerProfile = await PlayerProfile.create({
      userId,
      battingHand,
      battingStyle,
      bowlingHand,
      bowlingType,
      jerseyNumber,
      dateOfBirth,
      height,
      weight,
      yearsActive,
    });

    return res.status(201).json({
      success: true,
      message: 'Player profile created successfully',
      data: playerProfile,
    });
  } catch (error) {
    console.error('Create player profile error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error creating player profile',
      error: error.message,
    });
  }
};

/**
 * Get Player Profile
 * GET /api/players/profile/:id
 */
exports.getPlayerProfile = async (req, res, next) => {
  try {
    const { id } = req.params;

    const playerProfile = await PlayerProfile.findById(id).populate('userId', 'firstName lastName email phone location');

    if (!playerProfile) {
      return res.status(404).json({
        success: false,
        message: 'Player profile not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: playerProfile,
    });
  } catch (error) {
    console.error('Get player profile error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching player profile',
      error: error.message,
    });
  }
};

/**
 * Get Player Profile by User ID
 * GET /api/players/profile/user/:userId
 */
exports.getPlayerProfileByUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const playerProfile = await PlayerProfile.findOne({ userId }).populate('userId', 'firstName lastName email phone location');

    if (!playerProfile) {
      return res.status(404).json({
        success: false,
        message: 'Player profile not found for this user',
      });
    }

    return res.status(200).json({
      success: true,
      data: playerProfile,
    });
  } catch (error) {
    console.error('Get player profile by user error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching player profile by user',
      error: error.message,
    });
  }
};

/**
 * Update Player Profile
 * PUT /api/players/profile/:id
 */
exports.updatePlayerProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;

    let playerProfile = await PlayerProfile.findById(id);

    if (!playerProfile) {
      return res.status(404).json({
        success: false,
        message: 'Player profile not found',
      });
    }

    // Ensure the requester owns this profile
    if (req.user && req.user.userId && String(playerProfile.userId) !== String(req.user.userId)) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: you can only update your own profile',
      });
    }

    // Only allow specific profile fields to be updated
    const allowedFields = [
      'battingHand',
      'battingStyle',
      'bowlingHand',
      'bowlingType',
      'jerseyNumber',
      'dateOfBirth',
      'height',
      'weight',
      'yearsActive',
      'location',
    ];

    allowedFields.forEach((field) => {
      if (Object.prototype.hasOwnProperty.call(updateFields, field)) {
        playerProfile[field] = updateFields[field];
      }
    });

    await playerProfile.save();

    return res.status(200).json({
      success: true,
      message: 'Player profile updated successfully',
      data: playerProfile,
    });
  } catch (error) {
    console.error('Update player profile error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error updating player profile',
      error: error.message,
    });
  }
};

/**
 * Update Player Stats
 * PUT /api/players/stats/:id
 */
exports.updatePlayerStats = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { battingStats, bowlingStats, performanceHistory } = req.body;

    let playerProfile = await PlayerProfile.findById(id);

    if (!playerProfile) {
      return res.status(404).json({
        success: false,
        message: 'Player profile not found',
      });
    }

    // Update stats
    if (battingStats) {
      // Coerce numeric fields and compute average using notOuts
      const bs = { ...playerProfile.battingStats.toObject(), ...battingStats };
      bs.matches = parseInt(bs.matches) || 0;
      bs.innings = parseInt(bs.innings) || 0;
      bs.runs = parseFloat(bs.runs) || 0;
      bs.notOuts = parseInt(bs.notOuts) || 0;
      const outs = Math.max(0, bs.innings - bs.notOuts);
      if (bs.innings > 0 && bs.innings === bs.notOuts) {
        // All innings are not-outs: batting average equals total runs
        bs.average = parseFloat(bs.runs.toFixed ? bs.runs.toFixed(2) : Number(bs.runs).toFixed(2));
      } else {
        bs.average = outs > 0 ? parseFloat((bs.runs / outs).toFixed(2)) : 0;
      }
      bs.strikeRate = parseFloat(bs.strikeRate) || 0;
      bs.centuries = parseInt(bs.centuries) || 0;
      bs.fifties = parseInt(bs.fifties) || 0;
      bs.highestScore = parseInt(bs.highestScore) || 0;
      playerProfile.battingStats = bs;
    }

    if (bowlingStats) {
      // Coerce numeric fields and compute bowling average
      const bls = { ...playerProfile.bowlingStats.toObject(), ...bowlingStats };
      bls.matches = parseInt(bls.matches) || 0;
      bls.innings = parseInt(bls.innings) || 0;
      bls.runs = parseFloat(bls.runs) || 0;
      bls.wickets = parseInt(bls.wickets) || 0;
      bls.fiveWickets = parseInt(bls.fiveWickets) || 0;
      bls.threeWickets = parseInt(bls.threeWickets) || 0;
      bls.average = bls.wickets > 0 ? +(bls.runs / bls.wickets).toFixed(2) : 0;
      bls.strikeRate = parseFloat(bls.strikeRate) || 0;
      bls.economy = parseFloat(bls.economy) || 0;
      bls.bestFigures = bls.bestFigures || null;
      playerProfile.bowlingStats = bls;
    }

    if (performanceHistory) {
      playerProfile.performanceHistory.push(performanceHistory);
    }

    // Run AI analysis
    const aiAnalysis = AIService.analyzePlayerPerformance(playerProfile);
    playerProfile.strengths = aiAnalysis.strengths;
    playerProfile.weaknesses = aiAnalysis.weaknesses;
    playerProfile.improvements = aiAnalysis.improvements;
    playerProfile.talentRating = aiAnalysis.overallRating;

    await playerProfile.save();

    return res.status(200).json({
      success: true,
      message: 'Player stats updated successfully',
      data: playerProfile,
      aiAnalysis,
    });
  } catch (error) {
    console.error('Update player stats error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error updating player stats',
      error: error.message,
    });
  }
};

/**
 * Get AI Analysis for Player
 * GET /api/players/:id/analysis
 */
exports.getPlayerAnalysis = async (req, res, next) => {
  try {
    const { id } = req.params;

    const playerProfile = await PlayerProfile.findById(id);

    if (!playerProfile) {
      return res.status(404).json({
        success: false,
        message: 'Player profile not found',
      });
    }

    const analysis = AIService.analyzePlayerPerformance(playerProfile);
    const improvements = AIService.generateImprovementSuggestions(playerProfile);

    return res.status(200).json({
      success: true,
      data: {
        analysis,
        improvements,
      },
    });
  } catch (error) {
    console.error('Get player analysis error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching player analysis',
      error: error.message,
    });
  }
};

/**
 * Search Players (for Scouts)
 * GET /api/players/search
 */
exports.searchPlayers = async (req, res, next) => {
  try {
    const { location, battingStyle, bowlingType, minRating, maxRating } = req.query;

    const filter = {};

    if (location) {
      // Search by location - use regex for flexible matching
      const locationFilter = {};
      if (location.country) locationFilter['location.country'] = new RegExp(location.country, 'i');
      if (location.state) locationFilter['location.state'] = new RegExp(location.state, 'i');
      if (location.city) locationFilter['location.city'] = new RegExp(location.city, 'i');

      Object.assign(filter, locationFilter);
    }

    if (battingStyle) {
      filter.battingStyle = battingStyle;
    }

    if (bowlingType) {
      filter.bowlingType = bowlingType;
    }

    if (minRating || maxRating) {
      filter.talentRating = {};
      if (minRating) filter.talentRating.$gte = parseInt(minRating);
      if (maxRating) filter.talentRating.$lte = parseInt(maxRating);
    }

    const players = await PlayerProfile.find(filter)
      .populate('userId', 'firstName lastName email phone location')
      .sort({ talentRating: -1 });

    return res.status(200).json({
      success: true,
      count: players.length,
      data: players,
    });
  } catch (error) {
    console.error('Search players error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error searching players',
      error: error.message,
    });
  }
};

/**
 * Get Top Players by Rating
 * GET /api/players/leaderboard
 */
exports.getLeaderboard = async (req, res, next) => {
  try {
    const { limit = 10, category = 'batting' } = req.query;

    let sortField = '-talentRating';

    if (category === 'batting') {
      sortField = '-battingStats.average';
    } else if (category === 'bowling') {
      sortField = '-bowlingStats.wickets';
    }

    const players = await PlayerProfile.find()
      .populate('userId', 'firstName lastName email')
      .sort(sortField)
      .limit(parseInt(limit));

    return res.status(200).json({
      success: true,
      category,
      count: players.length,
      data: players,
    });
  } catch (error) {
    console.error('Get leaderboard error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching leaderboard',
      error: error.message,
    });
  }
};
