// src/models/Match.js
const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema(
  {
    // Match Information
    title: {
      type: String,
      required: [true, 'Match title is required'],
    },
    matchType: {
      type: String,
      enum: ['T20', 'ODI', 'Test', 'T10', 'franchise'],
      required: true,
    },

    // Teams
    team1Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
    team2Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },

    // Match Details
    venue: {
      type: String,
    },
    matchDate: {
      type: Date,
      required: [true, 'Match date is required'],
    },
    status: {
      type: String,
      enum: ['scheduled', 'live', 'completed', 'cancelled'],
      default: 'scheduled',
    },

    // Umpire (removed)

    // Scores & Results
    scorecard: {
      team1: {
        batting: {
          runs: { type: Number, default: 0 },
          wickets: { type: Number, default: 0 },
          overs: { type: Number, default: 0 },
          extras: { type: Number, default: 0 },
        },
        bowling: [{
          bowlerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PlayerProfile',
          },
          overs: Number,
          runs: Number,
          wickets: Number,
          economy: Number,
        }],
        players: [{
          playerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PlayerProfile',
          },
          role: String, // 'batsman', 'bowler', 'fielder'
          runs: Number,
          ballsFaced: Number,
          wickets: Number,
          runsGiven: Number,
        }],
      },
      team2: {
        batting: {
          runs: { type: Number, default: 0 },
          wickets: { type: Number, default: 0 },
          overs: { type: Number, default: 0 },
          extras: { type: Number, default: 0 },
        },
        bowling: [{
          bowlerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PlayerProfile',
          },
          overs: Number,
          runs: Number,
          wickets: Number,
          economy: Number,
        }],
        players: [{
          playerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PlayerProfile',
          },
          role: String,
          runs: Number,
          ballsFaced: Number,
          wickets: Number,
          runsGiven: Number,
        }],
      },
    },

    // Match Result
    result: {
      winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
      },
      marginType: String, // 'runs' or 'wickets'
      marginValue: Number,
      manOfTheMatch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlayerProfile',
      },
    },

    // AI Analysis
    aiAnalysis: {
      keyMoments: [String],
      turningPoint: String,
      analysis: String,
      performancePrediction: String,
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

module.exports = mongoose.model('Match', matchSchema);
