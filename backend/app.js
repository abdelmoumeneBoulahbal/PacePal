import express from 'express';
import router from './routes/router.js';
import { configDotenv } from 'dotenv';
import pool from './config/db.js';
import cors from "cors"

const app = express();
app.use(cors());

app.use(express.json());

app.use('/', router);

app.listen(3000, () => {
  console.log(`🚀 Server running on http://localhost:3000`);
});