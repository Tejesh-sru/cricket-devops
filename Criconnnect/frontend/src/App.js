import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context
import { AuthProvider } from './context/AuthContext';
import { PlayerProvider } from './context/PlayerContext';

// Components
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
 
// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Feed from './pages/Feed';
import Matches from './pages/Matches';
import Explore from './pages/Explore';
import Leaderboard from './pages/Leaderboard';
// Removed Team/Scout/Umpire dashboards

function App() {

  return (
    <AuthProvider>
      <PlayerProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route path="/player-dashboard" element={<ProtectedRoute requiredRoles={["player"]}><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute requiredRoles={["player"]}><Dashboard /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute requiredRoles={["player"]}><Profile /></ProtectedRoute>} />
            <Route path="/matches" element={<ProtectedRoute requiredRoles={["player"]}><Matches /></ProtectedRoute>} />
            <Route path="/feed" element={<ProtectedRoute requiredRoles={["player"]}><Feed /></ProtectedRoute>} />
            <Route path="/explore" element={<ProtectedRoute requiredRoles={["player"]}><Explore /></ProtectedRoute>} />
            <Route path="/leaderboard" element={<ProtectedRoute requiredRoles={["player"]}><Leaderboard /></ProtectedRoute>} />

            {/* 404 Route */}
            <Route
              path="*"
              element={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
                    <p className="text-gray-600 mb-4">The page you're looking for doesn't exist.</p>
                    <a
                      href="/"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                    >
                      Go Home
                    </a>
                  </div>
                </div>
              }
            />
          </Routes>
        </div>
      </PlayerProvider>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </AuthProvider>
  );
}

export default App;
