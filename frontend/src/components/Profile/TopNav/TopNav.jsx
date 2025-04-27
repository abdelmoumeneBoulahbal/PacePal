import React from 'react'
import './topnav.css'

export const TopNav = () => {
  return (
    <div className='prf-top-nav-container'>
        <div className='prf-tn-top'>
            <h2>My Run Data</h2>
            <p className="run-subtitle">Track and analyze your performance, stay motivated, and achieve new personal records!</p>
        </div>
        <div>
            <button className='far-prf-btn'>Find a Run</button>
        </div>
    </div>
  )
}
