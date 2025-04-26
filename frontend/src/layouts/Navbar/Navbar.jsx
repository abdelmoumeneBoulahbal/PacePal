import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './navbar.css'
import hermesLeg from '../../assets/icons/hermes (1).png'


/* assets */
import logo from '../../assets/logo/logo.png'




export default function Navbar() {
    const navigate = useNavigate();
    
    return (
        <nav className='nav'>
            <div className='nav-logo-div'>
                <img src={logo} alt="" />
            </div>
            <div className='nav-btn-div'>
                <button className='nav-runit-btn'
                        onClick={() => navigate('/auth/signup')}
                >
                <span className='btn-text'>RUNIT</span>
                <img src={hermesLeg} alt="hermes leg" className='hermes-leg' />
                <div className="speed-lines">
                    <span className="line"></span>
                    <span className="line"></span>
                    <span className="line"></span>
                </div>
                </button>
            </div>
        </nav>
    )
}
