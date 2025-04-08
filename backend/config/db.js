import 'dotenv/config'; // More modern way to load .env
import pg from 'pg';
const { Pool } = pg;

// Validate required environment variables
const requiredEnvVars = ['PGHOST', 'PGDATABASE', 'PGUSER', 'PGPASSWORD'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`❌ Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

// Database connection configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Optional fallback
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT || 5432,
  ssl: {
    require: true,          // This enforces SSL
    rejectUnauthorized: false // Needed for Neon's certificate
  }
});

// Test connection immediately
try {
  await pool.query('SELECT NOW()');
  console.log('✅ Database connected successfully');
} catch (err) {
  console.error('❌ Database connection failed:', err.message);
  process.exit(1);
}

// Cleanup on process termination
process.on('exit', () => {
  pool.end();
  console.log('ℹ️ Database pool ended');
});

export default pool;