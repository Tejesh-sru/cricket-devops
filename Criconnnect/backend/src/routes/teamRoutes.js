// src/routes/teamRoutes.js
const express = require('express');
const teamController = require('../controllers/teamController');
const { verifyToken, checkRole } = require('../middleware/auth');

const router = express.Router();

/**
 * Team Routes
 */

// POST: Create Team (Protected, Team role only)
router.post('/', verifyToken, teamController.createTeam);

// GET: Get Team Details
router.get('/:id', teamController.getTeam);

// POST: Add Player to Team (Protected)
router.post(
  '/:teamId/players',
  verifyToken,
  teamController.addPlayerToTeam
);

// DELETE: Remove Player from Team (Protected)
router.delete(
  '/:teamId/players/:playerId',
  verifyToken,
  teamController.removePlayerFromTeam
);

// POST: Get Suggested Playing XI
router.post(
  '/:teamId/playing-xi',
  verifyToken,
  teamController.getSuggestedPlayingXI
);

// GET: Get Team Analytics
router.get('/:teamId/analytics', teamController.getTeamAnalytics);

module.exports = router;
