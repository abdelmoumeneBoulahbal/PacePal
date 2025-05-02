import React from 'react'
import { useState } from 'react'
import './signup.css'
import SuccessModal from '../../../components/SuccessModal/SuccessModal.jsx';
import runner from '../../../assets/icons/running2.png'
import { useNavigate } from 'react-router-dom'

export const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    gender: '',
  });

  const colorPalette = [
    ' #B02130 ', 
    ' #007bff ', 
    ' #30B8AB ', 
    ' #7F00A9 ', 
  ];
  
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');  // Simplified error state

  const handleHover = () => {
    // Cycle to the next color in the palette
    const nextIndex = (currentColorIndex + 1) % colorPalette.length;
    setCurrentColorIndex(nextIndex);
    
    // Update CSS variable
    document.documentElement.style.setProperty('--hover-color', colorPalette[nextIndex]);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error
  
    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Success case
        setShowModal(true);
        setTimeout(() => {
          localStorage.setItem('userId', data.user_id);
          navigate("/user/profile");
        }, 5000);
      } else {
        // Just display the error message from the backend
        setErrorMessage(data.error || "An error occurred during signup");
      }
    } catch (error) {
      console.error('Signup error:', error);
      setErrorMessage("Connection error: Couldn't reach the server");
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section className="signup-section">
      <div className="signup-container">
        <div className='img-div-signup'>
          <img src={runner} alt="hermesLeg" />
        </div>

        <h2>Create an Account</h2>
        <h3>Your Journey starts now</h3>

        <div className='loginNow-div'>
          <p>Already have an account? <a onClick={() => navigate('/auth/login')}>Login Now</a></p>
        </div>      

        <form onSubmit={handleSubmit}>
        <div className='frm-content-div'>
          <div className="form-group fn-div">
            <div className='fr-div'>
              <label htmlFor="firstName">First Name</label>
              <input 
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                value={formData.firstName}
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
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                value={formData.lastName}
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
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              value={formData.email}
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
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              value={formData.phone}
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
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              value={formData.username}
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
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              value={formData.password}
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
              onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
              value={formData.dateOfBirth}
              type="date" 
              id="birthdate" 
              name="birthdate" 
              required 
            />
          </div>

          <div className="form-group radio-group">
            <label htmlFor="gender">Gender</label>
            <select 
              id="gender" 
              name="gender" 
              required 
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            >
              <option style={{color: '#16133a'}} value="">Select Gender</option>
              <option style={{color: '#16133a'}} value="male">Male</option>
              <option style={{color: '#16133a'}} value="female">Female</option>
            </select>
          </div>
        </div>
        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}

        <div className='tc-pp-div'>
          <p>By signing up on Pacepal, you agree with our <br /> 
            <b>Terms & Conditions</b> and <b>Privacy policy</b>
          </p>
        </div>

        <button
          onMouseEnter={handleHover}
          style={{ '--hover-color': colorPalette[currentColorIndex] }}
          type="submit" 
          className="submit-btn"
        >
          Create Account
        </button>
        </form>

        {showModal && (
          <SuccessModal 
            message="Signup Successful! Redirecting to your profile..." 
            onClose={closeModal} 
          />
        )}
      </div>
    </section>
  )
}