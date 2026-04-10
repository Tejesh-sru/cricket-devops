// src/models/PlayerProfile.js
const mongoose = require('mongoose');

const playerProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      unique: true,
    },

    // Basic Stats
    jerseyNumber: {
      type: Number,
      min: 0,
      max: 99,
    },
    dateOfBirth: {
      type: Date,
    },
    height: {
      type: Number, // in cm
    },
    weight: {
      type: Number, // in kg
    },

    // Career Information
    yearsActive: {
      type: Number,
    },
    currentStatus: {
      type: String,
      enum: ['active', 'inactive', 'retired'],
      default: 'active',
    },

    // Batting Information
    battingHand: {
      type: String,
      enum: ['right', 'left', 'ambidextrous'],
    },
    battingStyle: {
      type: String,
      enum: ['aggressive', 'orthodox', 'defensive', 'balanced'],
    },
    battingStats: {
      matches: { type: Number, default: 0 },
      innings: { type: Number, default: 0 },
      runs: { type: Number, default: 0 },
      average: { type: Number, default: 0 },
      notOuts: { type: Number, default: 0 },
      strikeRate: { type: Number, default: 0 },
      centuries: { type: Number, default: 0 },
      fifties: { type: Number, default: 0 },
      highestScore: { type: Number, default: 0 },
    },

    // Bowling Information
    bowlingHand: {
      type: String,
      enum: ['right', 'left'],
    },
    bowlingType: {
      type: String,
      enum: ['fast', 'medium', 'slow', 'spinner', 'all-rounder', 'non-bowler'],
    },
    bowlingStats: {
      matches: { type: Number, default: 0 },
      innings: { type: Number, default: 0 },
      runs: { type: Number, default: 0 },
      wickets: { type: Number, default: 0 },
      average: { type: Number, default: 0 },
      fiveWickets: { type: Number, default: 0 },
      threeWickets: { type: Number, default: 0 },
      strikeRate: { type: Number, default: 0 },
      economy: { type: Number, default: 0 },
      bestFigures: { type: String, default: null },
    },

    // Strengths & Weaknesses (AI Generated)
    strengths: [{
      type: String,
    }],
    weaknesses: [{
      type: String,
    }],
    improvements: [{
      type: String,
    }],

    // Performance Records
    performanceHistory: [{
      date: Date,
      matchType: String,
      opponent: String,
      runsScored: Number,
      ballsFaced: Number,
      wickets: Number,
      runsGiven: Number,
      performance: String, // 'excellent', 'good', 'average', 'poor'
    }],

    // Contract/Team Information
    currentTeamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      default: null,
    },

    // AI Talent Rating (0-100)
    talentRating: {
      type: Number,
      min: 0,
      max: 100,
      default: 50,
    },
  },
  { timestamps: true }
);

// Ensure uniqueness index on userId (redundant with `unique: true` but explicit)
playerProfileSchema.index({ userId: 1 }, { unique: true });

// Instance helper to update talent rating
playerProfileSchema.methods.updateTalentRating = function (score) {
  this.talentRating = score;
  return this.save();
};

// Clean up JSON output
playerProfileSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model('PlayerProfile', playerProfileSchema);
