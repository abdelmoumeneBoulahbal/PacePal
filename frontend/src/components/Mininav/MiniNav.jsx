import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Leg from '../../assets/icons/hermesBlack.png'
import './mn.css'

function MiniNav() {
  const navigate = useNavigate()
  const location = useLocation()

  const isLoginPage = location.pathname.includes('login')

  const handleClick = () => {
    if (isLoginPage) {
      navigate('/auth/signup')
    } else {
      navigate('/auth/login')
    }
  }

  return (
    <div className='mini-nav-div'>
        <div className='mn-nav-div'>
            <h1>PacePal</h1>
            <img src={Leg} alt="hermes leg" />
        </div>
        <div>
          <button className='lg-mn-btn' onClick={handleClick}>
            {isLoginPage ? 'Signup' : 'Login'}
          </button>
        </div>
    </div>
  )
}

export default MiniNav
