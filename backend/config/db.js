import { configDotenv } from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;


configDotenv();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || null,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT || 5432,
    ssl: {
      rejectUnauthorized: false // Required for Neon
    }
  });
(async () => {
  try {
    await pool.query('SELECT NOW()');
    console.log('✅ Database connected');
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1); // Crash immediately if DB is unavailable
  }
})();  

export default pool;