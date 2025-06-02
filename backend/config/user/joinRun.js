// src/services/joinRun.js
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});


export const joinRun = async (runId, userId) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    const existingQuery = `
      SELECT participation_id FROM run_participants 
      WHERE fk_run_id = $1 AND fk_user_id = $2
    `;
    const existingRes = await client.query(existingQuery, [runId, userId]);
    
    if (existingRes.rows.length > 0) {
      throw new Error('User already joined this run');
    }

    const currentRunQuery = `
      SELECT current_run_id FROM users WHERE user_id = $1
    `;
    const currentRunRes = await client.query(currentRunQuery, [userId]);

    if (currentRunRes.rows.length === 0) {
      throw new Error('User not found');
    }

    if (currentRunRes.rows[0].current_run_id) {
      throw new Error('You can’t join more than one run at a time. Please complete or cancel the registration from your current run.');
    }
    
    const insertQuery = `
      INSERT INTO run_participants (fk_run_id, fk_user_id, user_run_status)
      VALUES ($1, $2, 'pending')
      RETURNING participation_id, fk_run_id, fk_user_id
    `;
    const insertRes = await client.query(insertQuery, [runId, userId]);
    
    const updateQuery = `
      UPDATE runs 
      SET nmb_participants = nmb_participants + 1
      WHERE run_id = $1
    `;
    await client.query(updateQuery, [runId]);

    const updateUserQuery = `
      UPDATE users
      SET current_run_id = $1
      WHERE user_id = $2
    `;
    await client.query(updateUserQuery, [runId, userId]);

    await client.query('COMMIT');
    
    return {
      participation_id: insertRes.rows[0].participation_id,
      run_id: insertRes.rows[0].fk_run_id,
      user_id: insertRes.rows[0].fk_user_id
    };
    
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};