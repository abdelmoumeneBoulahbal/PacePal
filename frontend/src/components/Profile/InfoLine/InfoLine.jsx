import React from 'react';

import './infoLine.css'

export const InfoLine = ({ 
  title, 
  duration, 
  difficulty, 
  numberOfParticipants, 
  speed, 
  trackInfo, 
  date, 
  zone 
}) => {
  return (
    <tr>
      <td className='title-table'>{title}</td>
      <td>{duration}</td>
      <td>{difficulty}</td>
      <td>{numberOfParticipants}</td>
      <td>{speed}</td>
      <td>{trackInfo}</td>
      <td>{date}</td>
      <td>{zone}</td>
    </tr>
  );
};
