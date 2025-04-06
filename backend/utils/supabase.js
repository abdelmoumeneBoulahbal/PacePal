import { createClient } from '@supabase/supabase-js';
import { configDotenv } from 'dotenv';

configDotenv();

const supabase = createClient(process.env.SUPABASE_URL, 
                              process.env.SUPABASE_ANON_KEY);

async function testConnection() {
  try {
    // Test with an existing table (use your actual table name)
    const { data, error } = await supabase
      .from('user') // Make sure this table exists in your Supabase
      .select('username')
      .limit(1);

    if (error) throw error;
    
    // Changed from data[0].setting to data[0].username
    console.log('✅ Supabase connected successfully');
    console.log('Test user:', data[0]?.username || 'No users found');
    return true;
    
  } catch (error) {
    console.error('❌ Supabase connection failed:', error.message);
    
    // Fallback to auth check if table query fails
    try {
      const { error: authError } = await supabase.auth.getUser();
      if (authError) throw authError;
      console.log('✅ Connected via auth API fallback');
      return true;
    } catch (fallbackError) {
      console.error('❌ Fallback connection failed:', fallbackError.message);
      return false;
    }
  }
}


export {
    supabase,
    testConnection
  }
                              