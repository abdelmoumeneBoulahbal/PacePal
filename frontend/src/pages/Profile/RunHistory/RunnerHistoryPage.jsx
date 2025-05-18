import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, X, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { getRunIcon } from '../../../utils/RunIcons';
import './runHisPage.css'
import Loading from '../../../components/Loading/Loading';

function RunnerHistoryPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;
  console.log(userId)

  const [runIdsData, setRunIdsData] = useState([])
  const [userRunStatuses, setUserRunStatuses] = useState({});
  const [participatedRuns, setParticipatedRuns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [runsPerPage] = useState(6);
  
  // Alert state
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: 'info' // 'success', 'error', 'info', 'warning'
  });

  const completedRuns = participatedRuns.filter(run => run.status === "completed").length;
  const cancelledRuns = participatedRuns.filter(run => run.status === "cancelled").length;
  const upcomingRuns = participatedRuns.filter(run => run.status === "upcoming").length;
  const rejectedRuns = participatedRuns.filter(run => run.status === "rejected").length;

  const totalDistance = participatedRuns
    .filter(run => run.status.toLowerCase() === "completed")
    .reduce((sum, run) => sum + parseFloat(run.distance), 0);

  // Function to show alert messages
  const showAlert = (message, type = 'info') => {
    setAlert({
      show: true,
      message,
      type
    });
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setAlert(prev => ({...prev, show: false}));
    }, 5000);
  };

  useEffect(() => {
  const fetchRunData = async () => {
    try {
      setIsLoading(true);
      
      if (!userId) {
        throw new Error('User ID not provided');
      }
      
      // First fetch to get all run IDs and user statuses
      const runIdsResponse = await fetch(`http://localhost:3000/users/profile/history/${userId}`);
      
      if (!runIdsResponse.ok) {
        throw new Error('Failed to fetch user run history');
      }
      
      const runIdsData = await runIdsResponse.json();
      setRunIdsData(runIdsData);

      // Create a mapping of run IDs to user statuses
      const runStatusMap = {};
      runIdsData.runs.forEach(run => {
        runStatusMap[run.fk_run_id] = run.user_run_status;
      });

      const runIds = runIdsData.runs.map(run => run.fk_run_id);
      
      // Fetch details for all runs
      const runDetailsPromises = runIds.map(runId => {
        return fetch(`http://localhost:3000/run/runDetails/${runId}`)
          .then(response => {
            if (!response.ok) throw new Error(`Failed to fetch details for run ${runId}`);
            return response.json();
          });
      });
      
      const runDetailsData = await Promise.all(runDetailsPromises);
      
      // Combine the data
      const flattenedRuns = runDetailsData
        .filter(item => item?.success && item?.run?.[0])
        .map(item => {
          const originalRun = item.run[0];
          return {
            id: originalRun.run_id,
            title: originalRun.run_title,
            description: originalRun.description,
            location: originalRun.location,
            additionalLocationInfo: originalRun.additional_location_info,
            googleMapsLink: originalRun.google_maps_link,
            type: originalRun.run_type,
            difficulty: originalRun.difficulty,
            distance: `${parseInt(originalRun.distance)/1000} km`,
            duration: originalRun.duration,
            trackName: originalRun.track_name,
            date: new Date(originalRun.date).toLocaleDateString(),
            startTime: originalRun.start_time,
            createdAt: originalRun.created_at,
            maxPeople: originalRun.max_people,
            currentParticipants: originalRun.nmb_participants,
            ageRange: originalRun.age_range,
            gender: originalRun.gender,
            averageSpeed: originalRun.average_speed,
            organizerId: originalRun.creator_id,
            status: originalRun.status,
            user_run_status: runStatusMap[originalRun.run_id], // Get status from our map
            icon: getRunIcon(originalRun.run_type)
          };
        });

      setParticipatedRuns(flattenedRuns);
      setIsLoading(false);
      
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
      setIsLoading(false);
      showAlert(`Error: ${err.message}`, 'error');
    }
  };

  fetchRunData();
}, [userId]);


  // Calculate pagination values
  const indexOfLastRun = currentPage * runsPerPage;
  const indexOfFirstRun = indexOfLastRun - runsPerPage;
  const currentRuns = participatedRuns.slice(indexOfFirstRun, indexOfLastRun);
  const totalPages = Math.ceil(participatedRuns.length / runsPerPage);

  // Change page handlers
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      showAlert(`Viewing page ${currentPage + 1} of ${totalPages}`, 'info');
    }
  };
  
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      showAlert(`Viewing page ${currentPage - 1} of ${totalPages}`, 'info');
    }
  };

  if (isLoading) {
    return <Loading loadingInfo={'Your Running History'} />
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error loading data</h2>
        <p>{error}</p>
        <button 
          onClick={() => {
            window.location.reload();
            showAlert('Retrying to load data...', 'info');
          }} 
          className="retry-btn"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="runner-history-container">
      {/* Alert Message Component */}
      {alert.show && (
        <div className={`alert-container alert-${alert.type}`}>
          <div className="alert-icon">
            {alert.type === 'success' && <CheckCircle size={20} />}
            {alert.type === 'error' && <AlertCircle size={20} />}
            {alert.type === 'info' && <Info size={20} />}
          </div>
          <div className="alert-message">{alert.message}</div>
          <button 
            className="alert-close" 
            onClick={() => setAlert(prev => ({...prev, show: false}))}
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="main-content">
        <div className="header-container">
          <div>
            <div className="back-navigation">
              <button 
                className="back-button"
                onClick={() => navigate(-1)}
              >
                <ChevronLeft size={20} />
                <span>Go Back</span>
              </button>
            </div>
            <h1 className="page-title">My Running History</h1>
            <p className="page-subtitle">Track all your participated running events and performance</p>
          </div>
        </div>

        {/* Run Stats */}
        <div className="run-stats-container">
          <div className="stat-card">
          <div className="stat-icon completed-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
            <div className="stat-info">
              <h3>Completed Runs</h3>
              <p className="stat-number">{completedRuns}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon upcoming-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <div className="stat-info">
              <h3>Upcoming Runs</h3>
              <p className="stat-number">{upcomingRuns}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon cancelled-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
            </div>
            <div className="stat-info">
              <h3>Cancelled/Rejected</h3>
              <p className="stat-number">{cancelledRuns + rejectedRuns}</p>
            </div>
          </div>
          <div className="stat-card">
          <div className="stat-icon time-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
            <div className="stat-info">
              <h3>Total Distance</h3>
              <p className="stat-number">{totalDistance.toFixed(1)} km</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <div className="search-bar">
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search runs by title, location, or description..." 
              onChange={() => showAlert('Search functionality will be available soon!', 'info')}
            />
            <button 
              className="search-btn"
              onClick={() => showAlert('Search functionality will be available soon!', 'info')}
            >
              <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Results Table */}
        <div className="results-container">
          {participatedRuns.length > 0 ? (
            <div className="results-table-wrapper">
              <table className="results-table">
                <thead>
                  <tr>
                    <th>Run Details</th>
                    <th>Status</th>
                    <th>Difficulty</th>
                    <th>Date</th>
                    <th>Organizer</th>
                    <th>Run Type</th>
                    <th>Participants</th>
                    <th>Run Info</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRuns.map(run => (
                    <tr key={run.id} className="result-row">
                      <td className="title-cell">
                        <div className="title-wrapper">
                          <span className="run-title">{run.title}</span>
                          <span className="run-location">
                            <svg className="info-icon" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                              <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            {run.location}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className={`status-badge ${run.status}`}>{run.status}</span>
                      </td>
                      <td>
                        <span className={`difficulty-badge ${run.difficulty.toLowerCase()}`}>{run.difficulty}</span>
                      </td>
                      <td>
                        <div className="info-with-icon">
                          <svg className="info-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                          </svg>
                          {run.date}
                        </div>
                      </td>
                      <td>
                        <div className={`status-badge ${run.user_run_status}`}>
                          {run.user_run_status}
                        </div>
                      </td>
                      <td>
                        <div
                        style={{
                          display:'flex', 
                          alignItems:'center',
                          justifyContent:'center'
                        }}
                        >
                        <span
                          style={{
                            fontWeight:'bold'
                          }}
                        >
                          {run.type}
                        </span>
                        <img
                          style={{
                            width:"42px"
                          }}
                          src={run.icon} alt="" />
                          </div>
                      </td>
                      <td>
                        <div
                         style={{
                          display:'flex',
                          justifyContent:"center",
                          alignItems:'center',
                          gap:".6rem",
                          fontWeight:'bold'
                        }}
                        >
                           <svg className="info-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                          <span>
                            {run.currentParticipants}  
                          </span>                      
                        </div>
                      </td>
                      <td>
                        <div className="performance-details">
                          <div className="performance-item">
                            <span className="performance-label">Pace:</span>
                            <span className="performance-value">{run.averageSpeed}Km/h</span>
                          </div>
                          <div className="performance-item">
                            <span className="performance-label">Distance:</span>
                            <span className="performance-value">{run.distance}</span>
                          </div>
                          <div className="performance-item">
                            <span className="performance-label">Duration:</span>
                            <span className="performance-value">{run.duration}</span>
                          </div>
                          <div className="performance-item">
                            <span className="performance-label">Gender:</span>
                            <span className="performance-value">{run.gender}</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="no-results">
              <p>You haven't participated in any runs yet.</p>
              <button 
                className="explore-runs-btn"
                onClick={() => {
                  navigate('/runs', { state: { userId } });
                  showAlert('Redirecting to explore runs...', 'info');
                }}
              >
                Explore Runs
              </button>
            </div>
          )}
        </div>

        {/* Pagination - only show if there are runs */}
        {participatedRuns.length > runsPerPage && (
          <div className="pagination-container">
            <div className="pagination-info">
              Showing <span className="pagination-bold">
                {indexOfFirstRun + 1}-{Math.min(indexOfLastRun, participatedRuns.length)}
              </span> of <span className="pagination-bold">{participatedRuns.length}</span> runs
            </div>
            <div className="pagination-controls">
              <button 
                className="pagination-btn" 
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="page-number">
                Page {currentPage} of {totalPages}
              </span>
              <button 
                className="pagination-btn" 
                onClick={nextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RunnerHistoryPage;