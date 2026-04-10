import React, { createContext, useContext, useEffect, useState } from 'react';

const PlayerContext = createContext(null);

export const usePlayer = () => useContext(PlayerContext);

const STORAGE_KEY = 'criconnect_player_state_v1';

const defaultState = {
  stats: {
    matchesPlayed: 0,
    totalRuns: 0,
    totalWickets: 0,
    strikeRate: 0,
  },
  matches: [],
  posts: [],
  players: [],
};

export const PlayerProvider = ({ children }) => {
  const [state, setState] = useState(defaultState);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState(JSON.parse(raw));
    } catch (e) {
      console.warn('Failed to read player state', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Failed to persist player state', e);
    }
  }, [state]);

  const computeStats = (matches) => {
    const matchesPlayed = matches.length;
    const totalRuns = matches.reduce((s, m) => s + (Number(m.playerRuns || 0)), 0);
    const totalWickets = matches.reduce((s, m) => s + (Number(m.playerWickets || 0) || 0), 0);
    const ballsFaced = matches.reduce((s, m) => s + (Number(m.ballsFaced || 0) || 0), 0);
    const strikeRate = ballsFaced > 0 ? +(totalRuns / ballsFaced * 100).toFixed(2) : 0;
    return { matchesPlayed, totalRuns, totalWickets, strikeRate };
  };

  const addMatch = (match) => {
    setState((s) => {
      const matches = [match, ...s.matches];
      const stats = computeStats(matches);
      return { ...s, matches, stats };
    });
  };

  const addPost = (post) => {
    setState((s) => ({ ...s, posts: [post, ...s.posts] }));
  };

  const toggleConnect = (playerId) => {
    setState((s) => {
      const players = s.players.map((p) => (p.id === playerId ? { ...p, connected: !p.connected } : p));
      return { ...s, players };
    });
  };

  const value = {
    state,
    addMatch,
    addPost,
    toggleConnect,
    setState,
  };

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
};

export default PlayerContext;
