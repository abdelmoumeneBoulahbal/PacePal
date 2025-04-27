import React from 'react'

import './curr.css'
import shoe from '../../../assets/icons/running-shoes.png'

export default function CurrRun() {
  return (
    <div className='curr-container'>
        <div className='curr-top'>
            <img src={shoe} alt="" />
            <h3>Current Run Info</h3>
        </div>
        <div>
            <div className='curr-content-div'>
                <ul className='curr-ul'>
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
