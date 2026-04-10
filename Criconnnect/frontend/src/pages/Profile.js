// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [isEdit, setIsEdit] = useState(false);
  const [profileId, setProfileId] = useState(null);
  const [isEditingStats, setIsEditingStats] = useState(false);
    const [battingStats, setBattingStats] = useState({
    matches: '',
    innings: '',
    runs: '',
    average: '',
    notOuts: '',
      strikeRate: '',
    centuries: '',
    fifties: '',
    highestScore: '',
  });

  const [bowlingStats, setBowlingStats] = useState({
    matches: '',
    innings: '',
    runs: '',
    wickets: '',
    average: '',
    fiveWickets: '',
    threeWickets: '',
    strikeRate: '',
    economy: '',
    bestFigures: '',
  });

  const [formData, setFormData] = useState({
    battingHand: 'right',
    battingStyle: 'balanced',
    bowlingHand: 'right',
    bowlingType: 'fast',
    dateOfBirth: '',
    height: '',
    weight: '',
    yearsActive: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please log in to create a profile');
      navigate('/login');
      return;
    }
    try {
      let res;
      if (isEdit && profileId) {
        res = await API.put(`/players/profile/${profileId}`, formData);
      } else {
        res = await API.post('/players/profile', formData);
      }

      if (res.data?.success) {
        toast.success(isEdit ? 'Profile updated' : 'Profile created');
        navigate('/player-dashboard');
      } else {
        toast.error(res.data?.message || 'Failed to save profile');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error creating profile');
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user || !user.id) return;
      try {
        const res = await API.get(`/players/profile/user/${user.id}`);
        if (res.data?.success && res.data.data) {
          const p = res.data.data;
          setFormData({
            battingHand: p.battingHand || 'right',
            battingStyle: p.battingStyle || 'balanced',
            bowlingHand: p.bowlingHand || 'right',
            bowlingType: p.bowlingType || 'fast',
            dateOfBirth: p.dateOfBirth ? p.dateOfBirth.split('T')[0] : '',
            height: p.height || '',
            weight: p.weight || '',
            yearsActive: p.yearsActive || 1,
          });
          setIsEdit(true);
          setProfileId(p._id);
          setBattingStats({
            matches: p.battingStats?.matches || '',
            innings: p.battingStats?.innings || '',
            runs: p.battingStats?.runs || '',
             notOuts: p.battingStats?.notOuts || '',
            average: (() => {
              const runs = parseFloat(p.battingStats?.runs) || 0;
              const innings = parseFloat(p.battingStats?.innings) || 0;
              const notOuts = parseFloat(p.battingStats?.notOuts) || 0;
              const outs = innings - notOuts;
              if (innings > 0 && innings === notOuts) {
                return runs.toFixed(2);
              }
              return outs > 0 ? (runs / outs).toFixed(2) : '—';
            })(),
            strikeRate: p.battingStats?.strikeRate || '',
            centuries: p.battingStats?.centuries || '',
            fifties: p.battingStats?.fifties || '',
            highestScore: p.battingStats?.highestScore || '',
          });

          setBowlingStats({
            matches: p.bowlingStats?.matches || '',
            innings: p.bowlingStats?.innings || '',
            runs: p.bowlingStats?.runs || '',
             wickets: p.bowlingStats?.wickets || '',
             fiveWickets: p.bowlingStats?.fiveWickets || '',
             threeWickets: p.bowlingStats?.threeWickets || '',
             average: (() => {
               const runsConceded = parseFloat(p.bowlingStats?.runs) || 0;
               const wickets = parseInt(p.bowlingStats?.wickets) || 0;
               return wickets > 0 ? (runsConceded / wickets).toFixed(2) : '—';
             })(),
            strikeRate: p.bowlingStats?.strikeRate || '',
            economy: p.bowlingStats?.economy || '',
            bestFigures: p.bowlingStats?.bestFigures || '',
          });
        }
      } catch (err) {
        // No profile found is acceptable — user can create one
      }
    };

    fetchProfile();
  }, [user]);

  const handleStatsChange = (e, type = 'batting') => {
    const { name, value } = e.target;
    if (type === 'batting') {
      // update batting stats and compute average
      setBattingStats((p) => {
        const updated = { ...p, [name]: value };
        const runs = parseFloat(updated.runs) || 0;
        const innings = parseFloat(updated.innings) || 0;
        const notOuts = parseFloat(updated.notOuts) || 0;
        const outs = innings - notOuts;
        let avgDisplay;
        if (innings > 0 && innings === notOuts) {
          avgDisplay = runs.toFixed(2);
        } else if (outs > 0) {
          avgDisplay = (runs / outs).toFixed(2);
        } else {
          avgDisplay = '—';
        }
        updated.average = avgDisplay;
        return updated;
      });
    } else {
      // update bowling stats and compute average
      setBowlingStats((p) => {
        const updated = { ...p, [name]: value };
        const runs = parseFloat(updated.runs) || 0;
        const wickets = parseFloat(updated.wickets) || 0;
        const avg = wickets > 0 ? +(runs / wickets).toFixed(2) : 0;
        updated.average = avg;
        return updated;
      });
    }
  };

  const saveStats = async () => {
    if (!profileId) {
      toast.error('No profile to update stats for');
      return;
    }
    try {
      const res = await API.put(`/players/stats/${profileId}`, {
        battingStats,
        bowlingStats,
      });
      if (res.data?.success) {
        toast.success('Stats updated');
        setIsEditingStats(false);
      } else {
        toast.error(res.data?.message || 'Failed to update stats');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error updating stats');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6">Create Player Profile</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-2 gap-4">
            <select name="battingHand" value={formData.battingHand} onChange={handleChange} className="p-2 border rounded">
              <option value="right">Right</option>
              <option value="left">Left</option>
              <option value="ambidextrous">Ambidextrous</option>
            </select>
            <select name="battingStyle" value={formData.battingStyle} onChange={handleChange} className="p-2 border rounded">
              <option value="balanced">Balanced</option>
              <option value="aggressive">Aggressive</option>
              <option value="orthodox">Orthodox</option>
              <option value="defensive">Defensive</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <select name="bowlingHand" value={formData.bowlingHand} onChange={handleChange} className="p-2 border rounded">
              <option value="right">Right</option>
              <option value="left">Left</option>
            </select>
            <select name="bowlingType" value={formData.bowlingType} onChange={handleChange} className="p-2 border rounded">
              <option value="fast">Fast</option>
              <option value="medium">Medium</option>
              <option value="slow">Slow</option>
              <option value="spinner">Spinner</option>
              <option value="all-rounder">All-rounder</option>
              <option value="non-bowler">Non-bowler</option>
            </select>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="p-2 border rounded" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input type="number" name="height" value={formData.height} onChange={handleChange} placeholder="Height (cm)" className="p-2 border rounded" />
            <input type="number" name="weight" value={formData.weight} onChange={handleChange} placeholder="Weight (kg)" className="p-2 border rounded" />
          </div>

          {/* Stats section */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Batting & Bowling Stats</h2>
              <button type="button" onClick={() => setIsEditingStats((s) => !s)} className="px-3 py-1 bg-gray-200 rounded">
                {isEditingStats ? 'Cancel' : (isEdit ? 'Edit Stats' : 'Add Stats')}
              </button>
            </div>

            {!isEditingStats && (
              <div className="mt-4 p-3 bg-gray-100 rounded">
                <div className="text-sm text-gray-700">
                  <span className="font-semibold">Total Runs:</span>{' '}
                  {battingStats && battingStats.runs !== '' && battingStats.runs !== undefined
                    ? Number(battingStats.runs).toLocaleString()
                    : '—'}
                </div>
              </div>
            )}

            {isEditingStats && (
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <h3 className="font-medium mb-2">Batting</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <input name="matches" value={battingStats.matches} onChange={(e) => handleStatsChange(e, 'batting')} placeholder="Matches" className="p-2 border rounded" />
                    <input name="innings" value={battingStats.innings} onChange={(e) => handleStatsChange(e, 'batting')} placeholder="Innings" className="p-2 border rounded" />
                    <input name="runs" value={battingStats.runs} onChange={(e) => handleStatsChange(e, 'batting')} placeholder="Runs" className="p-2 border rounded" />
                    <input name="average" value={battingStats.average} onChange={(e) => handleStatsChange(e, 'batting')} placeholder="Average" className="p-2 border rounded" />
                      <input name="notOuts" value={battingStats.notOuts} onChange={(e) => handleStatsChange(e, 'batting')} placeholder="Not Outs" className="p-2 border rounded" />
                    <input name="strikeRate" value={battingStats.strikeRate} onChange={(e) => handleStatsChange(e, 'batting')} placeholder="Strike Rate (runs per 100 balls)" className="p-2 border rounded" />
                    <input name="centuries" value={battingStats.centuries} onChange={(e) => handleStatsChange(e, 'batting')} placeholder="Centuries" className="p-2 border rounded" />
                    <input name="fifties" value={battingStats.fifties} onChange={(e) => handleStatsChange(e, 'batting')} placeholder="Fifties" className="p-2 border rounded" />
                    <input name="highestScore" value={battingStats.highestScore} onChange={(e) => handleStatsChange(e, 'batting')} placeholder="Highest Score" className="p-2 border rounded" />
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Bowling</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <input name="matches" value={bowlingStats.matches} onChange={(e) => handleStatsChange(e, 'bowling')} placeholder="Matches" className="p-2 border rounded" />
                    <input name="innings" value={bowlingStats.innings} onChange={(e) => handleStatsChange(e, 'bowling')} placeholder="Innings" className="p-2 border rounded" />
                    <input name="runs" value={bowlingStats.runs} onChange={(e) => handleStatsChange(e, 'bowling')} placeholder="Runs Conceded" className="p-2 border rounded" />
                    <input name="wickets" value={bowlingStats.wickets} onChange={(e) => handleStatsChange(e, 'bowling')} placeholder="Wickets" className="p-2 border rounded" />
                    <input name="average" value={bowlingStats.average} onChange={(e) => handleStatsChange(e, 'bowling')} placeholder="Average" className="p-2 border rounded" />
                    <input name="strikeRate" value={bowlingStats.strikeRate} onChange={(e) => handleStatsChange(e, 'bowling')} placeholder="Strike Rate (balls per wicket)" className="p-2 border rounded" />
                    <input name="economy" value={bowlingStats.economy} onChange={(e) => handleStatsChange(e, 'bowling')} placeholder="Economy" className="p-2 border rounded" />
                    <input name="bestFigures" value={bowlingStats.bestFigures} onChange={(e) => handleStatsChange(e, 'bowling')} placeholder="Best Figures" className="p-2 border rounded" />
                      <input name="fiveWickets" value={bowlingStats.fiveWickets} onChange={(e) => handleStatsChange(e, 'bowling')} placeholder="5w Hauls" className="p-2 border rounded" />
                      <input name="threeWickets" value={bowlingStats.threeWickets} onChange={(e) => handleStatsChange(e, 'bowling')} placeholder="3w Hauls" className="p-2 border rounded" />
                  </div>
                </div>

                <div className="col-span-2 flex justify-end space-x-2 mt-4">
                  <button type="button" onClick={() => setIsEditingStats(false)} className="px-4 py-2 rounded bg-gray-200">Cancel</button>
                  <button type="button" onClick={saveStats} className="px-4 py-2 rounded bg-green-600 text-white">Save Stats</button>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button type="button" onClick={() => navigate('/player-dashboard')} className="px-4 py-2 rounded bg-gray-200">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">{isEdit ? 'Save Changes' : 'Create Profile'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
