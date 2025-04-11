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
    // 1. Check if identifier is email or username
    const isEmail = identifier.includes('@');

    // 2. Query the database based on the identifier type
    let query, params;
    if (isEmail) {
      query = 'SELECT user_id, username, email, password FROM users WHERE email = $1';
    } else {
      query = 'SELECT user_id, username, email, password FROM users WHERE username = $1';
    }
    params = [identifier];

    // 3. Execute the query
    const result = await pool.query(query, params);

    if (result.rows.length === 0) {
      throw new Error('Invalid credentials'); // Generic for security
    }

    const user = result.rows[0];

    // 4. Compare hashed password
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // 5. Return sanitized user data
    return {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      message: 'Login Successfull'
    };

  } catch (error) {
    console.error('Login error:', error.message);
    throw error; // Propagate to route handler
  }
};

export { loginUser };