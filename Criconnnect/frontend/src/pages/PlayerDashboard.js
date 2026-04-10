// src/pages/PlayerDashboard.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';
import { toast } from 'react-toastify';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PlayerDashboard = () => {
  const { user } = useAuth();
  const [playerProfile, setPlayerProfile] = useState(null);
  const [analysis, setAnalysis] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const fetchPlayerProfile = async () => {
    try {
      // Get player profile
      const profileResponse = await API.get('/players/search');
      const myProfile = profileResponse.data.data.find(
        (p) => p.userId._id === user.id || p.userId.email === user.email
      );

      if (myProfile) {
        setPlayerProfile(myProfile);

        // Get analysis
        const analysisResponse = await API.get(`/players/${myProfile._id}/analysis`);
        setAnalysis(analysisResponse.data.data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchPlayerProfile();
  }, [user]);

  // Mock performance data
  const performanceData = [
    { match: 'Match 1', runs: 45, avg: 45 },
    { match: 'Match 2', runs: 67, avg: 56 },
    { match: 'Match 3', runs: 23, avg: 45 },
    { match: 'Match 4', runs: 89, avg: 56 },
    { match: 'Match 5', runs: 54, avg: 55 },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            🎮 Player Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Welcome, {user?.firstName || 'Player'}</p>
        </div>

        {playerProfile ? (
          <div className="space-y-8">
            {/* Profile Info Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <p className="text-gray-600 text-sm">Batting Hand</p>
                  <p className="text-lg font-semibold capitalize">
                    {playerProfile.battingHand}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Batting Style</p>
                  <p className="text-lg font-semibold capitalize">
                    {playerProfile.battingStyle}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Bowling Type</p>
                  <p className="text-lg font-semibold capitalize">
                    {playerProfile.bowlingType}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Batting Stats */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Batting Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Matches</span>
                    <span className="font-semibold">
                      {playerProfile.battingStats?.matches || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Average</span>
                    <span className="font-semibold">
                      {playerProfile.battingStats?.average || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Strike Rate (runs per 100 balls)</span>
                    <span className="font-semibold">
                      {playerProfile.battingStats?.strikeRate || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Centuries</span>
                    <span className="font-semibold">
                      {playerProfile.battingStats?.centuries || 0}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bowling Stats */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Bowling Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Wickets</span>
                    <span className="font-semibold">
                      {playerProfile.bowlingStats?.wickets || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Economy</span>
                    <span className="font-semibold">
                      {playerProfile.bowlingStats?.economy || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Average</span>
                    <span className="font-semibold">
                      {playerProfile.bowlingStats?.average || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Best Figures</span>
                    <span className="font-semibold">
                      {playerProfile.bowlingStats?.bestFigures || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Analysis */}
            {analysis && (
              <div className="grid md:grid-cols-2 gap-8">
                {/* Strengths */}
                <div className="bg-green-50 rounded-lg shadow-md p-6 border-l-4 border-green-500">
                  <h3 className="text-xl font-semibold mb-4 text-green-700">
                    ✅ Strengths
                  </h3>
                  <ul className="space-y-2">
                    {analysis.analysis?.strengths?.map((strength, idx) => (
                      <li key={idx} className="text-gray-700">
                        • {strength}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Weaknesses */}
                <div className="bg-red-50 rounded-lg shadow-md p-6 border-l-4 border-red-500">
                  <h3 className="text-xl font-semibold mb-4 text-red-700">
                    ⚠️ Weaknesses
                  </h3>
                  <ul className="space-y-2">
                    {analysis.analysis?.weaknesses?.map((weakness, idx) => (
                      <li key={idx} className="text-gray-700">
                        • {weakness}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Improvements */}
            {analysis?.improvements && (
              <div className="bg-blue-50 rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                <h3 className="text-xl font-semibold mb-4 text-blue-700">
                  🚀 Recommended Improvements
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {analysis.improvements.map((imp, idx) => (
                    <div key={idx} className="bg-white p-4 rounded border border-blue-200">
                      <h4 className="font-semibold text-blue-700 mb-1">
                        {imp.area}
                      </h4>
                      <p className="text-sm text-gray-600">{imp.suggestion}</p>
                      <span className="inline-block mt-2 text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded">
                        {imp.priority}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Performance Chart */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Performance Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="match" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="runs" stroke="#3b82f6" />
                  <Line type="monotone" dataKey="avg" stroke="#10b981" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Talent Rating */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">AI Talent Rating</h3>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-4 rounded-full"
                      style={{
                        width: `${playerProfile.talentRating || 50}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="text-4xl font-bold text-purple-600">
                  {playerProfile.talentRating || 50}/100
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600 text-lg">
              Create your player profile to get started
            </p>
            <button
              onClick={() => window.location.assign('/profile')}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Create Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerDashboard;
