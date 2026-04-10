const axios = require('axios');

const API_BASE = process.env.API_BASE || 'http://localhost:5000/api';

const run = async () => {
  try {
    const email = `testplayer_${Date.now()}@example.com`;
    console.log('Signing up user:', email);
    const signupRes = await axios.post(`${API_BASE}/auth/signup`, {
      firstName: 'Test',
      lastName: 'Player',
      email,
      password: 'password123',
      role: 'player'
    });

    console.log('Signup response:', signupRes.data);

    const token = signupRes.data.token;

    if (!token) {
      console.error('No token returned from signup; aborting');
      return;
    }

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

    console.log('Create profile response:', createRes.data);

    // Try creating again to check duplicate handling
    console.log('Attempting to create duplicate profile (should fail)...');
    try {
      const dupRes = await axios.post(`${API_BASE}/players/profile`, profilePayload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Unexpected duplicate create response:', dupRes.data);
    } catch (err) {
      if (err.response) {
        console.log('Duplicate create error response:', err.response.status, err.response.data);
      } else {
        console.log('Duplicate create error:', err.message);
      }
    }

  } catch (err) {
    if (err.response) {
      console.error('Error:', err.response.status, err.response.data);
    } else {
      console.error('Error:', err.message);
    }
  }
};

run();
