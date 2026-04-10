import React from 'react';
import { useAuth } from '../context/AuthContext';
import { usePlayer } from '../context/PlayerContext';
import StatCard from '../components/StatCard';
import { generateInsights } from '../utils/aiInsights';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const { user } = useAuth();
  const { state } = usePlayer();
  const { stats, matches } = state;

  const insights = generateInsights(stats, matches);

  const chartData = matches.slice(0, 10).map((m, i) => ({
    name: `M${matches.length - i}`,
    runs: Number(m.playerRuns || 0),
  })).reverse();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Welcome back{user?.firstName ? `, ${user.firstName}` : ''}!</h1>
        <p className="text-sm text-gray-600">Your player dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Matches Played" value={stats.matchesPlayed} />
        <StatCard title="Total Runs" value={stats.totalRuns} />
        <StatCard title="Total Wickets" value={stats.totalWickets} />
        <StatCard title="Strike Rate (runs per 100 balls)" value={stats.strikeRate} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="mb-3 text-lg font-semibold">AI Insights</div>
          <div className="space-y-2">
            {insights.map((s, idx) => (
              <div key={idx} className="p-3 bg-white rounded shadow">{s}</div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-3 text-lg font-semibold">Last 5 Matches</div>
          <div className="space-y-2">
            {matches.slice(0,5).map((m, i) => (
              <div key={i} className="p-3 bg-white rounded shadow flex justify-between">
                <div>
                  <div className="font-semibold">{m.title || `Match ${i+1}`}</div>
                  <div className="text-sm text-gray-600">Runs: {m.playerRuns || 0} • Wickets: {m.playerWickets || 0}</div>
                </div>
                <div className="text-sm text-gray-500">{m.date || ''}</div>
              </div>
            ))}
            {matches.length === 0 && <div className="p-3 bg-white rounded shadow text-center text-gray-500">No matches yet</div>}
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white p-4 rounded shadow">
        <div className="mb-2 font-semibold">Performance (Runs per match)</div>
        <div style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="runs" stroke="#2563eb" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
