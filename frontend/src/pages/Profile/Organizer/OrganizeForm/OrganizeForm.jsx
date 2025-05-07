import React, { useState, useEffect } from 'react';
import "./orgForm.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import SuccessModal from '../../../../components/SuccessModal/SuccessModal';

function OrganizeForm() {
  const [showModal, setShowModal] = useState(false);
  
  const navigate = useNavigate();
  
  const location = useLocation();
  const userId = location.state?.userId;

  useEffect(() => {
    if (!userId) {
      console.error('User ID is missing. Redirecting to login...');
      // Redirect to login or display error
      // navigate('/login'); // Uncomment if you have a login route
    }
  }, [userId, navigate]);

  const runTypes = [
    { name: "Recovery Run", distances: ["2000m", "3000m", "5000m"] },
    { name: "Tempo Run", distances: ["3000m", "5000m", "10km"] },
    { name: "Long Run", distances: ["10km", "15km", "21km", "30km"] },
    { name: "Interval Training", distances: ["400m", "800m", "1000m"] },
    { name: "Hill Repeats", distances: ["3000m", "5000m", "7000m"] },
    { name: "Fartlek", distances: ["5000m", "8000m", "10km"] },
    { name: "Easy Run", distances: ["3000m", "5000m", "7000m"] },
    { name: "Trail Run", distances: ["5000m", "10km", "15km", "21km"] },
    { name: "Race Pace", distances: ["5000m", "10km", "21km", "42km"] }, // Marathon = 42km
    { name: "Cross Country", distances: ["5000m", "8000m", "10km"] }
  ];

  const [formData, setFormData] = useState({
    runTitle: '',
    trackName: '',
    date: '',
    time: '',
    description: '',
    ageRange: '',
    difficulty: '',
    runType: '',
    distance: '',
    duration: '',
    location: '',
    additionalLocationInfo: '',
    averageSpeed: '',
    maxUsers: '',
    gender: '',
    googleMapsLink: '',
  });

  const ageRanges = ['Under 18', '18-25', '26-35', '36-45', '46-55', '56+'];
  const difficulties = ['Easy', 'Medium', 'Challenging', 'Difficult', 'Expert'];
  const durations = ['Less than 1 hour', '1-2 hours', '2-3 hours', '3-5 hours', '5+ hours'];
  const locations = [
    'Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Biskra',
    'Béchar', 'Blida', 'Bouira', 'Tamanrasset', 'Tébessa', 'Tlemcen', 'Tiaret',
    'Tizi Ouzou', 'Algiers', 'Djelfa', 'Jijel', 'Sétif', 'Saïda'
  ];
  const genders = ['Male', 'Females', 'Mix'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    if (name === 'runType') {
      setFormData(prevState => ({
        ...prevState,
        distance: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      console.error('Error: User ID is missing');
      alert('User ID is missing. Please log in again.');
      return; 
    }

    try {

      const dataToSend = {
        ...formData,
        maxUsers: formData.maxUsers ? parseInt(formData.maxUsers, 10) : null,
        averageSpeed: formData.averageSpeed ? parseFloat(formData.averageSpeed) : null
      };

      console.log('Sending data:', dataToSend);
      console.log('To endpoint:', `http://localhost:3000/runs/createRun/${userId}`);

      const response = await fetch(`http://localhost:3000/runs/createRun/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
        credentials: 'include'
      });
      
      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (err) {
        console.error('Failed to parse response as JSON:', responseText);
        throw new Error('Invalid response format from server');
      }

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create run');
      }
      
      console.log('Run created successfully:', data);
      setShowModal(true);
      
      setTimeout(() => {
        navigate('/user/profile/organizer/runCreated', {
          state: { userId: userId }
        });
      }, 2500);

    } catch (error) {
      console.error('Error creating run:', error);
      alert(`Failed to create run: ${error.message}`);
    }
  };
  
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="org-form-page">
      <div className="back-navigation">
        <button onClick={() => navigate('/user/profile/organizer/runCreated', { 
          state: { userId: userId }
        })} className="back-button">
          <ChevronLeft size={20} />
          <span>Go Back</span>
        </button>
      </div>

      <div className="org-form-header">
        <h1 className="org-page-title">Organize a Run</h1>
        <p className="org-page-subtitle">Create a new running event and invite others to join</p>
      </div>

      <form className="org-form" onSubmit={handleSubmit}>
        <div className="org-form-section">
          <h2 className="org-section-title">Basic Information</h2>
          
          <div className="org-form-field">
            <label className="org-form-label" htmlFor="runTitle">Run Title</label>
            <input 
              type="text" 
              id="runTitle"
              name="runTitle" 
              placeholder="Give your run a catchy title" 
              value={formData.runTitle} 
              onChange={handleChange} 
              required 
              className="org-form-input"
            />
          </div>
          
          <div className="org-form-field">
            <label className="org-form-label" htmlFor="trackName">Track Name</label>
            <input 
              type="text" 
              id="trackName"
              name="trackName" 
              placeholder="Name of the running track" 
              value={formData.trackName} 
              onChange={handleChange} 
              required 
              className="org-form-input"
            />
          </div>

          <div className="org-form-row">
            <div className="org-form-field">
              <label className="org-form-label" htmlFor="date">Date</label>
              <input 
                type="date" 
                id="date"
                name="date" 
                value={formData.date} 
                onChange={handleChange} 
                required 
                className="org-form-input"
              />
            </div>
            <div className="org-form-field">
              <label className="org-form-label" htmlFor="time">Time</label>
              <input 
                type="time" 
                id="time"
                name="time" 
                value={formData.time} 
                onChange={handleChange} 
                required 
                className="org-form-input"
              />
            </div>
          </div>
        </div>

        <div className="org-form-section">
          <h2 className="org-section-title">Run Details</h2>
          
          <div className="org-form-field">
            <label className="org-form-label" htmlFor="description">Description</label>
            <textarea 
              id="description"
              name="description" 
              placeholder="Describe your run, what to expect, what to bring, etc." 
              value={formData.description} 
              onChange={handleChange} 
              rows="4" 
              required 
              className="org-form-textarea"
            />
          </div>

          <div className="org-form-row">
            <div className="org-form-field">
              <label className="org-form-label" htmlFor="ageRange">Age Range</label>
              <select 
                id="ageRange"
                name="ageRange" 
                value={formData.ageRange} 
                onChange={handleChange} 
                required 
                className="org-form-select"
              >
                <option value="">Select Age Range</option>
                {ageRanges.map((range, idx) => <option key={idx} value={range}>{range}</option>)}
              </select>
            </div>

            <div className="org-form-field">
              <label className="org-form-label" htmlFor="difficulty">Difficulty Level</label>
              <select 
                id="difficulty"
                name="difficulty" 
                value={formData.difficulty} 
                onChange={handleChange} 
                required 
                className="org-form-select"
              >
                <option value="">Select Difficulty</option>
                {difficulties.map((level, idx) => <option key={idx} value={level}>{level}</option>)}
              </select>
            </div>
          </div>
          
          {/* Improved Run Type Selection */}
          <div className="org-form-row">
            <div className="org-form-field">
              <label className="org-form-label" htmlFor="runType">Run Type</label>
              <select 
                id="runType"
                name="runType" 
                value={formData.runType} 
                onChange={handleChange} 
                required 
                className="org-form-select"
              >
                <option value="">Select Run Type</option>
                {runTypes.map((type, idx) => (
                  <option key={idx} value={type.name}>{type.name}</option>
                ))}
              </select>
            </div>
            
            {/* Improved Distance Selection */}
            <div className="org-form-field">
            <label className="org-form-label" htmlFor="distance">Distance</label>
            <select
              id="distance"
              name="distance"
              value={formData.distance}
              onChange={handleChange}
              required
              disabled={!formData.runType}
              className="org-form-select"
            >
              <option value="">Select Distance</option>
              {formData.runType && 
                runTypes
                  .find(type => type.name === formData.runType)
                  ?.distances.map((distance, idx) => (
                    <option key={idx} value={distance}>
                      {distance}
                    </option>
                  ))
              }
            </select>
          </div>
          </div>

          <div className="org-form-field">
            <label className="org-form-label" htmlFor="duration">Duration</label>
            <select 
              id="duration"
              name="duration" 
              value={formData.duration} 
              onChange={handleChange} 
              required 
              className="org-form-select"
            >
              <option value="">Select Duration</option>
              {durations.map((duration, idx) => (
                <option key={idx} value={duration}>{duration}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="org-form-section">
          <h2 className="org-section-title">Location & Participants</h2>
          
          <div className="org-form-field">
            <label className="org-form-label" htmlFor="location">Location</label>
            <select 
              id="location"
              name="location" 
              value={formData.location} 
              onChange={handleChange} 
              required 
              className="org-form-select"
            >
              <option value="">Select Location</option>
              {locations.map((loc, idx) => <option key={idx} value={loc}>{loc}</option>)}
            </select>
          </div>

          <div className="org-form-field">
            <label className="org-form-label" htmlFor="additionalLocationInfo">Meeting Point Details</label>
            <textarea
              id="additionalLocationInfo"
              name="additionalLocationInfo"
              placeholder="Provide specific meeting point details (e.g., 'In front of the park entrance')"
              value={formData.additionalLocationInfo}
              onChange={handleChange}
              rows="2"
              className="org-form-textarea"
            />
          </div>

          <div className="org-form-row">
            <div className="org-form-field">
              <label className="org-form-label" htmlFor="averageSpeed">Average Speed (km/h)</label>
              <input 
                type="number" 
                id="averageSpeed"
                name="averageSpeed" 
                placeholder="Expected pace" 
                value={formData.averageSpeed} 
                onChange={handleChange}
                step="0.1"
                min="0"
                className="org-form-input"
              />
            </div>
            <div className="org-form-field">
              <label className="org-form-label" htmlFor="maxUsers">Maximum Participants</label>
              <input 
                type="number" 
                id="maxUsers"
                name="maxUsers" 
                placeholder="Leave empty for unlimited" 
                value={formData.maxUsers} 
                onChange={handleChange}
                min="0"
                className="org-form-input"
              />
            </div>
          </div>
          
          <div className="org-form-field">
            <label className="org-form-label" htmlFor="gender">Gender Group</label>
            <select 
              id="gender"
              name="gender" 
              value={formData.gender} 
              onChange={handleChange} 
              required 
              className="org-form-select"
            >
              <option value="">Select Gender Group</option>
              {genders.map((g, idx) => <option key={idx} value={g}>{g}</option>)}
            </select>
          </div>
          
          <div className="org-form-field">
            <label className="org-form-label" htmlFor="googleMapsLink">Google Maps Link</label>
            <input 
              type="url" 
              id="googleMapsLink"
              name="googleMapsLink" 
              placeholder="Paste a Google Maps link to the location" 
              value={formData.googleMapsLink} 
              onChange={handleChange}
              className="org-form-input"
            />
          </div>
        </div>

        <div className="org-form-actions">
          <button type="submit" className="org-submit-btn">Create Run</button>
        </div>
      </form>
      {showModal && (
        <SuccessModal 
          message="Run Created Successfully! Redirecting Now..." 
          onClose={closeModal} 
        />
      )}
    </div>
  );
}

export default OrganizeForm;