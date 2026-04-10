# Cricket Intelligence Platform - Quick Start Guide

## ⚡ 5-Minute Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Step 1: Setup Backend (2 mins)
```bash
cd backend
npm install
cp .env.example .env
# Update .env with MongoDB URI
npm run seed
npm run dev
```
Server runs at: http://localhost:5000

### Step 2: Setup Frontend (2 mins)
```bash
cd frontend
npm install
cp .env.example .env
npm start
```
App opens at: http://localhost:3000

### Step 3: Login (1 min)
Use any demo account:
- Email: **virat@cricket.com**
- Password: **password123**

---

## 🎯 Key Project Files

### Backend Structure
```
backend/
├── src/server.js                 # Main Express server
├── src/seedData.js              # Sample data creation
├── src/models/                  # Database schemas
│   ├── User.js                  # User model with roles
│   ├── PlayerProfile.js         # Player stats & analysis
│   ├── Team.js                  # Team management
│   ├── Match.js                 # Match records
│   └── (removed) Scout.js       # Scout shortlists (removed)
├── src/controllers/             # Business logic
│   ├── authController.js        # Login/Signup
│   ├── playerController.js      # Player operations
│   ├── teamController.js        # Team management
│   ├── (removed) scoutController.js
│   └── matchController.js       # Match management
├── src/routes/                  # API endpoints
│   ├── authRoutes.js
│   ├── playerRoutes.js
│   ├── teamRoutes.js
│   ├── (removed) scoutRoutes.js
│   └── matchRoutes.js
├── src/services/aiService.js    # AI logic & algorithms
├── src/middleware/auth.js       # JWT verification
└── src/utils/                   # Helpers

Files to understand: 
1. server.js - Server setup
2. aiService.js - AI algorithms
3. Models (*.js) - Data structure
```

### Frontend Structure
```
frontend/
├── src/App.js                   # Main routing
├── src/index.js                 # React entry
├── src/context/AuthContext.js   # Auth state management
├── src/pages/                   # Page components
│   ├── Home.js                  # Landing page
│   ├── Login.js                 # Login form
│   ├── Signup.js                # Registration
│   ├── PlayerDashboard.js       # Player stats
│   ├── TeamDashboard.js         # Team management
│   └── PlayerDashboard.js       # Player-facing dashboard
├── src/components/              # Reusable components
│   ├── Navbar.js                # Navigation
│   └── ProtectedRoute.js        # Route protection
├── src/utils/                   # Helper functions
│   ├── api.js                   # Axios instance
│   └── constants.js             # App constants
└── tailwind.config.js           # Tailwind CSS config

Files to understand:
1. App.js - Routing setup
2. AuthContext.js - Auth flow
3. api.js - API calls
```

---

## 📊 Database Collections

### User Collection
Stores all users (player)

### PlayerProfile Collection
- Stats (batting, bowling)
- Performance history
- AI analysis results
- Talent rating

### Team Collection
- Player roster
- Match statistics
- AI strategy suggestions
- Team analytics

### Match Collection
- Scorecard details
- Match results
- AI analysis
- Predictions

### Scout Collection
Scout collection and related features have been removed in this release.

---

## 🔗 API Patterns

### Authentication Endpoints
```
POST   /api/auth/signup          (Public)
POST   /api/auth/login           (Public)
GET    /api/auth/me              (Protected)
```

### Player Endpoints
```
POST   /api/players/profile      (Protected: Player)
GET    /api/players/:id          (Public)
PUT    /api/players/stats/:id    (Protected: Player)
GET    /api/players/:id/analysis (Public)
GET    /api/players/search       (Public)
GET    /api/players/leaderboard  (Public)
```

### Team Endpoints
```
POST   /api/teams                (Protected: Team)
GET    /api/teams/:id            (Public)
POST   /api/teams/:id/players    (Protected: Team)
POST   /api/teams/:id/playing-xi (Protected: Team)
GET    /api/teams/:id/analytics  (Public)
```

### Scout Endpoints
Scout APIs have been removed.

### Match Endpoints
```
POST   /api/matches              (Protected: Authenticated users)
GET    /api/matches/:id          (Public)
PUT    /api/matches/:id/status   (Protected: Authenticated users)
PUT    /api/matches/:id/scorecard (Protected: Authenticated users)
GET    /api/matches/:id/prediction (Public)
```

---

## 🎨 UI Routes

### Public Routes
- `/` - Home/Landing
- `/login` - Login page
- `/signup` - Registration

### Protected Routes
- `/player-dashboard` - Player profile & stats
- `/team-dashboard` - Team management

---

## 🤖 AI Features Explained

### 1. Player Analysis
- Calculates strengths from stats
- Identifies weaknesses
- Generates improvement tips
- Updates talent rating

### 2. Talent Rating
- 0-100 scale
- Based on batting & bowling stats
- Batting average, strike rate count
- Bowling wickets and economy considered

### 3. Playing XI Suggestion
- Scores all team players
- Selects best 11 for match type
- Creates batting order
- Suggests bowling plan

### 4. Match Prediction
- Compares team ratings
- Calculates win probability
- Lists key factors
- Format-specific analysis

---

## 🔐 Authentication Flow

1. **User Signup**
   - Submit email, password, role
   - Password hashed with bcrypt
   - JWT token generated
   - Token stored in localStorage

2. **User Login**
   - Submit email, password
   - Password verified against hash
   - JWT token issued
   - Redirect to role dashboard

3. **Protected Routes**
   - Check token in localStorage
   - Verify token with JWT_SECRET
   - Extract role from token
   - Check if user has required role

4. **API Calls**
   - Add token to Authorization header
   - Server verifies token
   - Process request if valid
   - Return 401 if token invalid

---

## 🚀 Deployment Quick Tips

### Environment Variables
**Backend (.env)**
```
PORT=5000
MONGODB_URI=<your_mongodb_url>
JWT_SECRET=<strong_secret_key>
NODE_ENV=production
```

**Frontend (.env)**
```
REACT_APP_API_URL=<your_backend_url>
```

### Deployment Services
- **Backend**: Heroku, Render, Railway, AWS EC2
- **Frontend**: Netlify, Vercel, GitHub Pages
- **Database**: MongoDB Atlas, AWS, Google Cloud

---

## 🧪 Testing the Application

### Manual Testing Flow

1. **Signup as Player**
   - Fill signup form with player role
   - Verify email, password
   - Should redirect to player dashboard

2. **Create Player Profile**
   - Enter batting/bowling details
   - Submit stats
   - View AI analysis

3. **Create a Team (Authenticated user)**
   - Create team
   - Add players
   - Get Playing XI suggestions

4. **Scout features** (removed in this release)

5. **Umpire features** (removed in this release)

---

## 📱 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| MongoDB connection fails | Mongod not running | Start MongoDB or use Atlas |
| Port 5000 in use | Another app using port | Kill process or change PORT in .env |
| API 404 errors | Routes not mounted | Check server.js route mounting |
| Login fails | Wrong credentials | Use demo account emails |
| CORS errors | Frontend/Backend mismatch | Check API URL in .env |
| Token expired | Session timeout | Login again |
| UI blank | React compilation issue | Check console for errors |
| No data | Seed not run | Run `npm run seed` in backend |

---

## 💡 Customization Ideas

### Easy Additions
- Add more stats fields to players
- Create notification system
- Add player comments/ratings
- Create live chat for teams
- Add match highlights upload

### Medium Complexity
- WebSocket for real-time updates
- Email notifications
- Advanced filtering
- Export to PDF
- Mobile app version

### Advanced Features
- ML-based predictions
- Video analysis integration
- Payment system
- Admin panel
- Advanced reporting

---

## 📚 Code Walkthrough

### Understanding aiService.js
```javascript
// Analyzes player performance
AIService.analyzePlayerPerformance(playerStats)
  // Returns: strengths, weaknesses, improvements

// Calculates talent rating (0-100)
AIService.calculateTalentRating(playerStats)
  // Based on batting avg, SR, bowling wickets, economy

// Suggests best Playing XI
AIService.suggestPlayingXI(players, matchType)
  // Scores players, creates batting order

// Predicts match outcome
AIService.predictMatchOutcome(team1, team2)
  // Returns probability and key factors
```

### Understanding Auth Flow
```javascript
// User login sends credentials to backend
POST /api/auth/login → Server verifies → Issues JWT

// Frontend stores token
localStorage.setItem('token', token)

// API calls include token
// axios: Authorization: Bearer <token>

// Server middleware verifies token
verifyToken() → Decode JWT → Check expiry
```

---

## 🎓 Learning Path

1. **Understand Data Models** → Check all models in backend/src/models/
2. **Learn API Pattern** → Review authController and routes
3. **Explore Frontend Structure** → Check App.js and pages
4. **Understand AI Logic** → Study aiService.js
5. **Try API Endpoints** → Use curl or Postman
6. **Build Features** → Add new endpoints and pages

---

## 📞 Support Resources

- **Documentation**: Check README.md and SETUP_GUIDE.md
- **API Docs**: See API_DOCUMENTATION.md
- **Code Comments**: Well-commented throughout
- **Error Messages**: Descriptive error responses
- **Demo Data**: Use seeded test accounts

---

## 🎉 You're Ready!

Your Cricket Intelligence Platform is ready to use. Start exploring and customizing it for your needs!

**Next Steps:**
1. ✅ Setup complete - Run servers
2. ✅ Login with demo account
3. ✅ Explore each dashboard
4. ✅ Review API endpoints
5. ✅ Start building features

Happy coding! 🏏✨
