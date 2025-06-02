import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { User, Calendar, Clock, Users, Activity, Map, Award, MapPin, ChevronLeft } from 'lucide-react';
import './dtsRun.css';
import Loading from '../../../components/Loading/Loading';

import runnerGif from '../../../assets/icons/running.gif'

import MapGif from '../../../assets/icons/maps.gif'

function DetailsRun({ isOrganizer = false }) {
  const [runData, setRunData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [creatorData, setCreatorData] = useState(null);

  const [userId, setUserId] = useState(null);

  const [isJoining, setIsJoining] = useState(false);

  const [participants, setParticipants] = useState([]);
  const [loadingParticipants, setLoadingParticipants] = useState(false);

  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const { state } = useLocation()

  const runId = state.runId
  const organizerId = state.creatorId

  console.log(runId, organizerId)

    const calculateAge = (birthDate) => {
    if (!birthDate) return 'N/A';
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    return age;
  };


   useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      console.log('Retrieved userId:', storedUserId);
    } else {
      console.log('No userId found in localStorage');
    }
  }, []);


  useEffect(() => {
    const fetchRunData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/run/runDetails/${runId}`);
        if (!response.ok) throw new Error('Failed to fetch run data');
        const data = await response.json();
        setRunData(data.run[0]);

        console.log(runData)
        
        const creatorResponse = await fetch(`http://localhost:3000/users/profile/${organizerId}`);
        if (!creatorResponse.ok) throw new Error('Failed to fetch creator data');
        const creatorJson = await creatorResponse.json();
        console.log(creatorJson)
        setCreatorData(creatorJson);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRunData();
  }, [runId]);

    useEffect(() => {
    const fetchParticipants = async () => {
      try {
        setLoadingParticipants(true);
        
        const participantsResponse = await fetch(
          `http://localhost:3000/run/runDetails/runParticipants/${runId}`
        );
        
        if (!participantsResponse.ok) {
          throw new Error('Failed to fetch participants');
        }
        
        const data = await participantsResponse.json();
        console.log('Participants data:', data);

        const formattedParticipants = data.participants.map(participant => ({
          id: participant.id || `${participant.username}_${participant.email}`,
          profilePic: participant.profile_pic || '/default-profile.png',
          name: `${participant.first_name} ${participant.last_name}`,
          username: participant.username,
          age: calculateAge(participant.birth_date),
          email: participant.email,
        }));

        
        setParticipants(formattedParticipants);

        console.log('Participants Ids : ',formattedParticipants)
      } catch (error) {
        console.error('Error fetching participants:', error);
      } finally {
        setLoadingParticipants(false);
      }
    };

    if (runId) {
      fetchParticipants();
    }
  }, [runId]);

const handleJoinRun = async () => {
  if (!userId) {
    alert('Please log in to join this run');
    return;
  }

  setShowConfirmation(false);
  setIsJoining(true);

  try {
    const response = await fetch(`http://localhost:3000/run/join`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Add if using JWT
      },
      body: JSON.stringify({
        user_id: userId,
        run_id: runId
      })
    });

    const data = await response.json();
    
    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Failed to join run');
    }

    const participantsResponse = await fetch(
      `http://localhost:3000/run/runDetails/runParticipants/${runId}`
    );
    const participantsData = await participantsResponse.json();
    
    const formattedParticipants = participantsData.participants.map(participant => ({
      id: participant.id || `${participant.username}_${participant.email}`,
      profilePic: participant.profile_pic || '/default-profile.png',
      name: `${participant.first_name} ${participant.last_name}`,
      username: participant.username,
      age: calculateAge(participant.birth_date),
    }));

    setParticipants(formattedParticipants);

    alert('Successfully joined the run!');

  } catch (err) {
    console.error('Join run error:', err);
    alert(err.message || 'Failed to join run');
  } finally {
    setIsJoining(false);
  }
};

  if (loading) return <Loading loadingInfo={'Run Details'}/>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!runData) return <div className="error">No run data found</div>;

  return (
    <div className="run-details-container">
      <div className="back-navigation">
        <button onClick={() => navigate(-1)} className="back-button">
          <ChevronLeft size={20} />
          <span>Back to {isOrganizer ? 'Dashboard' : 'Search'}</span>
        </button>
      </div>

      <h1 className="page-title">Run Details</h1>

      <div className="details-content">
        <div className="run-header">
          <h2 className="run-title-detail">{runData.run_title}</h2>
          {!isOrganizer && (
            <button className="join-run-btn" onClick={() => setShowConfirmation(true)}>
              JOIN THIS RUN
            </button>
          )}
        </div>

        {/* Run Creator Info */}
        <div className="creator-card">
          <div className="creator-header">
            <h3>Created By</h3>
          </div>
           <div className="creator-content">
            {creatorData ? (
              <>
                <div className="creator-profile">
                  <img 
                    src={creatorData.profile_pic || "/default-profile.png"} 
                    alt={`${creatorData.first_name || ''} ${creatorData.last_name || ''}`}
                    className="creator-pic"
                  />
                  <div className="creator-info">
                    <h4>{creatorData.first_name} {creatorData.last_name}</h4>
                    <p className="username">@{creatorData.username}</p>
                    {creatorData.title && <p className="creator-title">{creatorData.title}</p>}
                  </div>
                </div>
                <div className="creator-stats">
                  <div className="stat-item">
                    <span className="stat-label">Member Since</span>
                    <span className="stat-value">
                       {creatorData?.created_at ? (
                        new Date(creatorData.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })
                      ) : 'N/A'}
                    </span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Runs Created</span>
                    <span className="stat-value">{creatorData.runs_created}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="no-creator">Creator information not available</div>
            )}
          </div>
        </div>

        {/* Run Information Section */}
        <div className="details-grid">
          <div className="details-card description-card">
            <h3>Description & Additional Meeting Info</h3>

            <p>{runData.description || 'No description provided'}</p>
            <p> {runData.additional_location_info} </p>
          </div>

          <div className="details-card info-card">
            <h3>Run Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <div className="info-icon-wrapper">
                  <Calendar size={20} />
                </div>
                <div className="info-content">
                  <span className="info-label">Date</span>
                  <span className="info-value">
                    {new Date(runData.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon-wrapper">
                  <Clock size={20} />
                </div>
                <div className="info-content">
                  <span className="info-label">Time</span>
                  <span className="info-value">
                    {runData.start_time}
                  </span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon-wrapper">
                  <Clock size={20} />
                </div>
                <div className="info-content">
                  <span className="info-label">Max Participants</span>
                  <span className="info-value">
                    {runData.max_people}
                  </span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon-wrapper">
                  <User size={20} />
                </div>
                <div className="info-content">
                  <span className="info-label">Gender</span>
                  <span className="info-value">
                    {runData.gender}
                  </span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon-wrapper">
                  <Clock size={20} />
                </div>
                <div className="info-content">
                  <span className="info-label">Status</span>
                  <span className= {`status-badge ${runData.status.toLowerCase()}`}>
                    {runData.status}
                  </span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon-wrapper">
                  <Activity size={20} />
                </div>
                <div className="info-content">
                  <span className="info-label">Distance</span>
                  <span className="info-value">{runData.distance || 'N/A'}</span>
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
                  <Activity size={20} />
                </div>
                <div className="info-content">
                  <span className="info-label">Average Speed</span>
                  <span className="info-value">{runData.average_speed || 'N/A'} km/h</span>
                </div>
              </div>
            </div>
          </div>

          <div className="details-card location-card">
            <h3>Location</h3>
            <div className="location-content">
              <div className="location-header">
                <MapPin size={20} />
                <p>{runData.location}</p>
              </div>
              <img src={MapGif}
                style={{
                  width:'100px'
                }}
                alt="MapGif" />
              <div className="map-placeholder">
                <a 
                  href={`https://maps.google.com/?q=${runData.location}`} 
                  className="map-link" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>

         {/* Participants */}
        <div className="details-card participants-card">
          <h3>Participants ({participants.length})</h3>
          
          {loadingParticipants ? (
            <div className="loading-message">
              <img src={runnerGif} alt="" />
              Loading participants...
              </div>
          ) : participants.length === 0 ? (
            <div className="no-participants">No participants yet</div>
          ) : (
            <div className="participants-list">
              {participants.map((participant) => (
                <div key={participant.id} className="participant-item">
                  <img 
                    alt={participant.name} 
                    className="participant-pic" 
                    onError={(e) => {
                      e.target.src = '/default-profile.png';
                    }}
                  />
                  <div className="participant-info">
                    <p className="participant-name">{participant.name}</p>
                    <p className="participant-username">@{participant.username}</p>
                    <p className="participant-age">{participant.age} years</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>


        </div>
      </div>

      {/* Join Confirmation Modal */}
      {showConfirmation && (
        <div className="modal-overlay">
          <div className="confirmation-modal">
            <div className="modal-header">
              <h3>Join Run Confirmation</h3>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to join "<strong>{runData.run_title}</strong>"?</p>
              <div className="run-quick-info">
                <div className="quick-info-item">
                  <Calendar size={16} />
                  <span>{new Date(runData.date).toLocaleDateString()}</span>
                </div>
                <div className="quick-info-item">
                  <Clock size={16} />
                  <span>{runData.start_time.slice(0, 5)}</span>
                </div>
                <div className="quick-info-item">
                  <MapPin size={16} />
                  <span>{runData.location}</span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn"

              onClick={() => setShowConfirmation(false)}>
                Cancel
              </button>
              <button className="confirm-btn" onClick={handleJoinRun} disabled={isJoining || participants.some(p => p.id === userId)}>
                {isJoining ? 'Joining...' : 'Join Run'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailsRun;