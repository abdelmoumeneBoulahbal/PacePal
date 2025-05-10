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
        
        u.first_name, 
        u.last_name,
        u.username,
        u.email,
        u.birth_date,
        u.total_run_time,
        rp.status,
        u.gender,
        
        u.runs_completed,
        u.created_at,
        rp.completion_status

      FROM users u
      JOIN run_participants rp ON u.user_id = rp.fk_user_id
      WHERE rp.fk_run_id = $1
      ORDER BY u.created_at DESC
    `;

    const result = await pool.query(query, [runId]);
    
    if (result.rows.length === 0) {
      return {
        success: false,
        error: 'No participants found for this run',
        statusCode: 404
      };
    }

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