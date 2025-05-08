import pg from 'pg';
const { Pool } = pg;
import { v4 as uuidv4 } from 'uuid';  // For UUIDv4 (random)

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false // Required for Neon
    }
  });


const getRunList = async (userId) => {

    const creatorId = userId;

    try{
        
        const query = `
        SELECT
            
            run_id,

            track_name,
            run_title,

            nmb_participants, 
            difficulty,
            
            run_type,
            date,            
            
            status

        FROM runs
        WHERE creator_id = $1
        ORDER BY created_at DESC`; 
        

        const result = await pool.query(query, [creatorId])

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

export { getRunList }