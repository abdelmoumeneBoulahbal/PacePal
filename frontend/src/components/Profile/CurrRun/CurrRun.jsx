import React, { useEffect, useState } from 'react';
import './curr.css';
import shoe from '../../../assets/icons/running-shoes.png';

export default function CurrRun({ userData }) {
  const [runData, setRunData] = useState(null);
  console.log(runData)

  useEffect(() => {
    const fetchRunDetails = async () => {
      if (!userData?.current_run_id) return;

      try {
        const response = await fetch(`http://localhost:3000/run/runDetails/${userData.current_run_id}`);
        if (!response.ok) throw new Error('Failed to fetch run details');

        const data = await response.json();
        setRunData(data.run[0]);
      } catch (error) {
        console.error('Error fetching run details:', error);
      }
    };

    fetchRunDetails();
  }, [userData?.current_run_id]);

  return (
    <div className='curr-container'>
      <div className='curr-top'>
        <img src={shoe} alt="Running Shoes" />
        <h3>Current Run Info</h3>
      </div>
      <div>
        <div className='curr-content-div'>
          {runData ? (
            <ul className='curr-ul'>
              <li><span>Title:</span> {runData.run_title}</li>
              <li><span>Difficulty:</span> {runData.difficulty}</li>
              <li><span>Duration:</span> {runData.duration}</li>
              <li><span>Date:</span> {runData.start_time?.slice(0, 5).replace('T', ' ')}</li>
            </ul>
          ) : (
            <p>No current run joined or loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}
