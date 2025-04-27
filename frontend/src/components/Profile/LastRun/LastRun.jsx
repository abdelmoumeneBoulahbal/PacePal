import React from 'react'

import './last.css'
import bottle from '../../../assets/icons/bottle.png'

export default function LastRun() {
  return (
    <div className='last-container'>
        <div className='last-top'>
            <img src={bottle} alt="" />
            <h3>Latest Run Info</h3>
        </div>
        <div>
            <div className='last-content-div'>
                <ul className='last-ul'>
                    <li><span>Title:</span> Run Title</li>
                    <li><span>Difficulty:</span> Diffculty</li>
                    <li><span>Duration:</span> Duration</li>
                    <li><span>Date:</span> Date and Time</li>
                </ul>
            </div>
        </div>
    </div>
    )
}
