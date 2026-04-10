import React, { useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import Button from '../components/Button';

const Matches = () => {
  const { state, addMatch } = usePlayer();
  const [form, setForm] = useState({ title: '', date: '', playerRuns: 0, playerWickets: 0, ballsFaced: 0 });

  const submit = () => {
    if (!form.title) return;
    addMatch({ ...form, id: Date.now(), date: form.date || new Date().toISOString() });
    setForm({ title: '', date: '', playerRuns: 0, playerWickets: 0, ballsFaced: 0 });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Match</h1>
      <div className="bg-white p-4 rounded shadow mb-4">
        <input className="w-full p-2 border rounded mb-2" placeholder="Match title" value={form.title} onChange={(e) => setForm(f => ({...f, title: e.target.value}))} />
        <input type="date" className="w-full p-2 border rounded mb-2" value={form.date} onChange={(e) => setForm(f => ({...f, date: e.target.value}))} />
        <div className="grid grid-cols-3 gap-2">
          <label className="flex flex-col">
            <span className="text-sm text-gray-600 mb-1">Player runs scored</span>
            <input aria-label="Player runs scored" type="number" min="0" className="p-2 border rounded" placeholder="e.g. 56" value={form.playerRuns} onChange={(e) => setForm(f => ({...f, playerRuns: Number(e.target.value)}))} />
          </label>

          <label className="flex flex-col">
            <span className="text-sm text-gray-600 mb-1">Player wickets taken</span>
            <input aria-label="Player wickets taken" type="number" min="0" className="p-2 border rounded" placeholder="e.g. 2" value={form.playerWickets} onChange={(e) => setForm(f => ({...f, playerWickets: Number(e.target.value)}))} />
          </label>

          <label className="flex flex-col">
            <span className="text-sm text-gray-600 mb-1">Balls faced</span>
            <input aria-label="Balls faced" type="number" min="0" className="p-2 border rounded" placeholder="e.g. 34" value={form.ballsFaced} onChange={(e) => setForm(f => ({...f, ballsFaced: Number(e.target.value)}))} />
          </label>
        </div>
        <div className="mt-2 text-right">
          <Button className="bg-green-600 text-white" onClick={submit}>Add Match</Button>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-2">Matches History</h2>
      <div className="space-y-2">
        {state.matches.map((m) => (
          <div key={m.id} className="bg-white p-3 rounded shadow flex justify-between">
            <div>
              <div className="font-semibold">{m.title}</div>
              <div className="text-sm text-gray-500">Runs: {m.playerRuns} • Wickets: {m.playerWickets}</div>
            </div>
            <div className="text-sm text-gray-500">{m.date}</div>
          </div>
        ))}
        {state.matches.length === 0 && <div className="text-center text-gray-500">No matches recorded</div>}
      </div>
    </div>
  );
};

export default Matches;
