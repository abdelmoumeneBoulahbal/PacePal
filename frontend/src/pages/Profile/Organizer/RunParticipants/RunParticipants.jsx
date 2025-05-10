import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Search, UserCheck, UserX, Filter, ArrowUpDown } from 'lucide-react';
import './runpart.css';
import DetailsOrg from './DetailsOrg.jsx/DetailsOrg';

function RunParticipants() {
  const navigate = useNavigate();
  const { runId } = useParams();
  

  const [runDetails, setRunDetails] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // State for sort
  const [sortConfig, setSortConfig] = useState({
    key: 'firstName',
    direction: 'ascending'
  });

  const [searchQuery, setSearchQuery] = useState('');

  const [viewMode, setViewMode] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {

        const runResponse = await fetch(`http://localhost:3000/run/runDetails/${runId}`);
        if (!runResponse.ok) {
          throw new Error('Failed to fetch run details');
        }
        const runData = await runResponse.json();
        setRunDetails(runData);

        const participantsResponse = await fetch(`http://localhost:3000/run/${runId}/participants`);
        if (!participantsResponse.ok) {
          throw new Error('Failed to fetch participants');
        }

        const participantsData = await participantsResponse.json();
        setParticipants(participantsData);

      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (runId) {
      fetchData();
    }
  }, [runId]);


  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };


  /*
  const changeParticipantStatus = async (userId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:3000/run/${runId}/participants/${userId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update participant status');
      }

      // Update local state to reflect the change
      setParticipants(participants.map(participant => 
        participant.id === userId ? { ...participant, status: newStatus } : participant
      ));
    } catch (err) {
      console.error('Error updating participant status:', err);
      alert('Failed to update participant status. Please try again.');
    }
  };
  */

  // Filter participants based on search query and view mode
  const filteredParticipants = participants.filter(participant => {
    // Filter by search query
    const fullName = `${participant.firstName} ${participant.lastName}`;
    const matchesSearch = 
      fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      participant.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      participant.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by view mode
    const matchesViewMode = 
      viewMode === 'all' || 
      participant.status === viewMode;
    
    return matchesSearch && matchesViewMode;
  });

  // Sort participants
  const sortedParticipants = [...filteredParticipants].sort((a, b) => {
    let aValue, bValue;
    
    // Handle special case for full name sorting
    if (sortConfig.key === 'firstName') {
      aValue = `${a.firstName} ${a.lastName}`.toLowerCase();
      bValue = `${b.firstName} ${b.lastName}`.toLowerCase();
    } else {
      aValue = a[sortConfig.key];
      bValue = b[sortConfig.key];
      
      // Handle string comparisons (case insensitive)
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
    }
    
    if (aValue < bValue) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  // Stats for participant status
  const acceptedCount = participants.filter(p => p.status === 'accepted').length;
  const pendingCount = participants.filter(p => p.status === 'pending').length;
  const rejectedCount = participants.filter(p => p.status === 'rejected').length;

  const calculateAveragePace = () => {
    const acceptedParticipants = participants.filter(p => p.status === 'accepted');
    if (acceptedParticipants.length === 0) return 'N/A';
    
    let totalSeconds = 0;
    let count = 0;
    
    acceptedParticipants.forEach(participant => {
      if (participant.averagePace) {
        const paceParts = participant.averagePace.split(' ')[0].split(':');
        if (paceParts.length === 2) {
          const minutes = parseInt(paceParts[0]);
          const seconds = parseInt(paceParts[1]);
          totalSeconds += minutes * 60 + seconds;
          count++;
        }
      }
    });
    
    if (count === 0) return 'N/A';
    
    const averageSeconds = Math.round(totalSeconds / count);
    const avgMinutes = Math.floor(averageSeconds / 60);
    const avgSeconds = averageSeconds % 60;
    
    return `${avgMinutes}:${avgSeconds.toString().padStart(2, '0')} min/km`;
  };

  if (loading) {
    return <div className="loading-container">Loading run details...</div>;
  }

  if (error) {
    return <div className="error-container">Error: {error}</div>;
  }

  if (!runDetails) {
    return <div className="error-container">No run details found.</div>;
  }

  return (
    <div className="search-run-container">
      <div className="main-content">
        <div className="header-container">
          <div>
            <div className="back-navigation">
                <button onClick={() => navigate('/user/profile/organizer/runCreated')} className="back-button">
                <ChevronLeft size={20} />
                <span>Go Back</span>
                </button>
            </div>
            <h1 className="page-title">Manage Participants</h1>
            <p className="page-subtitle">
              {runDetails.name || 'Run'} - {runDetails.location} | {new Date(runDetails.date).toLocaleDateString()}
            </p>
          </div>
          
          <div className="run-capacity-wrapper">
            <div className="run-capacity-info">
              <span className="capacity-label">Participants:</span>
              <span className="capacity-count">{participants.length} / {runDetails.maxPeople}</span>
            </div>
            <div className="capacity-bar">
              <div 
                className="capacity-progress" 
                style={{ width: `${(participants.length / runDetails.maxPeople) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <div className="search-bar">
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search participants by name, username or email..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-btn">
              <Search className="search-icon" size={22} />
            </button>
          </div>
        </div>

        {/* Participant Stats */}
        <div className="run-stats-container">
          <div className="stat-card">
            <div className="stat-icon active-icon">
              <UserCheck size={24} />
            </div>
            <div className="stat-info">
              <h3>Accepted</h3>
              <p className="stat-number">{acceptedCount}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon upcoming-icon">
              <Filter size={24} />
            </div>
            <div className="stat-info">
              <h3>Pending</h3>
              <p className="stat-number">{pendingCount}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon completed-icon">
              <UserX size={24} />
            </div>
            <div className="stat-info">
              <h3>Rejected</h3>
              <p className="stat-number">{rejectedCount}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon participants-icon">
              <ArrowUpDown size={24} />
            </div>
            <div className="stat-info">
              <h3>Average Pace</h3>
              <p className="stat-number">{calculateAveragePace()}</p>
            </div>
          </div>
        </div>
        
        {/* Results Table */}
        <div className="results-container">
          <div className="results-table-wrapper">
            <table className="results-table">
              <thead>
                <tr>
                  <th onClick={() => requestSort('firstName')}>
                    Participant
                    {sortConfig.key === 'firstName' && (
                      <span className="sort-indicator">{sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}</span>
                    )}
                  </th>
                  <th onClick={() => requestSort('age')}>
                    Age
                    {sortConfig.key === 'age' && (
                      <span className="sort-indicator">{sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}</span>
                    )}
                  </th>
                  <th onClick={() => requestSort('joinedAt')}>
                    Joined Since
                    {sortConfig.key === 'joinedAt' && (
                      <span className="sort-indicator">{sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}</span>
                    )}
                  </th>
                  <th onClick={() => requestSort('averagePace')}>
                    Average Pace
                    {sortConfig.key === 'averagePace' && (
                      <span className="sort-indicator">{sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}</span>
                    )}
                  </th>
                  <th onClick={() => requestSort('runsCompleted')}>
                    Runs Completed
                    {sortConfig.key === 'runsCompleted' && (
                      <span className="sort-indicator">{sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}</span>
                    )}
                  </th>
                  <th onClick={() => requestSort('status')}>
                    Status
                    {sortConfig.key === 'status' && (
                      <span className="sort-indicator">{sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}</span>
                    )}
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedParticipants.length > 0 ? (
                  sortedParticipants.map(participant => (
                    <tr key={participant.id} className="result-row">
                      <td className="participant-cell">
                        <div className="participant-info">
                          <img 
                            src={participant.profilePic || "/api/placeholder/50/50"} 
                            alt={`${participant.firstName} ${participant.lastName}`} 
                            className="participant-avatar" 
                          />
                          <div className="participant-details">
                            <span className="participant-name">{participant.firstName} {participant.lastName}</span>
                            <div className="participant-subinfo">
                              <span className="participant-username">@{participant.username}</span>
                              <span className="participant-email">{participant.email}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{participant.age}</td>
                      <td>
                        <div className="info-with-icon">
                          <svg className="info-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                          </svg>
                          {new Date(participant.joinedAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td>
                        <div className="info-with-icon">
                          <svg className="info-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          {participant.averagePace || 'N/A'}
                        </div>
                      </td>
                      <td>
                        <div className="info-with-icon">
                          <svg className="info-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                          </svg>
                          {participant.runsCompleted}
                        </div>
                      </td>
                      <td>
                        <span className={`status-badge ${participant.status}`}>
                          {participant.status ? participant.status.charAt(0).toUpperCase() + participant.status.slice(1) : 'Unknown'}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          {participant.status !== 'accepted' && (
                            <button 
                              className="accept-btn" 
                              onClick={() => changeParticipantStatus(participant.id, 'accepted')}
                              title="Accept Participant"
                            >
                              <UserCheck size={16} />
                            </button>
                          )}
                          {participant.status !== 'rejected' && (
                            <button 
                              className="reject-btn" 
                              onClick={() => changeParticipantStatus(participant.id, 'rejected')}
                              title="Reject Participant"
                            >
                              <UserX size={16} />
                            </button>
                          )}
                          <button 
                            className="view-profile-btn" 
                            title="View Profile"
                            onClick={() => navigate(`/user/profile/${participant.id}`)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="no-results">No participants found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="pagination-container">
          <div className="pagination-info">
            Showing <span className="pagination-bold">1-{sortedParticipants.length}</span> of <span className="pagination-bold">{participants.length}</span> participants
          </div>
          <div className="pagination-controls">
            <button className="pagination-btn" disabled>Previous</button>
            <button className="pagination-btn" disabled>Next</button>
          </div>
        </div>

        <DetailsOrg />
      </div>
    </div>
  );
}

export default RunParticipants;