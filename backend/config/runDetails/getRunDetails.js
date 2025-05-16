import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false // Required for Neon
    }
  });


const getRunDetails = async (runId) => {

    const run_id = runId

    try{
        
        const query = `
        SELECT

            run_id,
            creator_id,
            track_name,
            run_title,
            max_people,
            age_range,
            description,
            start_time,
            gender,
            nmb_participants,
            created_at,
            run_type,
            date,
            difficulty,
            duration,
            distance,
            location,
            google_maps_link,
            additional_location_info,
            average_speed,
            status

        FROM runs
        WHERE run_id = $1 `; 
        

        const result = await pool.query(query, [run_id])

        return {
            success: true,
            run: result.rows
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

export { getRunDetails }