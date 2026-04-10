// src/models/Team.js
const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema(
  {
    // Team Information
    name: {
      type: String,
      required: [true, 'Team name is required'],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
    },
    logo: {
      type: String,
      default: null,
    },

    // Captain (must be a User with role 'team')
    captainId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Captain ID is required'],
    },

    // Players roster
    players: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PlayerProfile',
    }],

    // Team Manager/Staff
    manager: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      role: String, // 'manager', 'coach', 'analyst'
    },

    // Location
    location: {
      country: String,
      state: String,
      city: String,
      homeGround: String,
    },

    // Team Statistics
    statistics: {
      matchesPlayed: { type: Number, default: 0 },
      wins: { type: Number, default: 0 },
      losses: { type: Number, default: 0 },
      draws: { type: Number, default: 0 },
      winPercentage: { type: Number, default: 0 },
    },

    // AI Strategy Recommendations
    aiStrategy: {
      predictedLineup: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlayerProfile',
      }],
      battingOrder: [String],
      bowlingPlan: [String],
      lastUpdated: Date,
    },

    // Timestamps
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Team', teamSchema);
