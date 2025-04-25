import React from 'react'
// eslint-disable-next-line no-unused-vars
import logo from '../../assets/logo/logo.png'

import Leg from '../../assets/icons/hermesBlack.png'

import './mn.css'

function MiniNav() {
  return (
    <div className='mini-nav-div'>
        <div className='mn-nav-div'>
            <h1>PacePal</h1>
            <img src={Leg} alt="" />
        </div>
        <div>
            side menu
        </div>
    </div>
  )
}

export default MiniNav