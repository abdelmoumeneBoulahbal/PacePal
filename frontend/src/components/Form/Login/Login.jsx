import React from 'react'
import { useState } from 'react'

import Footer from '../../../layouts/Footer/Footer.jsx'


import '../Signup/signup.css'
import './login.css'




// eslint-disable-next-line no-unused-vars
import hermesBlack from '../../../assets/icons/hermesBlack.png'
import runner from '../../../assets/icons/shoe (1).png'
import { useNavigate } from 'react-router-dom'



export const Login = () => {
  const colorPalette = [
    ' #B02130 ', 
  ];
  
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  const handleHover = () => {
    // Cycle to the next color in the palette
    const nextIndex = (currentColorIndex + 1) % colorPalette.length;
    setCurrentColorIndex(nextIndex);
    
    // Update CSS variable
    document.documentElement.style.setProperty('--hover-color', colorPalette[nextIndex]);
  };

  const navigate = useNavigate();

  return (
    <section className="signup-section">
      <div className="signup-container">
        <div className=' img-div-signup'>
          <img src={runner} alt="hermesLeg" />
        </div>
        <h2>Return to the Race</h2>
        <h3>Welcome Back, Runner</h3>
        <form action="/submit-signup" method="POST">
        <div className='frm-content-div'>



          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              placeholder="Enter your username" 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              placeholder="Enter your password" 
              required 
            />
          </div>
          <div className='additional-text-login'>
            <div className='fg-pd-div'>
              <a href="" className='fg-pd-link'>
                <p>Forgot Password ?</p>
              </a>
            </div>
            <div className='sgpNow-div'>
              Don't have an Account yet ?, <a onClick={() => navigate('/auth/signup')} className='rgNow-link'>Register Now</a>
            </div>
          </div>
          </div>
          <button
             onMouseEnter={handleHover}
             style={{ '--hover-color': colorPalette[currentColorIndex] }}
          type="submit" className="submit-btn">Login</button>
        </form>
      </div>

      
    </section>
  )
}