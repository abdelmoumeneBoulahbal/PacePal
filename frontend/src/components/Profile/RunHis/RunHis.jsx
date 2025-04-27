import React, { useState } from 'react';
import { InfoLine } from '../InfoLine/InfoLine';
import search from '../../../assets/icons/search-interface-symbol.png'; // Ensure the image path is correct

import './runhis.css';

import runTime from '../../../assets/icons/schedule.png'

function RunHis() {
  // Step 1: Use state to track the input value
  const [searchQuery, setSearchQuery] = useState('');

  // Handle input change
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className='rh-container'>
      <div className='rh-top'>
        <div className='rh-top-title'>
        <img src={runTime} alt="" />
        <h3>Run History</h3>
        </div>
        <div className="rh-search-container">
          {/* Step 2: Conditionally render the search icon based on the input */}
          {!searchQuery && <img src={search} alt="Search Icon" className="rh-search-icon" />}
          <input
            type="text"
            placeholder="Search Runs"
            className="rh-search"
            value={searchQuery}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className='rh-bottom'>
        <table>
          <thead>
            <tr>
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
          <button className='rh-btn'>See more</button>
        </div>
      </div>
    </div>
  );
}

export default RunHis;
