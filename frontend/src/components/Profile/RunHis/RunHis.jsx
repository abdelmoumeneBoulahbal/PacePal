import React from 'react';
import { InfoLine } from '../InfoLine/InfoLine';

import './runhis.css';

import runTime from '../../../assets/icons/schedule.png'

import { useNavigate } from 'react-router-dom';

function RunHis() {

  const navigate = useNavigate()

  return (
    <div className='rh-container'>
      <div className='rh-top'>
        <div className='rh-top-title'>
        <img src={runTime} />
        <h3>Run History</h3>
        </div>
       
      </div>
      <div className='rh-bottom'>
        <table>
          <thead>
            <tr className='table-head'>
              <th>Title</th>
              <th>Duration</th>
              <th>Difficulty</th>
              <th>Participants</th>
              <th>Speed</th>
              <th>Track Info</th>
              <th>Date</th>
              <th>Zone</th>
            </tr>
          </thead>
          <tbody>
            <InfoLine 
              title="Morning Run"
              duration="45 mins"
              difficulty="Medium"
              numberOfParticipants="5"
              speed="10 km/h"
              trackInfo="Park trail"
              date="2025-04-26"
              zone="Zone 2"
            />
            <InfoLine 
              title="Morning Run"
              duration="45 mins"
              difficulty="Medium"
              numberOfParticipants="5"
              speed="10 km/h"
              trackInfo="Park trail"
              date="2025-04-26"
              zone="Zone 2"
            />
          </tbody>
        </table>
        <div className='rh-btn-div'>
          <button onClick={() => navigate('history')} className='rh-btn'>See more</button>
        </div>
      </div>
    </div>
  );
}

export default RunHis;
