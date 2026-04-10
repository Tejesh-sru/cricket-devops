// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiLogOut, FiMenu } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    const roleLinks = {
      player: '/player-dashboard',
    };
    return roleLinks[user.role] || '/';
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 font-bold text-xl">
            <span className="text-2xl">🏏</span>
            <span>Cricket Intelligence</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {isAuthenticated && user ? (
              <>
                <Link to="/dashboard" className="hover:text-blue-200 transition">Dashboard</Link>
                <Link to="/matches" className="hover:text-blue-200 transition">Matches</Link>
                <Link to="/feed" className="hover:text-blue-200 transition">Feed</Link>
                <Link to="/explore" className="hover:text-blue-200 transition">Explore</Link>
                <Link to="/leaderboard" className="hover:text-blue-200 transition">Leaderboard</Link>
                <Link to="/profile" className="hover:text-blue-200 transition">Profile</Link>
                <div className="flex items-center space-x-2">
                  <span className="bg-blue-700 px-3 py-1 rounded-full text-sm capitalize">
                    {user.role}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg flex items-center space-x-2 transition"
                  >
                    <FiLogOut />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-transparent border-2 border-white px-4 py-2 rounded-lg hover:bg-white hover:text-blue-600 transition"
                >
                  Signup
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FiMenu />
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            {isAuthenticated && user ? (
              <>
                <Link
                  to={getDashboardLink()}
                  className="block py-2 hover:bg-blue-700 px-4 rounded"
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="block py-2 hover:bg-blue-700 px-4 rounded"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full mt-2 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block py-2 hover:bg-blue-700 px-4 rounded"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block py-2 hover:bg-blue-700 px-4 rounded"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
