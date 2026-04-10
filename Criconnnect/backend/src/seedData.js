// src/seedData.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const PlayerProfile = require('./models/PlayerProfile');
const Team = require('./models/Team');

// Connect to MongoDB
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cricket-intelligence';
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✓ Connected to MongoDB');
  } catch (error) {
    console.error('✗ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

// Seed data
const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await PlayerProfile.deleteMany({});
    await Team.deleteMany({});

    console.log('🧹 Cleared existing data');

    // Create sample players
    const players = [];
    const playerData = [
      {
        firstName: 'Virat',
        lastName: 'Kohli',
        email: 'virat@cricket.com',
        password: 'password123',
        role: 'player',
        phone: '+91-9876543210',
        location: { country: 'India', state: 'Delhi', city: 'New Delhi' },
      },
      {
        firstName: 'Babar',
        lastName: 'Azam',
        email: 'babar@cricket.com',
        password: 'password123',
        role: 'player',
        phone: '+92-3001234567',
        location: { country: 'Pakistan', state: 'Punjab', city: 'Lahore' },
      },
      {
        firstName: 'Steve',
        lastName: 'Smith',
        email: 'steve@cricket.com',
        password: 'password123',
        role: 'player',
        phone: '+61-412345678',
        location: { country: 'Australia', state: 'NSW', city: 'Sydney' },
      },
      {
        firstName: 'Kane',
        lastName: 'Williamson',
        email: 'kane@cricket.com',
        password: 'password123',
        role: 'player',
        phone: '+64-212345678',
        location: { country: 'New Zealand', state: 'Auckland', city: 'Auckland' },
      },
      {
        firstName: 'Joe',
        lastName: 'Root',
        email: 'joe@cricket.com',
        password: 'password123',
        role: 'player',
        phone: '+44-7912345678',
        location: { country: 'England', state: 'Yorkshire', city: 'Sheffield' },
      },
    ];

    for (const data of playerData) {
      const user = await User.create(data);
      players.push({
        user,
        profile: {
          userId: user._id,
          battingHand: Math.random() > 0.5 ? 'right' : 'left',
          battingStyle: ['aggressive', 'orthodox', 'defensive', 'balanced'][
            Math.floor(Math.random() * 4)
          ],
          bowlingHand: Math.random() > 0.5 ? 'right' : 'left',
          bowlingType: ['fast', 'medium', 'slow', 'spinner', 'all-rounder'][
            Math.floor(Math.random() * 5)
          ],
          jerseyNumber: Math.floor(Math.random() * 99) + 1,
          battingStats: {
            matches: Math.floor(Math.random() * 150) + 50,
            innings: Math.floor(Math.random() * 150) + 50,
            runs: Math.floor(Math.random() * 8000) + 2000,
            average: (Math.random() * 50 + 30).toFixed(2),
            strikeRate: (Math.random() * 80 + 100).toFixed(2),
            centuries: Math.floor(Math.random() * 20) + 3,
            fifties: Math.floor(Math.random() * 30) + 10,
            highestScore: Math.floor(Math.random() * 100) + 100,
          },
          bowlingStats: {
            matches: Math.floor(Math.random() * 100) + 20,
            innings: Math.floor(Math.random() * 100) + 20,
            runs: Math.floor(Math.random() * 3000) + 500,
            wickets: Math.floor(Math.random() * 150) + 20,
            average: (Math.random() * 35 + 20).toFixed(2),
            strikeRate: (Math.random() * 40 + 40).toFixed(2),
            economy: (Math.random() * 8 + 6).toFixed(2),
            bestFigures: `${Math.floor(Math.random() * 8) + 2}/${Math.floor(Math.random() * 30) + 20}`,
          },
          currentStatus: 'active',
          talentRating: Math.floor(Math.random() * 50) + 50,
        },
      });
    }

    console.log(`✓ Created ${players.length} player users`);

    // Create player profiles
    for (const player of players) {
      await PlayerProfile.create(player.profile);
    }

    console.log(`✓ Created ${players.length} player profiles`);

    // Team manager role removed — skipping team user/team creation in seed
    console.log('✓ Skipping creation of team manager users and teams (role removed)');

    console.log('\n✅ Seed data created successfully!');
    console.log('\nSample Login Credentials:');
    console.log('Player: virat@cricket.com / password123');
    console.log('\n🚀 You can now login and test the application');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

// Run seed
connectDB().then(() => {
  seedDatabase();
});
