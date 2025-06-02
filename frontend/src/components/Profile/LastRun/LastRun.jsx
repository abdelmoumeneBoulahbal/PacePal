import React, { useEffect, useState } from 'react';
import './last.css';
import bottle from '../../../assets/icons/bottle.png';

export default function LastRun({ userData }) {
  const [runData, setRunData] = useState(null);

  useEffect(() => {
    const fetchRunDetails = async () => {
      if (!userData?.latest_run_id) return;

      try {
        const response = await fetch(`http://localhost:3000/run/runDetails/${userData.latest_run_id}`);
        if (!response.ok) throw new Error('Failed to fetch run details');

        const data = await response.json();
        setRunData(data.run[0]);
      } catch (error) {
        console.error('Error fetching run details:', error);
      }
    };

    fetchRunDetails();
  }, [userData?.latest_run_id]);

  return (
    <div className='last-container'>
      <div className='last-top'>
        <img src={bottle} alt="Water Bottle Icon" />
        <h3>Latest Run Info</h3>
      </div>
      <div>
        <div className='last-content-div'>
          {runData ? (
            <ul className='last-ul'>
              <li><span>Title:</span> {runData.run_title}</li>
              <li><span>Difficulty:</span> {runData.difficulty}</li>
              <li><span>Duration:</span> {runData.duration}</li>
              <li><span>Date:</span> {runData.date?.slice(0, 10)} at {runData.start_time?.slice(0, 5)}</li>
            </ul>
          ) : (
            <p
                style={{
                    'padding':'2rem',
                    'lineHeight':'1.5rem',
                    'fontSize':'1.2rem',
                    'fontWeight':'600'
                }}
            >No Latest Run for the moment. You need to complete one.</p>
          )}
        </div>
      </div>
    </div>
  );
}
