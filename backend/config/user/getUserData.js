import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export const getUserData = async (userId) => {
    try {
        const result = await pool.query(
          `SELECT  
            first_name, 
            last_name, 
            email, 
            username, 
            birth_date, 
            gender, 
            phone
          FROM users 
          WHERE user_id = $1`,
        [userId]
        )
        return result.rows[0] || null
      }catch(error){
      console.error('Database error in getUserData: ', error)
      throw error
    }
    
}