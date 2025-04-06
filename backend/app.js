import express from 'express';
import  router  from './routes/router.js'
import { configDotenv } from 'dotenv';
import { supabase, testConnection } from './utils/supabase.js';

const app = express();
configDotenv();
app.use(express.json());

testConnection().then(isConnected => {
  if (!isConnected) {
    console.error('⚠️ Server starting without database connection');
  }
});

app.use('/api', router)

app.listen(3000, () => {
    console.log(`The server is running on http://localhost:3000`);
});