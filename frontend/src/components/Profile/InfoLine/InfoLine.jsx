import React from 'react';

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
      <td>{title}</td>
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
