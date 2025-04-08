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

const signup = async (userData) => {
  const { firstName, lastName, email, username, password, confirmPassword, dateOfBirth, gender } = userData;

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

  if (username.length < 3 || username.length > 12) {
    throw new Error('Username must be 3-12 characters');
  }

  const birthDate = new Date(dateOfBirth);
  const ageDiff = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDiff);
  if (Math.abs(ageDate.getUTCFullYear() - 1970) < 12) {
    throw new Error('You must be at least 12 years old');
  }

  if (!['female', 'male'].includes(gender)) {
    throw new Error('Invalid gender selection');
  }



  try{

    const userId = uuidv4()

    const emailCheck = await pool.query('SELECT 1 FROM users WHERE email = $1', [email]);
    if (emailCheck.rows.length > 0) {
        throw new Error('Email already in use');
    }

    const usernameCheck = await pool.query('SELECT 1 FROM users WHERE username = $1', [username]);
    if (usernameCheck.rows.length > 0) {
        throw new Error('Username already taken');
    }

    const result = await pool.query(
        `INSERT INTO users (
          user_id, first_name, last_name, email, username, 
          password, birth_date, gender
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          RETURNING user_id, username, email`,
          [
            userId,
            firstName.toLowerCase(),
            lastName.toLowerCase(),
            email,
            username,
            hashedPassword,
            dateOfBirth,
            gender
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

export { signup }