const http = require('http');

const HOST = 'localhost';
const PORT = 5000;

function request(path, method = 'GET', data = null, token = null) {
  return new Promise((resolve, reject) => {
    const payload = data ? JSON.stringify(data) : null;
    const options = {
      hostname: HOST,
      port: PORT,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (payload) options.headers['Content-Length'] = Buffer.byteLength(payload);
    if (token) options.headers['Authorization'] = `Bearer ${token}`;

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body || '{}');
          resolve({ status: res.statusCode, body: parsed });
        } catch (err) {
          resolve({ status: res.statusCode, body: body });
        }
      });
    });

    req.on('error', (err) => reject(err));
    if (payload) req.write(payload);
    req.end();
  });
}

(async () => {
  try {
    const signupData = {
      firstName: 'Temp',
      lastName: 'Player',
      email: `temp.player.${Date.now()}@example.com`,
      password: 'password123',
      role: 'player',
    };

    console.log('Trying signup...');
    const signupRes = await request('/api/auth/signup', 'POST', signupData);
    console.log('Signup response:', signupRes.status, signupRes.body);

    let token = signupRes.body && signupRes.body.token;

    if (!token) {
      // fallback to login if signup didn't return token
      console.log('Signup did not return token, trying login...');
      const loginRes = await request('/api/auth/login', 'POST', { email: signupData.email, password: signupData.password });
      console.log('Login response:', loginRes.status, loginRes.body);
      token = loginRes.body && loginRes.body.token;
    }

    if (!token) {
      console.error('Could not obtain token, aborting.');
      process.exit(1);
    }

    // Attempt to create profile
    const profileData = {
      battingHand: 'right',
      battingStyle: 'balanced',
      bowlingHand: 'right',
      bowlingType: 'fast',
      jerseyNumber: 10,
      dateOfBirth: '1995-01-01',
      height: 180,
      weight: 75,
      yearsActive: 5,
    };

    console.log('Creating profile...');
    const profileRes = await request('/api/players/profile', 'POST', profileData, token);
    console.log('Profile create response:', profileRes.status, profileRes.body);
  } catch (err) {
    console.error('Test script error:', err.message || err);
  }
})();
