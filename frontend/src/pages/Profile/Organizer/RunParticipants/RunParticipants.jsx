import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Search, UserCheck, UserX, Filter, ArrowUpDown, Users } from 'lucide-react';
import './runpart.css';
import DetailsOrg from './DetailsOrg.jsx/DetailsOrg';
import { useCallback } from 'react';

import Loading from '../../../../components/Loading/Loading';

function RunParticipants() {
  const navigate = useNavigate();
  const { runId } = useParams();
  
  const [creatorData, setCreatorData] = useState(null)


  const [runDetails, setRunDetails] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: 'firstName',
    direction: 'ascending'
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch run details
        const runResponse = await fetch(`http://localhost:3000/run/runDetails/${runId}`);
        if (!runResponse.ok) {
          throw new Error('Failed to fetch run details');
        }
        const runData = await runResponse.json();
        setRunDetails(runData);
        console.log(runData)

        // Fetch creator data if available
        if (runData?.run?.[0]?.creator_id) {
          const creatorResponse = await fetch(`http://localhost:3000/users/profile/${runData.run[0].creator_id}`);
          if (!creatorResponse.ok) throw new Error('Failed to fetch creator');
          const creatorData = await creatorResponse.json();
          setCreatorData(creatorData);
          console.log(creatorData)
        }

        // Fetch run participants
        const participantsResponse = await fetch(`http://localhost:3000/run/runDetails/runParticipants/${runId}`);
        if (!participantsResponse.ok) {
          throw new Error('Failed to fetch participants');
        }
        const participantsData = await participantsResponse.json();
        setParticipants(participantsData);
        console.log(participantsData)

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

const changeParticipantStatus = async (userId, newStatus) => {
  try {
    const response = await fetch(`http://localhost:3000/run/${runId}/user/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!response.ok) {
      throw new Error('Failed to update participant status');
    }

    // Update local state to reflect the change
    setParticipants(prevParticipants => {
      // Check if participants is structured with a participants array
      if (prevParticipants && Array.isArray(prevParticipants.participants)) {
        return {
          ...prevParticipants,
          participants: prevParticipants.participants.map(participant => 
            participant.user_id === userId 
              ? { 
                  ...participant, 
                  user_run_status: newStatus,
                  updated_at: new Date().toISOString() 
                } 
              : participant
          )
        };
      }
      // Fallback if structure is different
      return prevParticipants;
    });
  } catch (err) {
    console.error('Error updating participant status:', err);
    alert('Failed to update participant status. Please try again.');
  }
};

  // Temporarily removing filtering logic due to error
  let sortedParticipants = [];
  
  // Use participants directly if it's an array, otherwise use empty array
  if (Array.isArray(participants)) {
    sortedParticipants = [...participants];
    
    // Only attempt sorting if we have participants
    if (sortedParticipants.length > 0) {
      sortedParticipants.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
  }

  const calculates = useCallback(() => {
    if (!participants || !Array.isArray(participants.participants)) {
      return {
        total: 0,
        accepted: 0,
        pending: 0,
        rejected: 0
      };
    }

    return {
      total: participants.participants.length,
      accepted: participants.participants.filter(p => p.user_run_status === 'accepted').length,
      pending: participants.participants.filter(p => p.user_run_status === 'pending').length,
      rejected: participants.participants.filter(p => p.user_run_status === 'rejected').length
    };
  }, [participants]);

  // Get current s
  const { total, accepted, pending, rejected } = calculates();

  if (loading) {
    return <Loading loadingInfo={"Run Details"} />
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
              <p className="stat-number">{accepted}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon upcoming-icon">
              <Filter size={24} />
            </div>
            <div className="stat-info">
              <h3>Pending</h3>
              <p className="stat-number">{pending}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon completed-icon">
              <UserX size={24} />
            </div>
            <div className="stat-info">
              <h3>Rejected</h3>
              <p className="stat-number">{rejected}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon participants-icon">
              <Users size={24} />
            </div>
            <div className='stat-info'> 
              <h3>Total Participants</h3>
              <p className='stat-number'> {total} </p>
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
                 
                  <th onClick={() => requestSort('runsCompleted')}>
                    Runs Completed
                    {sortConfig.key === 'runsCompleted' && (
                      <span className="sort-indicator">{sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}</span>
                    )}
                  </th>
                  <th>
                    Gender
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
              {!Array.isArray(participants.participants) || participants.participants.length > 0 ? (
             <tbody>
                {participants.participants.map(participant => (
                  <tr  key={participant.id || `${participant.username}_${participant.email}`} 
                   className="result-row"
                     style={{
                      backgroundColor: participant.user_run_status === 'rejected' ? '#e5e7eb' : 'transparent',
                      opacity: participant.user_run_status === 'rejected' ? 0.75 : 1,
                      pointerEvents: participant.user_run_status === 'rejected' ? 'none' : '',
                      
                    }}
                   >
                    <td className="participant-cell">
                      <div className="participant-info">
                        <img 
                          src={participant.profilePic || "/api/placeholder/50/50"} 
                          alt={`${participant.first_name} ${participant.last_name}`} 
                          className="participant-avatar" 
                        />
                        <div className="participant-details">
                          <span className="participant-name">{participant.first_name} {participant.last_name}</span>
                          <div className="participant-subinfo">
                            <span className="participant-username">@{participant.username}</span>
                            <span className="participant-email">{participant.email}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{fontWeight:'bold'}}>
                        {participant.birth_date ? 
                          (new Date().getFullYear() - new Date(participant.birth_date).getFullYear()) 
                          : 'N/A'
                        }
                    </td>
                    
                    <td>
                      <div className="info-with-icon">
                        <svg className="info-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        {new Date(participant.created_at).toISOString().split('T')[0]}
                      </div>
                    </td>
                    <td>
                      <div className="info-with-icon">
                        <svg className="info-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        {participant.runs_completed || 0}
                      </div>
                    </td>
                    <td>
                      <span className='gender-participant'> {participant.gender} </span>
                    </td>
                    <td>
                      <span className={`status-badge ${participant.user_run_status || 'pending'}`}>
                        {participant.user_run_status ? participant.user_run_status.charAt(0).toUpperCase() + participant.user_run_status.slice(1) : 'Pending'}
                      </span>
                    </td>
                    {
                      participant.user_run_status == 'pending' ? 
                      (
                        
                    
                    <td>
                      <div className='actions-div'>
                        <button className='acc-btn' onClick={() => changeParticipantStatus(participant.user_id, 'accepted')}>
                          Accept
                          <svg 
                            className="info-icon actions" 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="14" 
                            height="14" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="4" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        </button>
                        <button className='dec-btn' onClick={() =>changeParticipantStatus(participant.user_id, 'rejected')}>
                          Reject
                          <svg 
                            className="info-icon actions" 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="14" 
                            height="14" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="4" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          >
                            <path d="M18 6L6 18" />
                            <path d="M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </td>
                      ): <td>Runner's Status Already Set </td> }
                  </tr>
                ))}
              </tbody>
              ): null}
            </table>
          </div>

          {!Array.isArray(participants?.participants) || participants.participants.length === 0 ? (
          <div className="no-participants-container">
            <div className="no-results-message">
              <h3>No Participants Joined Yet</h3>
              <p>Share this run to invite others</p>
              <button 
                className="share-button"
                onClick={() => navigator.share({ 
                  title: runDetails?.run_title,
                  text: `Join me for ${runDetails?.run_title} run!`,
                  url: window.location.href 
                })}
              >
                Share Run
              </button>
            </div>
          </div>
        ) : null}
        </div>

        {/* Pagination */}
        <div className="pagination-container">
          <div className="pagination-info">
            Showing <span className="pagination-bold">1-{Array.isArray(sortedParticipants) ? sortedParticipants.length : 0}</span> of <span className="pagination-bold">{Array.isArray(participants) ? participants.length : 0}</span> participants
          </div>
          <div className="pagination-controls">
            <button className="pagination-btn" disabled>Previous</button>
            <button className="pagination-btn" disabled>Next</button>
          </div>
        </div>

        <DetailsOrg data={runDetails}  creatorData={creatorData} />
      </div>
    </div>
  );
}

export default RunParticipants;