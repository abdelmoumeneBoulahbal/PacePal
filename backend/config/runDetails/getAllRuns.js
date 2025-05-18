import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Required for Neon
  }
});

const getAllRuns = async () => {
  try {
    const query = `
      SELECT
      run_id, 
      creator_id,
        run_title,
        location,
        duration,
        difficulty,
        max_people,
        age_range,
        run_type,
        distance,
        nmb_participants,
        average_speed,
        track_name,
        date
      FROM runs
      ORDER BY 
        date DESC;
    `;
    
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error fetching runs:', error);
    throw error;
  }
};

export { getAllRuns };