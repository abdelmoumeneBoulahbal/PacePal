import React, { useState } from 'react'
import './card.css'

function Card({ cardTitle, cardImg, cardDesc }) {
  const [shadowStyle, setShadowStyle] = useState({});

  const handleMouseEnter = () => {
    const possibleOffsets = [10, -10, 15, -15];
    const offsetX = possibleOffsets[Math.floor(Math.random() * possibleOffsets.length)];
    const offsetY = possibleOffsets[Math.floor(Math.random() * possibleOffsets.length)];
    setShadowStyle({
      boxShadow: `${offsetX}px ${offsetY}px 0px var(--text-dark)`
    });
  };

  const handleMouseLeave = () => {
    setShadowStyle({});
  };
  
  return (
    <div className='card-container'
        style={shadowStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave} 
    >
      <div className='card'>
        <h1 className='card-title'>{cardTitle}</h1>
        <div className='card-img-wrapper'>
          <img src={cardImg} alt={cardTitle} className='card-img' />
        </div>
        <p className='card-desc'>{cardDesc}</p>
     </div>
    </div>
  )
}

export default Card
