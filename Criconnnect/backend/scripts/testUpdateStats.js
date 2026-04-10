const axios = require('axios');

const API_BASE = process.env.API_BASE || 'http://localhost:5000/api';

const run = async () => {
  try {
    const email = `stats_tester_${Date.now()}@example.com`;
    console.log('Signing up user:', email);
    const signupRes = await axios.post(`${API_BASE}/auth/signup`, {
      firstName: 'Stats',
      lastName: 'Tester',
      email,
      password: 'password123',
      role: 'player'
    });

    const token = signupRes.data.token;
    console.log('Signup token:', !!token);

    // Create profile
    const profilePayload = {
      battingHand: 'right',
      battingStyle: 'balanced',
      bowlingHand: 'right',
      bowlingType: 'fast',
      jerseyNumber: 10,
      dateOfBirth: '1995-01-01',
      height: 180,
      weight: 75,
      yearsActive: 3
    };

    console.log('Creating player profile...');
    const createRes = await axios.post(`${API_BASE}/players/profile`, profilePayload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const profile = createRes.data.data;
    console.log('Profile created:', profile._id);

    // Update stats: innings == notOuts case
    const statsPayload1 = {
      battingStats: {
        matches: 5,
        innings: 5,
        runs: 123,
        notOuts: 5,
      },
      bowlingStats: {
        matches: 5,
        innings: 5,
        runs: 200,
        wickets: 0
      }
    };

    console.log('Updating stats (innings == notOuts) ...');
    const updateRes1 = await axios.put(`${API_BASE}/players/stats/${profile._id}`, statsPayload1, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log('Update response 1:', updateRes1.data.success, updateRes1.data.data.battingStats);

    // Update stats: normal case
    const statsPayload2 = {
      battingStats: {
        matches: 10,
        innings: 9,
        runs: 250,
        notOuts: 1,
      },
      bowlingStats: {
        matches: 10,
        innings: 9,
        runs: 300,
        wickets: 10
      }
    };

    console.log('Updating stats (normal case) ...');
    const updateRes2 = await axios.put(`${API_BASE}/players/stats/${profile._id}`, statsPayload2, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log('Update response 2:', updateRes2.data.success, updateRes2.data.data.battingStats, updateRes2.data.data.bowlingStats);

  } catch (err) {
    if (err.response) {
      console.error('Error:', err.response.status, err.response.data);
    } else {
      console.error('Error:', err.message);
    }
    process.exit(1);
  }
};

run();
