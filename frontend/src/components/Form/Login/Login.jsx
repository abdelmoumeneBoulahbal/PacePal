import React from 'react'
import { useState } from 'react'
import Footer from '../../../layouts/Footer/Footer.jsx'
import user from '../../../assets/icons/user.png'
import password from '../../../assets/icons/key (1).png'
import '../Signup/signup.css'
import './login.css'
import SuccessModal from '../../SuccessModal/SuccessModal.jsx'


import runner from '../../../assets/icons/shoe (1).png'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [loginData, setLoginData] = useState({ 
    identifier: '', 
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setLoginData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (!response) {
        throw new Error('Network error - no response from server');
      }
  
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      setShowModal(true);
      setTimeout(() => {
        navigate(`/users/profile/${data.user_id}`);
      }, 1000);


    }  catch (err) {
      setError(
        err.message === 'Failed to fetch' 
          ? 'Network error. Check your connection.'
          : err.message
      );
    } finally {
      setIsLoading(false);
    }
  }

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section className="signup-section">
      <div className="signup-container">
        <div className='img-div-signup'>
          <img src={runner} alt="hermesLeg" />
        </div>
        <h2>Return to the Race</h2>
        <h3>Welcome Back, Runner</h3>
        <form onSubmit={handleSubmit}>
          <div className='frm-content-div'>
            <div className="form-group">
              <label htmlFor="identifier" style={{fontSize:"1.2rem" }}>
                <img src={user} alt="user icon" />
                Username or Email
              </label>
              <input
                value={loginData.identifier} 
                onChange={handleChange}
                type="text" 
                id="identifier" 
                name="identifier" 
                placeholder="Enter your username or email" 
                required 
              />
            </div>

            <div className="form-group">
              <label style={{fontSize:"1.2rem" }} htmlFor="password">
                <img src={password} alt="password icon" />
                Password
              </label>
              <input 
                value={loginData.password}
                onChange={handleChange}
                type="password" 
                id="password" 
                name="password" 
                placeholder="Enter your password" 
                required 
              />
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <div className='additional-text-login'>
              <div className='fg-pd-div'>
                <a href="/forgot-password" className='fg-pd-link'>
                  <p>Forgot Password ?</p>
                </a>
              </div>
              <div className='sgpNow-div'>
                Don't have an Account yet ?, <a onClick={() => navigate('/auth/signup')} className='rgNow-link'>Register Now</a>
              </div>
            </div>
          </div>
          <button
            type="submit" 
            className="submit-btn login"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
      {showModal && (
        <SuccessModal 
          message="Login Successful! Redirecting to your profile..." 
          onClose={closeModal} 
        />
      )}
    </section>
  )
}