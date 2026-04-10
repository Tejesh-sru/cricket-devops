// src/utils/tokenGenerator.js
const jwt = require('jsonwebtoken');

/**
 * Generate JWT Token
 * @param {String} userId - User ID
 * @param {String} role - User Role
 * @returns {String} JWT Token
 */
const generateToken = (userId, role) => {
  try {
    const payload = {
      userId,
      role,
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || 'your_super_secret_jwt_key_change_in_production',
      {
        expiresIn: process.env.JWT_EXPIRE || '7d',
      }
    );

    return token;
  } catch (error) {
    console.error('Token generation error:', error);
    throw error;
  }
};

/**
 * Verify JWT Token
 * @param {String} token - JWT Token
 * @returns {Object} Decoded token payload
 */
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your_super_secret_jwt_key_change_in_production'
    );
    return decoded;
  } catch (error) {
    console.error('Token verification error:', error);
    throw error;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
