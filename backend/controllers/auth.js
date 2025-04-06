import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Enhanced validation schema
const signupSchema = z.object({
  email: z.string().email().toLowerCase(),
  username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/),
/*  phone: z.string()
  .regex(/^\+213[567]\d{8}$/)
  .transform(phone => {
    // Remove + and country code, keep only the national number
    return parseInt(phone.replace(/^\+213/, ''));
  }), */
  password: z.string().min(12)
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Must contain at least one number'),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']),
  birth_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/)
}).refine(data => new Date(data.birth_date) < new Date(), {
  message: "Date of birth must be in the past",
  path: ["birth_date"]
});

export const createUser = async (req, res) => {
  try {
    // Validate input
    const validated = signupSchema.parse(req.body);
    const { 
      email, 
      username, 
     
      password, 
      firstName, 
      lastName, 
      gender, 
      birth_date
    } = validated;

    // Check for existing records (SQL injection safe)
    const { data: existing, error: lookupError } = await supabase
      .from('user')
      .select('username, email')
      .or('username.eq.username,email.eq.email', {
        username,
        email,
      });

    if (lookupError) throw lookupError;

    if (existing?.length > 0) {
      const conflicts = [];
      if (existing.some(u => u.username === username)) conflicts.push('username');
      if (existing.some(u => u.email === email)) conflicts.push('email');
      /*if (existing.some(u => u.phone === phone)) conflicts.push('phone');*/
      
      return res.status(409).json({ 
        error: 'Conflict', 
        conflicts 
      });
    }

    // Create user with additional metadata
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailConfirm: true, 
        data: {
          username,

          first_name: firstName,
          last_name: lastName,
          gender,
          birth_date: new Date(birth_date).toISOString(),
          email_verified: false,
          registered_at: new Date().toISOString()
        }
      }
    });

    if (error) throw error;


    // Successful response
    res.status(201).json({
      id: data.user.id,
      email: data.user.email,
      username,
      firstName,
      lastName,
      message: 'User created successfully. Please check your email for verification.'
    });

  } catch (err) {
    // Enhanced error handling
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Validation failed',
        details: err.errors.map(e => ({
          path: e.path.join('.'),
          message: e.message
        }))
      });
    }

    console.error('Registration error:', err);
    
    res.status(500).json({ 
      error: err.message || 'Registration failed',
      ...(err.code && { code: err.code })
    });
  }
};