import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false // Required for Neon
    }
  });

const updateStatus = async (userId, runId, newStatus) => {
    const client = await pool.connect()



    try{

        await client.query('BEGIN')


        const updateQuery = `
        UPDATE run_participants
        SET user_run_status = $1
        WHERE fk_user_id = $2 AND fk_run_id = $3
        RETURNING *`

        const result = await client.query(updateQuery, [

            newStatus,
            userId,
            runId
        ])

        if (result.rows.length === 0) {
          throw new Error('Participant not found in this run');
        }

        await client.query('COMMIT')

        return {
            success: true,
            participant: result.rows[0]
            };

        } catch (err) {
            await client.query('ROLLBACK');
            return {
            success: false,
            error: err.message
            };
        } finally {
            client.release();
        }
}

export { updateStatus }