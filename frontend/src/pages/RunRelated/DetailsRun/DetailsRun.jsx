import React, { useState } from 'react';
import { User, Calendar, Clock, Users, Activity, Map, Award, MapPin, Heart, Shield, ChevronLeft } from 'lucide-react';
import './dtsRun.css'; // We'll create this CSS file
import { useNavigate } from 'react-router-dom';

function DetailsRun() {
  // State for showing/hiding the confirmation modal
  const [showConfirmation, setShowConfirmation] = useState(false);

  const navigate = useNavigate();

  // Sample run data
  const runData = {
    id: 1,
    title: 'Morning Run',
    createdBy: {
      username: 'runner1',
      name: 'Ahmed Bensaïd',
      memberSince: '2023-05-15',
      title: 'Running Enthusiast',
      runsCreated: 24,
      profilePic: '/api/placeholder/50/50'
    },
    location: 'Jardin d\'Essai du Hamma, Algiers',
    mapLink: 'https://goo.gl/maps/123456',
    date: '2025-04-26',
    time: '08:00',
    duration: '45 mins',
    difficulty: 'Medium',
    ageRange: '26-35',
    gender: 'Mixed',
    participants: [
      { username: 'mountainRunner', name: 'Karim Farès', age: 28, profilePic: '/api/placeholder/40/40' },
      { username: 'fitnessLover', name: 'Sarah Khalil', age: 32, profilePic: '/api/placeholder/40/40' },
      { username: 'marathonPro', name: 'Leila Ziani', age: 29, profilePic: '/api/placeholder/40/40' },
      { username: 'trailblazer', name: 'Omar Benali', age: 34, profilePic: '/api/placeholder/40/40' },
      { username: 'desertTrekker', name: 'Amina Hadj', age: 27, profilePic: '/api/placeholder/40/40' }
    ],
    speed: '10 km/h',
    trackInfo: 'Park trail with slight elevation',
    zone: 'Zone 2',
    description: 'A refreshing morning run through the beautiful Jardin d\'Essai. We\'ll follow the main path and enjoy the scenic views of flora. Suitable for intermediate runners who want to improve their endurance while enjoying nature.'
  };

  // Toggle confirmation modal
  const toggleConfirmation = () => {
    setShowConfirmation(!showConfirmation);
  };

  // Handle join run action
  const handleJoinRun = () => {
    // Here you would add logic to join the run
    setShowConfirmation(false);
    // Show some success message or update UI accordingly
    alert('You have successfully joined the run!');
  };

  return (
    <div className="run-details-container">
      {/* Back Navigation */}
      <div className="back-navigation">
        <button onClick={() => navigate('/user/search')} className="back-button">
          <ChevronLeft size={20} />
          <span>Back to Search</span>
        </button>
      </div>
      
      {/* Page Title */}
      <h1 className="page-title">Run Details</h1>
      
      {/* Main Content */}
      <div className="details-content">
        {/* Run Header */}
        <div className="run-header">
          <h2 className="run-title-detail">{runData.title}</h2>
          <button className="join-run-btn" onClick={toggleConfirmation}>
            JOIN THIS RUN
          </button>
        </div>
        
        {/* Run Creator Info */}
        <div className="creator-card">
          <div className="creator-header">
            <h3>Created By</h3>
          </div>
          <div className="creator-content">
            <div className="creator-profile">
              <img 
                src={runData.createdBy.profilePic} 
                alt={runData.createdBy.name} 
                className="creator-pic"
              />
              <div className="creator-info">
                <h4>{runData.createdBy.name}</h4>
                <p className="username">@{runData.createdBy.username}</p>
                <p className="creator-title">{runData.createdBy.title}</p>
              </div>
            </div>
            <div className="creator-stats">
              <div className="stat-item">
                <span className="stat-label">Member Since</span>
                <span className="stat-value">{new Date(runData.createdBy.memberSince).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Runs Created</span>
                <span className="stat-value">{runData.createdBy.runsCreated}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Run Details Grid */}
        <div className="details-grid">
          {/* Description */}
          <div className="details-card description-card">
            <h3>Description</h3>
            <p>{runData.description}</p>
          </div>
          
          {/* Run Information */}
          <div className="details-card info-card">
            <h3>Run Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <div className="info-icon-wrapper">
                  <Calendar size={20} />
                </div>
                <div className="info-content">
                  <span className="info-label">Date</span>
                  <span className="info-value">{new Date(runData.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon-wrapper">
                  <Clock size={20} />
                </div>
                <div className="info-content">
                  <span className="info-label">Time</span>
                  <span className="info-value">{runData.time}</span>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon-wrapper">
                  <Activity size={20} />
                </div>
                <div className="info-content">
                  <span className="info-label">Duration</span>
                  <span className="info-value">{runData.duration}</span>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon-wrapper">
                  <Award size={20} />
                </div>
                <div className="info-content">
                  <span className="info-label">Difficulty</span>
                  <span className={`difficulty-badge ${runData.difficulty.toLowerCase()}`}>
                    {runData.difficulty}
                  </span>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon-wrapper">
                  <Users size={20} />
                </div>
                <div className="info-content">
                  <span className="info-label">Age Range</span>
                  <span className="info-value">{runData.ageRange}</span>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon-wrapper">
                  <Activity size={20} />
                </div>
                <div className="info-content">
                  <span className="info-label">Average Speed</span>
                  <span className="info-value">{runData.speed}</span>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon-wrapper">
                  <Map size={20} />
                </div>
                <div className="info-content">
                  <span className="info-label">Run Track</span>
                  <span className="info-value">{runData.trackInfo}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Location */}
          <div className="details-card location-card">
            <h3>Location</h3>
            <div className="location-content">
              <div className="location-header">
                <MapPin size={20} />
                <p>{runData.location}</p>
              </div>
              <div className="map-placeholder">
                <img src="/api/placeholder/400/200" alt="Map location" className="map-image" />
                <a href={runData.mapLink} className="map-link" target="_blank" rel="noopener noreferrer">
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>
          
          {/* Participants */}
          <div className="details-card participants-card">
            <h3>Participants ({runData.participants.length})</h3>
            <div className="participants-list">
              {runData.participants.map((participant, index) => (
                <div key={index} className="participant-item">
                  <img 
                    src={participant.profilePic} 
                    alt={participant.name} 
                    className="participant-pic" 
                  />
                  <div className="participant-info">
                    <p className="participant-name">{participant.name}</p>
                    <p className="participant-username">@{participant.username}</p>
                    <p className="participant-age">{participant.age} years</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="modal-overlay">
          <div className="confirmation-modal">
            <div className="modal-header">
              <h3>Join Run Confirmation</h3>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to join the <strong>{runData.title}</strong>?</p>
              <p>This run will be added to your calendar and the creator will be notified.</p>
              <div className="run-quick-info">
                <div className="quick-info-item">
                  <Calendar size={16} />
                  <span>{new Date(runData.date).toLocaleDateString()}</span>
                </div>
                <div className="quick-info-item">
                  <Clock size={16} />
                  <span>{runData.time}</span>
                </div>
                <div className="quick-info-item">
                  <MapPin size={16} />
                  <span>{runData.location}</span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={toggleConfirmation}>Cancel</button>
              <button className="confirm-btn" onClick={handleJoinRun}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailsRun;