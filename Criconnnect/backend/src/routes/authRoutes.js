// src/routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

/**
 * Authentication Routes
 */

// POST: Signup
router.post('/signup', authController.signup);

// POST: Login
router.post('/login', authController.login);

// GET: Current User (Protected)
router.get('/me', verifyToken, authController.getCurrentUser);

module.exports = router;
