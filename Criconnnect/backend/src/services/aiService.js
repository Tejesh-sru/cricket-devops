// src/services/aiService.js

/**
 * AI Service for Cricket Analysis
 * Uses mock AI logic - Can integrate with Groq, OpenAI, or other APIs
 */

class AIService {
  /**
   * Analyze player performance
   * @param {Object} playerStats - Player statistics object
   * @returns {Object} Analysis with strengths, weaknesses, improvements
   */
  static analyzePlayerPerformance(playerStats) {
    const analysis = {
      strengths: [],
      weaknesses: [],
      improvements: [],
      overallRating: 0,
    };

    // Batting Analysis
    if (playerStats.battingStats) {
      const { average, strikeRate, centuries } = playerStats.battingStats;

      if (average && average > 40) {
        analysis.strengths.push('Strong batting average');
      } else if (average && average < 20) {
        analysis.weaknesses.push('Low batting average - needs improvement');
      }

      if (strikeRate && strikeRate > 130) {
        analysis.strengths.push('Excellent strike rate');
      } else if (strikeRate && strikeRate < 80) {
        analysis.weaknesses.push('Low strike rate - work on aggression');
      }

      if (centuries && centuries > 0) {
        analysis.strengths.push(`${centuries} centuries - excellent temperament`);
      }
    }

    // Bowling Analysis
    if (playerStats.bowlingStats) {
      const { average, economy, wickets } = playerStats.bowlingStats;

      if (economy && economy < 6) {
        analysis.strengths.push('Excellent bowling economy');
      } else if (economy && economy > 8) {
        analysis.weaknesses.push('High economy rate - improve line and length');
      }

      if (average && average < 30) {
        analysis.strengths.push('Low bowling average');
      }

      if (wickets && wickets > 20) {
        analysis.strengths.push(`${wickets} wickets - consistent performer`);
      }
    }

    // Suggestions
    if (playerStats.battingStyle === 'aggressive' && playerStats.battingStats?.strikeRate < 100) {
      analysis.improvements.push('Increase ball-striking aggression despite aggressive style label');
    }

    if (playerStats.currentStatus === 'active') {
      analysis.improvements.push('Continue fitness training and skill development');
      analysis.improvements.push('Focus on mental resilience in high-pressure matches');
    }

    // Calculate overall rating (0-100)
    analysis.overallRating = this.calculateTalentRating(playerStats);

    return analysis;
  }

  /**
   * Calculate talent rating for players
   * @param {Object} playerStats - Player statistics
   * @returns {Number} Rating 0-100
   */
  static calculateTalentRating(playerStats) {
    let rating = 50; // Base rating

    // Batting contribution
    if (playerStats.battingStats) {
      const { average = 0, strikeRate = 0, centuries = 0 } = playerStats.battingStats;
      rating += Math.min(average / 2, 15); // Max 15 points
      rating += Math.min(strikeRate / 20, 10); // Max 10 points
      rating += Math.min(centuries * 5, 10); // Max 10 points
    }

    // Bowling contribution
    if (playerStats.bowlingStats) {
      const { wickets = 0, economy = 8 } = playerStats.bowlingStats;
      rating += Math.min(wickets, 10); // Max 10 points
      rating += Math.max(12 - economy, 0); // Max 12 points (inverse economy)
    }

    // Consistency bonus
    if (playerStats.currentStatus === 'active') {
      rating += 5;
    }

    return Math.min(Math.round(rating), 100);
  }

  /**
   * Generate playing XI suggestions
   * @param {Array} players - Array of player profiles
   * @param {String} matchType - Type of match (T20, ODI, Test)
   * @returns {Object} Playing XI suggestion
   */
  static suggestPlayingXI(players, matchType = 'T20') {
    if (!players || players.length === 0) {
      return { error: 'No players available' };
    }

    // Score players based on role and performance
    const scoredPlayers = players.map((player) => {
      let score = player.talentRating || 50;

      // T20 preference: Strike rate and quick scoring
      if (matchType === 'T20') {
        const strikeRate = player.battingStats?.strikeRate || 0;
        score += strikeRate > 130 ? 10 : 0;
      }

      // ODI: Balance
      if (matchType === 'ODI') {
        const average = player.battingStats?.average || 0;
        score += average > 40 ? 10 : 0;
      }

      return { ...player, score };
    });

    // Sort by score
    scoredPlayers.sort((a, b) => b.score - a.score);

    // Select 11 players (prefer 5-6 batsmen, 4 bowlers, 1 all-rounder)
    const xi = scoredPlayers.slice(0, 11);

    // Create batting order (top performers first)
    const battingOrder = xi
      .filter((p) => p.battingStats?.average > 20)
      .sort((a, b) => (b.battingStats?.average || 0) - (a.battingStats?.average || 0))
      .slice(0, 6)
      .map((p) => ({ ...p, position: 'batsman' }));

    const bowlers = xi
      .filter(
        (p) =>
          !battingOrder.find((b) => b._id === p._id) &&
          p.bowlingStats?.wickets > 0
      )
      .map((p) => ({ ...p, position: 'bowler' }));

    return {
      playingXI: [...battingOrder, ...bowlers].slice(0, 11),
      alternates: xi.slice(11, 13),
      matchType,
      recommendations: [
        'Ensure balanced team combination',
        'Check recent form of selected players',
        'Consider ground conditions',
        `${matchType} strategy: ${this.getStrategyTips(matchType)}`,
      ],
    };
  }

  /**
   * Get strategy tips for different match types
   * @param {String} matchType - Type of match
   * @returns {String} Strategy tips
   */
  static getStrategyTips(matchType) {
    const strategies = {
      T20: 'Aggressive batting, death overs bowling, quick wickets focused. Use aggressive field placements.',
      ODI: 'Balanced approach, build innings, controlled bowling in middle overs. Rotate strike, save bowlers for death.',
      Test: 'Patience in batting, build partnerships, accurate bowling. Focus on consistency and line/length.',
      T10: 'Explosive batting, power hitting, aggressive bowling. Maximize every ball.',
    };

    return strategies[matchType] || strategies['T20'];
  }

  /**
   * Generate performance improvement suggestions
   * @param {Object} playerStats - Player statistics
   * @returns {Array} Improvement suggestions
   */
  static generateImprovementSuggestions(playerStats) {
    const suggestions = [];

    // Batting improvements
    if (playerStats.battingStats) {
      const avg = playerStats.battingStats.average || 0;
      if (avg < 25) {
        suggestions.push({
          area: 'Batting',
          suggestion: 'Work on shot selection and technique training',
          priority: 'high',
        });
      }

      const sr = playerStats.battingStats.strikeRate || 0;
      if (sr < 90) {
        suggestions.push({
          area: 'Batting',
          suggestion: 'Increase aggression, focus on boundary hitting',
          priority: 'high',
        });
      }
    }

    // Bowling improvements
    if (playerStats.bowlingStats) {
      const economy = playerStats.bowlingStats.economy || 0;
      if (economy > 7) {
        suggestions.push({
          area: 'Bowling',
          suggestion: 'Focus on line and length, reduce loose deliveries',
          priority: 'high',
        });
      }

      const avg = playerStats.bowlingStats.average || 0;
      if (avg > 35) {
        suggestions.push({
          area: 'Bowling',
          suggestion: 'Improve bowling variations and yorkers',
          priority: 'medium',
        });
      }
    }

    // Fitness suggestions
    suggestions.push({
      area: 'Fitness',
      suggestion: 'Regular gym training and flexibility work',
      priority: 'medium',
    });

    // Mental suggestions
    suggestions.push({
      area: 'Mental',
      suggestion: 'Work on match awareness and decision-making',
      priority: 'medium',
    });

    return suggestions;
  }

  /**
   * Predict match outcome (Mock implementation)
   * @param {Object} team1Stats - Team 1 statistics
   * @param {Object} team2Stats - Team 2 statistics
   * @returns {Object} Prediction
   */
  static predictMatchOutcome(team1Stats, team2Stats) {
    const team1Score = (team1Stats.talentRating || 50) + Math.random() * 20;
    const team2Score = (team2Stats.talentRating || 50) + Math.random() * 20;

    const probability = team1Score / (team1Score + team2Score);

    return {
      favoredTeam: probability > 0.5 ? 'team1' : 'team2',
      team1WinProbability: (probability * 100).toFixed(2),
      team2WinProbability: ((1 - probability) * 100).toFixed(2),
      keyFactors: [
        'Recent form and consistency',
        'Head-to-head record',
        'Player injuries and availability',
        'Home ground advantage',
        'Weather conditions',
      ],
    };
  }
}

module.exports = AIService;
