import React from 'react';
import { usePlayer } from '../context/PlayerContext';

const Explore = () => {
  const { state, toggleConnect } = usePlayer();

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Explore Players</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {state.players.map((p) => (
          <div key={p.id} className="bg-white p-4 rounded shadow">
            <div className="font-semibold">{p.name}</div>
            <div className="text-sm text-gray-500">Runs: {p.totalRuns} • Wickets: {p.totalWickets}</div>
            <button onClick={() => toggleConnect(p.id)} className={`mt-3 px-3 py-1 rounded ${p.connected ? 'bg-gray-200' : 'bg-blue-600 text-white'}`}>{p.connected ? 'Connected' : 'Connect'}</button>
          </div>
        ))}
        {state.players.length === 0 && <div className="text-center text-gray-500">No players to show</div>}
      </div>
    </div>
  );
};

export default Explore;
