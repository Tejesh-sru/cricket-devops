import React from 'react';
import { usePlayer } from '../context/PlayerContext';

const Leaderboard = () => {
  const { state } = usePlayer();
  const players = [...state.players].sort((a,b) => (b.totalRuns || 0) - (a.totalRuns || 0));

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Leaderboard</h1>
      <div className="grid gap-4">
        {players.map((p, idx) => (
          <div key={p.id} className={`bg-white p-4 rounded shadow flex items-center justify-between ${idx < 3 ? 'ring-4 ring-yellow-200' : ''}`}>
            <div>
              <div className="font-semibold">#{idx+1} {p.name}</div>
              <div className="text-sm text-gray-500">Runs: {p.totalRuns} • Wickets: {p.totalWickets}</div>
            </div>
            <div className="text-xl font-bold">{p.totalRuns}</div>
          </div>
        ))}
        {players.length === 0 && <div className="text-center text-gray-500">No players</div>}
      </div>
    </div>
  );
};

export default Leaderboard;
