// src/routes/matchRoutes.js
const express = require('express');
const matchController = require('../controllers/matchController');
const { verifyToken, checkRole } = require('../middleware/auth');

const router = express.Router();

/**
 * Match Routes
 */

// POST: Create Match (Protected)
router.post('/', verifyToken, matchController.createMatch);

// GET: Get Match Details
router.get('/:id', matchController.getMatch);

// PUT: Update Match Status (Protected)
router.put('/:id/status', verifyToken, matchController.updateMatchStatus);

// PUT: Record Scorecard (Protected)
router.put('/:id/scorecard', verifyToken, matchController.recordScorecard);

// GET: Get Match Prediction
router.get('/:id/prediction', matchController.getMatchPrediction);

// POST: Get Match Analysis (Protected)
router.post('/:id/analysis', verifyToken, matchController.getMatchAnalysis);

// GET: Get Matches by Team
router.get('/team/:teamId', matchController.getMatchesByTeam);

module.exports = router;
