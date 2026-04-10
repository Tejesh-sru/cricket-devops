# Cricket Intelligence Platform - API Documentation

## Base URL
```
http://localhost:5000/api
```
## Scout Endpoints

Scout APIs and the `scouts` collection have been removed in this release. Related endpoints and role-based protections referencing `Scout` are no longer supported.

---
```

---

## Player Endpoints

### 1. Create Player Profile
**Endpoint**: `POST /players/profile`

**Required Role**: Player

**Request Body**:
```json
{
  "battingHand": "right",
  "battingStyle": "aggressive",
  "bowlingHand": "right",
  "bowlingType": "fast",
  "jerseyNumber": 18,
  "dateOfBirth": "1988-11-05",
  "height": 185,
  "weight": 84,
  "yearsActive": 12
}
```

**Response**:
```json
{
  "success": true,
  "message": "Player profile created successfully",
  "data": {
    "_id": "63f7a1b2a1b2c1d1e1f1g1h2",
    "userId": "63f7a1b2a1b2c1d1e1f1g1h1",
    "battingHand": "right",
    "battingStyle": "aggressive",
    "battingStats": {
      "matches": 0,
      "innings": 0,
      "runs": 0,
      "average": 0,
      "strikeRate": 0,
      "centuries": 0,
      "fifties": 0
    },
    "talentRating": 50,
    "createdAt": "2024-01-10T10:00:00Z"
  }
}
```

---

### 2. Get Player Profile
**Endpoint**: `GET /players/profile/:id`

**Parameters**:
- `id` (string): Player Profile ID

**Response**:
```json
{
  "success": true,
  "data": {
    "_id": "63f7a1b2a1b2c1d1e1f1g1h2",
    "userId": {
      "_id": "63f7a1b2a1b2c1d1e1f1g1h1",
      "firstName": "Virat",
      "lastName": "Kohli",
      "email": "virat@cricket.com"
    },
    "battingHand": "right",
    "battingStyle": "aggressive",
    "battingStats": {
      "matches": 150,
      "innings": 150,
      "runs": 7500,
      "average": 50.5,
      "strikeRate": 125,
      "centuries": 25,
      "fifties": 35,
      "highestScore": 183
    },
    "bowlingStats": {
      "matches": 0,
      "wickets": 0
    },
    "strengths": [],
    "weaknesses": [],
    "talentRating": 85,
    "currentTeamId": "63f7a1b2a1b2c1d1e1f1g1h3"
  }
}
```

---

### 3. Update Player Stats
**Endpoint**: `PUT /players/stats/:id`

**Required Role**: Player

**Request Body**:
```json
{
  "battingStats": {
    "matches": 151,
    "innings": 151,
    "runs": 7608,
    "average": 50.4,
    "strikeRate": 124.9,
    "centuries": 26,
    "fifties": 35,
    "highestScore": 186
  },
  "bowlingStats": {
    "wickets": 5,
    "economy": 7.5
  },
  "performanceHistory": {
    "date": "2024-01-10",
    "matchType": "T20",
    "opponent": "Delhi Dragons",
    "runsScored": 89,
    "ballsFaced": 48,
    "performance": "excellent"
  }
}
```

**Response**:
```json
{
  "success": true,
  "message": "Player stats updated successfully",
  "data": { ... },
  "aiAnalysis": {
    "strengths": [
      "Strong batting average",
      "Excellent strike rate"
    ],
    "weaknesses": [],
    "improvements": [
      "Continue fitness training"
    ],
    "overallRating": 87
  }
}
```

---

### 4. Get Player Analysis
**Endpoint**: `GET /players/:id/analysis`

**Response**:
```json
{
  "success": true,
  "data": {
    "analysis": {
      "strengths": ["High average", "Good strike rate"],
      "weaknesses": [],
      "improvements": ["Improve occasional lapses"],
      "overallRating": 85
    },
    "improvements": [
      {
        "area": "Batting",
        "suggestion": "Work on short-pitch deliveries",
        "priority": "medium"
      },
      {
        "area": "Fitness",
        "suggestion": "Regular gym training",
        "priority": "medium"
      }
    ]
  }
}
```

---

### 5. Search Players
**Endpoint**: `GET /players/search`

**Query Parameters**:
- `location` (string): Country/State/City
- `battingStyle` (string): aggressive, orthodox, defensive, balanced
- `bowlingType` (string): fast, medium, slow, spinner, all-rounder
- `minRating` (number): Minimum talent rating
- `maxRating` (number): Maximum talent rating

**Example**: `GET /players/search?battingStyle=aggressive&minRating=75`

**Response**:
```json
{
  "success": true,
  "count": 15,
  "data": [
    {
      "_id": "63f7a1b2a1b2c1d1e1f1g1h2",
      "userId": { ... },
      "battingHand": "right",
      "battingStyle": "aggressive",
      "talentRating": 85,
      "battingStats": { ... }
    }
  ]
}
```

---

### 6. Get Leaderboard
**Endpoint**: `GET /players/leaderboard`

**Query Parameters**:
- `limit` (number, default: 10): Number of results
- `category` (string): batting, bowling, overall

**Example**: `GET /players/leaderboard?category=batting&limit=20`

**Response**:
```json
{
  "success": true,
  "category": "batting",
  "count": 10,
  "data": [
    {
      "userId": { "firstName": "Virat", "lastName": "Kohli" },
      "battingStats": { "average": 50.5 },
      "talentRating": 85
    }
  ]
}
```

---

## Team Endpoints

### 1. Create Team
**Endpoint**: `POST /teams`

**Required Role**: Team

**Request Body**:
```json
{
  "name": "Mumbai Warriors",
  "description": "A dominant cricket team from Mumbai",
  "location": {
    "country": "India",
    "state": "Maharashtra",
    "city": "Mumbai"
  }
}
```

**Response**:
```json
{
  "success": true,
  "message": "Team created successfully",
  "data": {
    "_id": "63f7a1b2a1b2c1d1e1f1g1h4",
    "name": "Mumbai Warriors",
    "captainId": "63f7a1b2a1b2c1d1e1f1g1h1",
    "players": [],
    "statistics": {
      "matchesPlayed": 0,
      "wins": 0,
      "losses": 0,
      "draws": 0
    }
  }
}
```

---

### 2. Get Team Details
**Endpoint**: `GET /teams/:id`

**Response**:
```json
{
  "success": true,
  "data": {
    "_id": "63f7a1b2a1b2c1d1e1f1g1h4",
    "name": "Mumbai Warriors",
    "captainId": { "firstName": "Rohit", "lastName": "Sharma" },
    "players": [ ... ],
    "statistics": {
      "matchesPlayed": 50,
      "wins": 35,
      "losses": 12,
      "draws": 3,
      "winPercentage": 70
    },
    "aiStrategy": {
      "predictedLineup": [],
      "battingOrder": [],
      "bowlingPlan": []
    }
  }
}
```

---

### 3. Add Player to Team
**Endpoint**: `POST /teams/:teamId/players`

**Required Role**: Team

**Request Body**:
```json
{
  "playerId": "63f7a1b2a1b2c1d1e1f1g1h2"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Player added to team",
  "data": { ... }
}
```

---

### 4. Get Playing XI Suggestion
**Endpoint**: `POST /teams/:teamId/playing-xi`

**Required Role**: Team

**Request Body**:
```json
{
  "matchType": "T20"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "playingXI": [
      {
        "_id": "63f7a1b2a1b2c1d1e1f1g1h2",
        "firstName": "Virat",
        "lastName": "Kohli",
        "talentRating": 85,
        "position": "batsman"
      }
    ],
    "alternates": [ ... ],
    "matchType": "T20",
    "recommendations": [
      "Ensure balanced team combination",
      "Check recent form of players"
    ]
  }
}
```

---

### 5. Get Team Analytics
**Endpoint**: `GET /teams/:teamId/analytics`

**Response**:
```json
{
  "success": true,
  "data": {
    "teamName": "Mumbai Warriors",
    "totalPlayers": 15,
    "statistics": {
      "matchesPlayed": 50,
      "wins": 35,
      "losses": 12,
      "draws": 3
    },
    "averageBattingAverage": 42.5,
    "averageStrikeRate": 125.3,
    "totalWickets": 180,
    "topBatsmen": [ ... ],
    "topBowlers": [ ... ]
  }
}
```

---

## Scout Endpoints

### 1. Create Scout Profile
**Endpoint**: `POST /scouts/profile`

**Required Role**: Scout

**Request Body**:
```json
{
  "seniority": "senior",
  "organization": "Cricket Management Inc",
  "specialization": ["batting", "all-rounder"]
}
```

**Response**:
```json
{
  "success": true,
  "message": "Scout profile created successfully",
  "data": {
    "_id": "63f7a1b2a1b2c1d1e1f1g1h5",
    "userId": "63f7a1b2a1b2c1d1e1f1g1h6",
    "seniority": "senior",
    "shortlistedPlayers": [],
    "scoutMetrics": {
      "playersEvaluated": 0,
      "playersSuccessful": 0,
      "successRate": 0
    }
  }
}
```

---

### 2. Shortlist Player
**Endpoint**: `POST /scouts/shortlist`

**Required Role**: Scout

**Request Body**:
```json
{
  "playerId": "63f7a1b2a1b2c1d1e1f1g1h2",
  "rating": 85,
  "notes": "Excellent batting average, consistent performer"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Player shortlisted successfully",
  "data": { ... }
}
```

---

### 3. Get Shortlist
**Endpoint**: `GET /scouts/shortlist`

**Required Role**: Scout

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "playerId": { "userId": { "firstName": "Virat" } },
      "rating": 85,
      "status": "interested",
      "shortlistedAt": "2024-01-10T10:00:00Z"
    }
  ]
}
```

---

### 4. Update Shortlist Status
**Endpoint**: `PUT /scouts/shortlist/:playerId`

**Required Role**: Scout

**Request Body**:
```json
{
  "status": "contacted"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Shortlist status updated"
}
```

---

## Match Endpoints

### 1. Create Match
**Endpoint**: `POST /matches`

**Required Role**: Authenticated users

**Request Body**:
```json
{
  "title": "Mumbai Warriors vs Delhi Dragons",
  "matchType": "T20",
  "team1Id": "63f7a1b2a1b2c1d1e1f1g1h4",
  "team2Id": "63f7a1b2a1b2c1d1e1f1g1h7",
  "venue": "Wankhede Stadium",
  "matchDate": "2024-01-20T19:30:00Z"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Match created successfully",
  "data": {
    "_id": "63f7a1b2a1b2c1d1e1f1g1h9",
    "title": "Mumbai Warriors vs Delhi Dragons",
    "status": "scheduled",
    "matchDate": "2024-01-20T19:30:00Z"
  }
}
```

---

### 2. Get Match Details
**Endpoint**: `GET /matches/:id`

**Response**:
```json
{
  "success": true,
  "data": {
    "_id": "63f7a1b2a1b2c1d1e1f1g1h9",
    "title": "Mumbai Warriors vs Delhi Dragons",
    "matchType": "T20",
    "status": "completed",
    "venue": "Wankhede Stadium",
    "scorecard": {
      "team1": { ... },
      "team2": { ... }
    },
    "result": {
      "winner": "63f7a1b2a1b2c1d1e1f1g1h4",
      "marginType": "runs",
      "marginValue": 15
    }
  }
}
```

---

### 3. Update Match Status
**Endpoint**: `PUT /matches/:id/status`

**Required Role**: Authenticated users

**Request Body**:
```json
{
  "status": "live"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Match status updated",
  "data": { ... }
}
```

---

### 4. Record Scorecard
**Endpoint**: `PUT /matches/:id/scorecard`

**Required Role**: Authenticated users

**Request Body**:
```json
{
  "scorecard": {
    "team1": {
      "batting": {
        "runs": 175,
        "wickets": 8,
        "overs": 20,
        "extras": 12
      }
    },
    "team2": {
      "batting": {
        "runs": 160,
        "wickets": 7,
        "overs": 20,
        "extras": 8
      }
    }
  },
  "result": {
    "winner": "team1Id",
    "marginType": "runs",
    "marginValue": 15
  }
}
```

---

### 5. Get Match Prediction
**Endpoint**: `GET /matches/:id/prediction`

**Response**:
```json
{
  "success": true,
  "data": {
    "favoredTeam": "team1",
    "team1WinProbability": "65.25",
    "team2WinProbability": "34.75",
    "keyFactors": [
      "Recent form and consistency",
      "Head-to-head record",
      "Home ground advantage"
    ]
  }
}
```

---

## Error Responses

### Standard Error Response
```json
{
  "success": false,
  "message": "Error message describing what went wrong"
}
```

### Authentication Error (401)
```json
{
  "success": false,
  "message": "No token provided. Authentication required."
}
```

### Authorization Error (403)
```json
{
  "success": false,
  "message": "Access denied. Required role(s): player"
}
```

### Not Found Error (404)
```json
{
  "success": false,
  "message": "Player profile not found"
}
```

---

## Rate Limiting & Pagination

Not implemented in this version but recommended for production.

---

## Testing the API

### Using cURL

```bash
# Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@cricket.com",
    "password": "password123",
    "role": "player"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@cricket.com",
    "password": "password123"
  }'

# Get current user (replace TOKEN)
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer TOKEN"
```

### Using Postman

1. Create new Collection
2. Add requests for each endpoint
3. Set Authorization type to "Bearer Token"
4. Paste JWT token from login response
5. Test endpoints

---

## Version
API Version: 1.0.0

Last Updated: January 2024

For updates and more info, visit the GitHub repository.
