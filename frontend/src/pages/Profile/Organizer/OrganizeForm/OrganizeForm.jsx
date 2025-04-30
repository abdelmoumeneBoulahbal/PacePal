import React, { useState } from 'react';
import "./orgForm.css";
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

function OrganizeForm() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    runTitle: '',
    trackName: '',
    date: '',
    time: '',
    description: '',
    ageRange: '',
    difficulty: '',
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // You can now send `formData` to your backend
  };

  return (
    <div className="org-form-page">
      <div className="back-navigation">
        <button onClick={() => navigate('/user/profile/organizer/runCreated')} className="back-button">
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
              {durations.map((duration, idx) => <option key={idx} value={duration}>{duration}</option>)}
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
                type="text" 
                id="averageSpeed"
                name="averageSpeed" 
                placeholder="Expected pace" 
                value={formData.averageSpeed} 
                onChange={handleChange}
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
    </div>
  );
}

export default OrganizeForm;