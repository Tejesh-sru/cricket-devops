# Cricket Intelligence Platform - Complete Setup Guide

## 🏏 Project Overview

The Cricket Intelligence Platform is a production-ready MERN stack application that connects Players and Teams with AI-powered analytics and intelligent strategy suggestions.

### Key Features

✅ **User Roles / Features**:
- 🎮 **Player**: Create profile, upload stats, get AI analysis
- 👨‍💼 **Team Features**: Create/manage teams, get Playing XI suggestions

✅ **AI Features**:
- Player performance analysis
- Talent rating calculation
- Playing XI suggestions
- Strategy recommendations

✅ **Technology Stack**:
- **Backend**: Node.js, Express.js, MongoDB
- **Frontend**: React.js, Tailwind CSS, Recharts
-- **Authentication**: JWT-based authentication
- **Database**: MongoDB with comprehensive schemas

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation & Setup](#installation--setup)
3. [Running the Application](#running-the-application)
4. [API Endpoints](#api-endpoints)
5. [Project Structure](#project-structure)
6. [Demo Credentials](#demo-credentials)
7. [Troubleshooting](#troubleshooting)

---

## 📦 Prerequisites

Before you begin, ensure you have installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (Local or Atlas) - [Setup Guide](https://www.mongodb.com/docs/manual/installation/)
- **Git** - [Download](https://git-scm.com/)
- **npm** or **yarn** - Package managers

### Verify Installation

```bash
node --version
npm --version
mongod --version  # If MongoDB is installed locally
```

---

## 🚀 Installation & Setup

### Step 1: Clone or Extract Project

```bash
cd cricket-intelligence-platform
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 3: Setup Backend Environment

Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

Edit `.env` file with your settings:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cricket-intelligence
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
GROQ_API_KEY=your_groq_api_key_here
```

**MongoDB Setup Options**:

**Option A: Local MongoDB** (Windows/Mac/Linux)
```bash
# Windows (if installed)
mongod

# Mac (using Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**Option B: MongoDB Atlas** (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create account and cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

### Step 4: Seed Sample Data (Backend)

```bash
npm run seed
```

This creates sample users with different roles:

 **Password for all**: `password123`
 
### Step 4: Seed Sample Data (Backend)

```bash
npm run seed
```

This creates sample users with different roles:
- Player: virat@cricket.com
- Team Manager: rohit@cricket.com
- Scout: ravi@scout.com
- Umpire: billy@umpire.com

**Password for all**: `password123`
 
### Step 4: Seed Sample Data (Backend)

### Step 5: Install Frontend Dependencies

```bash
cd ../frontend
npm install
Create `.env` file in `frontend` directory:

 Run seed data to populate demo users (players). Scout, team manager, and umpire demo users have been removed: `node src/seedData.js`
cp .env.example .env
```

The `.env` file should contain:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## ▶️ Running the Application

### Start Backend Server

```bash
cd backend
npm run dev
```

**Expected Output**:
```
✓ Connected to MongoDB
✅ Server started successfully on http://localhost:5000
```

### Start Frontend (in a new terminal)

```bash
cd frontend
npm start
```

**Frontend opens automatically at**: `http://localhost:3000`

### Access the Application

- **Main URL**: http://localhost:3000
- **API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000

---

## 🔌 API Endpoints

### Authentication Endpoints

```
POST /api/auth/signup          - Register new user
POST /api/auth/login           - Login user
GET  /api/auth/me              - Get current user (Protected)
```

### Player Endpoints

```
POST   /api/players/profile             - Create player profile (Protected)
GET    /api/players/profile/:id         - Get player profile
PUT    /api/players/stats/:id           - Update player stats (Protected)
GET    /api/players/:id/analysis        - Get AI analysis for player
GET    /api/players/search              - Search players with filters
GET    /api/players/leaderboard         - Get player leaderboard
```

### Team Endpoints

```
POST   /api/teams                       - Create team (Protected: Authenticated users)
GET    /api/teams/:id                   - Get team details
POST   /api/teams/:teamId/players       - Add player to team (Protected)
DELETE /api/teams/:teamId/players/:playerId - Remove player (Protected)
POST   /api/teams/:teamId/playing-xi    - Get Playing XI suggestion (Protected)
GET    /api/teams/:teamId/analytics     - Get team analytics
```

### Scout Endpoints

Scout APIs and the `scouts` collection have been removed in this release.

### Match Endpoints

```
POST   /api/matches                     - Create match (Protected: Authenticated users)
GET    /api/matches/:id                 - Get match details
PUT    /api/matches/:id/status          - Update match status (Protected: Authenticated users)
PUT    /api/matches/:id/scorecard       - Record scorecard (Protected: Authenticated users)
GET    /api/matches/:id/prediction      - Get match prediction
POST   /api/matches/:id/analysis        - Get match analysis (Protected)
GET    /api/matches/team/:teamId        - Get matches by team
```

---

## 📁 Project Structure

```
cricket-intelligence-platform/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── PlayerProfile.js
│   │   │   ├── Team.js
│   │   │   ├── Match.js
│   │   │   └── (removed) Scout.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── playerController.js
│   │   │   ├── teamController.js
│   │   │   ├── scoutController.js
│   │   │   └── matchController.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── playerRoutes.js
│   │   │   ├── teamRoutes.js
│   │   │   ├── scoutRoutes.js
│   │   │   └── matchRoutes.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── services/
│   │   │   └── aiService.js
│   │   ├── utils/
│   │   │   ├── tokenGenerator.js
│   │   │   └── errorHandler.js
│   │   ├── server.js
│   │   └── seedData.js
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   └── ProtectedRoute.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   ├── PlayerDashboard.js
│   │   │   ├── TeamDashboard.js
│   │   │   ├── ScoutDashboard.js
│   │   │   └── UmpireDashboard.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── services/
│   │   ├── utils/
│   │   │   ├── api.js
│   │   │   └── constants.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── public/
│   │   └── index.html
│   ├── .env.example
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
└── package.json (root)
```

---

## 🔐 Demo Credentials

Test the application with these sample accounts (Password: `password123`):

### Player Account
- Email: `virat@cricket.com`
- Role: Player
- Features: Profile management, stats upload, AI analysis

### Team Manager Account
- Email: `rohit@cricket.com`
- Role: Team Manager
- Features: Create teams, manage players, get strategy suggestions

### Scout Account
- Email: `ravi@scout.com`
- Role: Scout
- Features: Search players, talent rating, shortlist management

### Umpire Account
- Email: `billy@umpire.com`
- Role: Umpire
- Features: Match management, decision recording

---

## 🔧 Troubleshooting

### MongoDB Connection Error

**Error**: `MongoServerSelectionError: connect ECONNREFUSED`

**Solution**:
- Ensure MongoDB is running locally or use MongoDB Atlas
- Check `MONGODB_URI` in `.env`
- For local MongoDB: Run `mongod` in another terminal

### Port Already in Use

**Error**: `EADDRINUSE: address already in use :::5000`

**Solution**:
```bash
# Change PORT in backend/.env or
# Kill the process using port 5000

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Frontend Cannot Connect to API

**Error**: `Network request failed`

**Solution**:
- Ensure backend is running on port 5000
- Check `REACT_APP_API_URL` in frontend/.env
- Clear browser cache and restart dev server

### Dependencies Installation Issues

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

---

## 🚀 Deployment

### Backend Deployment (Heroku/Render)

1. Push code to GitHub
2. Connect repository to hosting service
3. Set environment variables in dashboard
4. Deploy

### Frontend Deployment (Netlify/Vercel)

1. Build the project:
```bash
cd frontend
npm run build
```

2. Deploy the `build` folder to Netlify or Vercel

---

## 📚 Additional Resources

- [MEAN Stack Documentation](https://www.mongodb.com/languages/mern-stack)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)

---

## ✅ Features Checklist

- [x] User Authentication (JWT)
- [x] Role-based Access Control
- [x] Player Profiles & Analytics
- [x] Team Management
- [x] Scout Functionality
- [x] Match Management
- [x] AI Analysis & Recommendations
- [x] Dashboard for each role
- [x] Charts & Visualizations
- [x] Responsive Design

---

## 🤝 Contributing

Feel free to fork, modify, and improve this project!

---

## 📝 License

MIT License - Feel free to use this project for learning and development.

---

## 📧 Support

For issues or questions, please refer to the documentation or create an issue in the repository.

**Happy Coding! 🏏✨**
