import pg from 'pg';
import { compare } from 'bcrypt';
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const loginUser = async (userData) => {
  const { identifier, password } = userData;

  try {
    const isEmail = identifier.includes('@');

    let query, params;
    if (isEmail) {
      query = 'SELECT user_id, username, email, password FROM users WHERE email = $1';
    } else {
      query = 'SELECT user_id, username, email, password FROM users WHERE username = $1';
    }
    params = [identifier];
    
    const result = await pool.query(query, params);

    if (result.rows.length === 0) {
      throw new Error('Invalid credentials'); 
    }

    const user = result.rows[0];

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    return {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      message: 'Login Successful'
    };

  } catch (error) {
    console.error('Login error:', error.message);
    throw error; 
  }
};

export { loginUser };