import pg from 'pg';
const { Pool } = pg;
import { v4 as uuidv4 } from 'uuid'; 

import isValidGoogleMapsLink from '../../utils/ValidateMaps.js';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  const createRun = async (userId, runData) => {
    const client = await pool.connect()
    
    const {
        runTitle,
        trackName,
        date,
        time,
        description,
        ageRange,
        difficulty,
        duration,
        location,
        additionalLocationInfo,
        distance,
        runType,
        averageSpeed,
        maxUsers,
        gender,
        googleMapsLink,
        is_creator      
    } = runData;

    // Validations
    if (!runTitle || runTitle.length < 12) throw new Error('Title must be at least 12 characters');
    if (!trackName || trackName.length < 10) throw new Error('Track name must be at least 10 characters');
    
    const runDateCheck = new Date(`${date}T${time}`);
    if (runDateCheck < new Date()) throw new Error("Run date cannot be in the past");
    
    if (!isValidGoogleMapsLink(googleMapsLink)) {
        throw new Error('Invalid Google Maps link');
    }

    try {
        const runId = uuidv4();
        await client.query('BEGIN')

        const query = `
            INSERT INTO runs (
                run_id,
                creator_id,
                track_name,
                run_title,
                max_people,
                age_range,
                description,
                start_time,
                gender,
                run_type,
                date,
                difficulty,
                duration,
                distance,
                location,
                google_maps_link,
                additional_location_info,
                average_speed,
                is_creator
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
            RETURNING run_id`;

        const values = [
            runId,
            userId,
            trackName,
            runTitle,
            maxUsers,
            ageRange,
            description,
            time,
            gender,
            runType,
            date,
            difficulty,
            duration,
            distance,
            location,
            googleMapsLink,
            additionalLocationInfo,
            averageSpeed,
            is_creator
        ];

        const result = await pool.query(query, values);

        await client.query(
            `UPDATE users 
            SET runs_created = runs_created + 1 
            WHERE user_id = $1`,
        [userId]
        );
        
        await client.query('COMMIT');
        
        return result.rows[0].run_id;

    } catch (error) {
        console.error('Database error:', {
            message: error.message,
            stack: error.stack  
        });
        throw new Error(`Failed to create run: ${error.message}`);
    }
};

export {createRun}