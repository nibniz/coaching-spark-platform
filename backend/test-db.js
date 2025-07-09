const { Pool } = require('pg');
require('dotenv').config();

// Create a test connection
const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
});

async function testDatabase() {
  try {
    console.log('🔍 Testing database connection...');
    console.log('📊 Database config:', {
      host: process.env.PGHOST,
      port: process.env.PGPORT,
      database: process.env.PGDATABASE,
      user: process.env.PGUSER,
      // password: '***' // Hidden for security
    });

    // Test basic connection
    const client = await pool.connect();
    console.log('✅ Database connection successful!');

    // Test a simple query
    const result = await client.query('SELECT NOW() as current_time');
    console.log('⏰ Current database time:', result.rows[0].current_time);

    // Test users table
    const usersResult = await client.query('SELECT COUNT(*) as user_count FROM users');
    console.log('👥 Total users in database:', usersResult.rows[0].user_count);

    // Test mentor_profiles table
    const mentorsResult = await client.query('SELECT COUNT(*) as mentor_count FROM mentor_profiles');
    console.log('🎓 Total mentor profiles:', mentorsResult.rows[0].mentor_count);

    client.release();
    console.log('✅ All database tests passed!');
    
    await pool.end();
    
  } catch (error) {
    console.error('❌ Database test failed:', error.message);
    process.exit(1);
  }
}

testDatabase(); 