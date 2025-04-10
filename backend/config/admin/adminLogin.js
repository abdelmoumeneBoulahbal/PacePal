import pg from 'pg';
const { Pool } = pg;
import { compare } from 'bcrypt';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const loginAdmin = async (adminData) => {
  const { first_name, last_name, email, password } = adminData;

  try {
    // 1. Validate all required fields
    if (!email) throw new Error('Email is required');
    if (!password) throw new Error('Password is required');
    if (!first_name) throw new Error('First name is required');
    if (!last_name) throw new Error('Last name is required');

    // 2. Check if admin exists by email
    const adminCheck = await pool.query(
      `SELECT admin_id, first_name, last_name, password 
       FROM admins 
       WHERE email = $1`,
      [email]
    );

    if (adminCheck.rows.length === 0) {
      throw new Error('No admin found with this email');
    }

    const admin = adminCheck.rows[0];

    // 3. Verify names SEPARATELY for specific feedback
    if (admin.first_name.toLowerCase() !== first_name.toLowerCase()) {
      throw new Error('First name does not match our records');
    }

    if (admin.last_name.toLowerCase() !== last_name.toLowerCase()) {
      throw new Error('Last name does not match our records');
    }

    // 4. Verify password
    const isPasswordValid = await compare(password, admin.password);
    if (!isPasswordValid) {
      throw new Error('Incorrect password');
    }

    // 5. Return sanitized admin data
    return {
      admin_id: admin.admin_id,
      first_name: admin.first_name,
      last_name: admin.last_name,
      
      message: `Login Successfull for admin, welcome ${first_name} ${last_name}`
    };

  } catch (error) {
    console.error('Admin login error:', error.message);
    throw error; // Forward the specific error message
  }
};

export { loginAdmin };