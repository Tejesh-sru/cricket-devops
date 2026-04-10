// src/routes/playerRoutes.js
const express = require('express');
const playerController = require('../controllers/playerController');
const { verifyToken, checkRole } = require('../middleware/auth');

const router = express.Router();

/**
 * Player Routes
 */

// POST: Create Player Profile (Protected, Player only)
router.post(
  '/profile',
  verifyToken,
  checkRole(['player']),
  playerController.createPlayerProfile
);

// GET: Get Player Profile by User ID
router.get('/profile/user/:userId', playerController.getPlayerProfileByUser);

// GET: Get Player Profile
// GET: Get Player Profile by Profile ID
router.get('/profile/:id', playerController.getPlayerProfile);

// PUT: Update Player Profile (Protected, Player only)
router.put(
  '/profile/:id',
  verifyToken,
  checkRole(['player']),
  playerController.updatePlayerProfile
);

// PUT: Update Player Stats (Protected, Player only)
router.put(
  '/stats/:id',
  verifyToken,
  checkRole(['player']),
  playerController.updatePlayerStats
);

// GET: Get AI Analysis for Player
router.get('/:id/analysis', playerController.getPlayerAnalysis);

// GET: Search Players
router.get('/search', playerController.searchPlayers);

// GET: Leaderboard
router.get('/leaderboard', playerController.getLeaderboard);

module.exports = router;
