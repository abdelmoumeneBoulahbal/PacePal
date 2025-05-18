import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const getRunParticipants = async (runId) => {
  try {
    const query = `
      SELECT 
        
        u.user_id,
        u.first_name, 
        u.last_name,
        u.username,
        u.email,
        u.birth_date,
        u.total_run_time,
    
        rp.user_run_status,
        u.gender,
        
        u.runs_completed,
        u.created_at,
        rp.run_status

      FROM users u
      JOIN run_participants rp ON u.user_id = rp.fk_user_id
      WHERE rp.fk_run_id = $1
      ORDER BY u.created_at DESC
    `;

    const result = await pool.query(query, [runId]);

    return {
      success: true,
      participants: result.rows
    };

  } catch (err) {
    console.error('Database error:', err);
    return {
      success: false,
      error: 'Failed to fetch participants',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined,
      statusCode: 500
    };
  }
};

export { getRunParticipants };