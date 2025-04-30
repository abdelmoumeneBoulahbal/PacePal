import React from 'react'
import { useState } from 'react'

import Footer from '../../../layouts/Footer/Footer.jsx'


import './signup.css'




// eslint-disable-next-line no-unused-vars
import hermesBlack from '../../../assets/icons/hermesBlack.png'
import runner from '../../../assets/icons/running2.png'
import { useNavigate } from 'react-router-dom'



export const Signup = () => {
  const colorPalette = [

    ' #B02130 ', 
    ' #007bff ', 
    ' #30B8AB ', 
    ' #7F00A9 ', 
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
        <h2>Create an Account</h2>
        <h3>Your Journey starts now</h3>
        <div className='loginNow-div'>
          <p>Already have an account? <a  onClick={() => navigate('/auth/login')}>Login Now</a></p>
        </div>
        <form action="/submit-signup" method="POST">
        <div className='frm-content-div'>

          <div className="form-group fn-div">
            <div className='fr-div'>
            <label htmlFor="firstName">First Name</label>
            <input 
              type="text" 
              id="firstName" 
              name="firstName" 
              placeholder="Enter your first name" 
              required 
              />
              </div>
            <div className='ln-div'>
            <label htmlFor="lastName">Last Name</label>
            <input 
              type="text" 
              id="lastName" 
              name="lastName" 
              placeholder="Enter your last name" 
              required 
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="Enter your email" 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              placeholder="Enter your phone number" 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              placeholder="Choose a username" 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              placeholder="Create a password" 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="birthdate">Date of Birth</label>
            <input 
              type="date" 
              id="birthdate" 
              name="birthdate" 
              required 
            />
          </div>

          <div className="form-group radio-group">
            <label  htmlFor="gender">Gender</label>
            <select id="gender" name="gender" required>
              <option style={{color: '#16133a'}} value="">Select Gender</option>
              <option style={{color: '#16133a'}} value="male">Male</option>
              <option style={{color: '#16133a'}} value="female">Female</option>
            </select>
          </div>

          </div>
          <div className='tc-pp-div'>
            <p>By signing up on Pacepal, you agree with our <br /> 
                <b>Terms & Conditions</b> and <b>Privacy policy</b>
            </p>
          </div>
          <button
             onMouseEnter={handleHover}
             style={{ '--hover-color': colorPalette[currentColorIndex] }}
          type="submit" className="submit-btn" onClick={()=>navigate("/user/profile")}>Create Account</button>
        </form>
      </div>

      
    </section>
  )
}