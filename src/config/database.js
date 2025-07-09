const { Pool } = require('pg');
require('dotenv').config();

// 🎓 Learning: Why use a Pool instead of a single client?
// - Pool manages multiple database connections
// - More efficient for handling multiple requests
// - Automatically handles connection lifecycle

const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  // Connection pool settings
  max: 20, // Maximum number of connections
  idleTimeoutMillis: 30000, // Close connections after 30 seconds of inactivity
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
});

// Test the connection
pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ Database connection error:', err);
});

module.exports = pool; 