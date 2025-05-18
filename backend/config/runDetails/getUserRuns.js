import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false // Required for Neon
    }
  });


const getUserRuns = async (userId) => {

    try{
        
        const query = `
        SELECT

            fk_run_id,
            user_run_status

        FROM run_participants
        WHERE fk_user_id = $1`; 
        

        const result = await pool.query(query, [userId])

        return {
            success: true,
            runs: result.rows
          };


    }catch(err){
        console.error('Database error:', err);
        return {
          success: false,
          error: 'Failed to fetch runs',
          details: process.env.NODE_ENV === 'development' ? err.message : undefined
        };
    }


}

export { getUserRuns }