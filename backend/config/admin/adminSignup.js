import pg from 'pg';
const { Pool } = pg;
import { hash } from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';  // For UUIDv4 (random)

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false // Required for Neon
    }
  });

const signupAdmin = async (adminData) => {
  const { firstName, lastName, email,  password, confirmPassword } = adminData;

  if (!/^[A-Za-z]+$/.test(firstName) || !/^[A-Za-z]+$/.test(lastName)) {
    throw new Error('Names must contain only letters');
  }

  if (password !== confirmPassword) {
    throw new Error('Passwords do not match');
  }

  const hashedPassword = await hash(password, 12)

  if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{12,}$/.test(password)) {
    throw new Error('Password must be 12+ chars with uppercase, lowercase, number, and special char');
  }


  try{

    const adminId = uuidv4()

    const emailCheck = await pool.query('SELECT 1 FROM admins WHERE email = $1', [email]);
    if (emailCheck.rows.length > 0) {
        throw new Error('Email already in use');
    }

    const result = await pool.query(
        `INSERT INTO admins (
          admin_id, first_name, last_name, email, 
          password
          ) VALUES ($1, $2, $3, $4, $5)
          RETURNING admin_id, first_name, last_name, email`,
          [
            adminId,
            firstName.toLowerCase(),
            lastName.toLowerCase(),
            email,
            hashedPassword,
          ]
        );

        return result.rows[0];

    }catch(error){
        console.error('⚠️ Database Error Details:', {
            message: error.message,
            stack: error.stack,  // Full error stack trace
            code: error.code,   // PostgreSQL error code (e.g., '23505' for duplicate key)
            query: error.query  // The failed SQL query
          });
        
          // Send a simplified message to the client
          if (error.message.includes('ssl') || error.message.includes('insecure')) {
            throw new Error('Database connection failed. Please try again later.');
          }
        throw error
    }


};

export { signupAdmin }