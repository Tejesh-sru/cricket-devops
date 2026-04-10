// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const Home = () => {
  const features = [
    {
      icon: '📊',
      title: 'AI-Powered Analytics',
      description: 'Get detailed performance analysis and insights for players',
    },
    {
      icon: '👥',
      title: 'Player Management',
      description: 'Manage teams and track player performance metrics',
    },
    {
      icon: '🎯',
      title: 'Smart Scouting',
      description: 'Find and evaluate promising cricket talent',
    },
    {
      icon: '🏆',
      title: 'Strategy Planning',
      description: 'Get AI-powered suggestions for team strategies',
    },
    {
      icon: '📈',
      title: 'Leaderboards',
      description: 'Track and compare player rankings',
    },
    {
      icon: '⚡',
      title: 'Real-time Updates',
      description: 'Stay updated with live match information',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              🏏 Cricket Intelligence Platform
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Revolutionizing cricket with AI-powered analytics and player management. Connect players in one powerful platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/signup"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition"
              >
                <span>Get Started</span>
                <FiArrowRight />
              </Link>
              <Link
                to="/login"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold transition"
              >
                Login
              </Link>
            </div>
          </div>
          <div className="bg-blue-100 rounded-lg p-8 text-center">
            <div className="text-7xl">🏏</div>
            <p className="text-gray-600 mt-4">
              Transform your cricket game with intelligence
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">User Roles</h2>
        <div className="max-w-xl mx-auto">
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border-2 border-green-200">
            <h3 className="text-2xl font-bold text-green-700 mb-2">🎮 Player</h3>
            <p className="text-gray-700 text-sm">
              Create profile, upload stats, get AI analysis, and track improvements.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to elevate your cricket game?</h2>
          <p className="text-lg mb-8">Join thousands of players using Cricket Intelligence</p>
          <Link
            to="/signup"
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold inline-flex items-center space-x-2 transition"
          >
            <span>Create Account</span>
            <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
