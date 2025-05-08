import React, { useState, useEffect } from 'react';
import './orgRunPag.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { getRunIcon } from '../../../../utils/RunIcons.jsx';

function OrgRunPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;

  // States for fetched data and pagination
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [runsPerPage] = useState(5);
  const [totalRuns, setTotalRuns] = useState(0);
  
  // Stats counters
  const [stats, setStats] = useState({
    active: 0,
    completed: 0,
    upcoming: 0,
    totalParticipants: 0
  });

  const [expandedFilters, setExpandedFilters] = useState({
    status: true,
    difficulty: true,
    date: true,
    zone: true
  });

  const toggleFilter = (filter) => {
    setExpandedFilters({
      ...expandedFilters,
      [filter]: !expandedFilters[filter]
    });
  };

  // Fetch runs from API
  useEffect(() => {
    const fetchRuns = async () => {
      try {
        const response = await fetch(`http://localhost:3000/runs/runList/${userId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch runs');
        }
        
        const data = await response.json();
        
        if (data.success) {
          const formattedRuns = data.runs.map(run => ({
            id: run.run_id,
            title: run.run_title,
            location: run.track_name,
            status: run.status,
            difficulty: run.difficulty,
            date: new Date(run.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            participants: run.nmb_participants || 0,
            runType: run.run_type,
            icon: getRunIcon(run.run_type)
          }));
          
          setRuns(formattedRuns);
          setTotalRuns(formattedRuns.length);
          
          // Calculate stats
          const newStats = {
            active: formattedRuns.filter(run => run.status.toLowerCase() === 'active').length,
            completed: formattedRuns.filter(run => run.status.toLowerCase() === 'completed').length,
            upcoming: formattedRuns.filter(run => run.status.toLowerCase() === 'upcoming').length,
            totalParticipants: formattedRuns.reduce((total, run) => total + (run.participants || 0), 0)
          };
          console.log(formattedRuns.icon)
          setStats(newStats);
        } else {
          throw new Error(data.error || 'Failed to fetch runs');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching runs:', err);
      } finally {
        setLoading(false);
      }
    };
    
    if (userId) {
      fetchRuns();
    }
  }, [userId]);

  // Search functionality
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
  
  // Filter runs based on search term
  const filteredRuns = runs.filter(run => 
    run.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    run.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Pagination logic
  const indexOfLastRun = currentPage * runsPerPage;
  const indexOfFirstRun = indexOfLastRun - runsPerPage;
  const currentRuns = filteredRuns.slice(indexOfFirstRun, indexOfLastRun);
  const totalPages = Math.ceil(filteredRuns.length / runsPerPage);

  // Change page handlers
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <div className="loading-container">Loading runs...</div>;
  }

  if (error) {
    return <div className="error-container">Error: {error}</div>;
  }

  return (
    <div className="search-run-container">
      {/* Side Navigation */}
      <div className="side-nav-search">
        <div className="filter-header">Filter Created Runs</div>
        
        {/* Status Filter */}
        <div className="filter-section">
          <div className="filter-title" onClick={() => toggleFilter('status')}>
            <h3>Run Status</h3>
            <svg className={`chevron-icon ${expandedFilters.status ? 'rotate' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          {expandedFilters.status && (
            <div className="filter-content">
              <div className="filter-list">
                {['Active', 'Completed', 'Upcoming', 'Cancelled'].map((status) => (
                  <div className="filter-item" key={status}>
                    <input 
                      type="checkbox" 
                      id={`status-${status.toLowerCase()}`}
                      onChange={() => {}}
                    />
                    <label htmlFor={`status-${status.toLowerCase()}`}>{status}</label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Difficulty Filter */}
        <div className="filter-section">
          <div className="filter-title" onClick={() => toggleFilter('difficulty')}>
            <h3>Difficulty</h3>
            <svg className={`chevron-icon ${expandedFilters.difficulty ? 'rotate' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          {expandedFilters.difficulty && (
            <div className="filter-content">
              <div className="filter-list">
                {['Easy', 'Medium', 'Challenging', 'Difficult', 'Expert'].map((difficulty) => (
                  <div className="filter-item" key={difficulty}>
                    <input 
                      type="checkbox" 
                      id={`difficulty-${difficulty.toLowerCase()}`}
                      onChange={() => {}}
                    />
                    <label htmlFor={`difficulty-${difficulty.toLowerCase()}`}>{difficulty}</label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Date Filter */}
        <div className="filter-section">
          <div className="filter-title" onClick={() => toggleFilter('date')}>
            <h3>Date Range</h3>
            <svg className={`chevron-icon ${expandedFilters.date ? 'rotate' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          {expandedFilters.date && (
            <div className="filter-content">
              <div className="filter-input">
                <label htmlFor="start-date">From:</label>
                <input type="date" id="start-date" />
              </div>
              <div className="filter-input">
                <label htmlFor="end-date">To:</label>
                <input type="date" id="end-date" />
              </div>
            </div>
          )}
        </div>
        
        {/* Run Type Filter */}
        <div className="filter-section">
          <div className="filter-title" onClick={() => toggleFilter('zone')}>
            <h3>Run Type</h3>
            <svg className={`chevron-icon ${expandedFilters.zone ? 'rotate' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          {expandedFilters.zone && (
            <div className="filter-content">
              <div className="filter-list">
                {['Recovery Run', 'Race Pace', 'Trail Run', 'Interval Training', 'Long Run'].map((type) => (
                  <div className="filter-item" key={type}>
                    <input 
                      type="checkbox" 
                      id={`type-${type.replace(/\s+/g, '-').toLowerCase()}`}
                      onChange={() => {}}
                    />
                    <label htmlFor={`type-${type.replace(/\s+/g, '-').toLowerCase()}`}>{type}</label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header-container">
          <div>
            <div className="back-navigation">
              <button onClick={() => navigate(-1)} className="back-button">
                <ChevronLeft size={20} />
                <span>Go Back</span>
              </button>
            </div>
            <h1 className="page-title">My Created Runs</h1>
            <p className="page-subtitle">Track and manage all the running events you've organized</p>
          </div>
          <button 
            onClick={() => navigate('/runs/create', { state: { userId } })} 
            className="create-run-btn"
          >
            <span>Create New Run</span>
            <svg className="plus-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <div className="search-bar">
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search runs by title or location..." 
              value={searchTerm}
              onChange={handleSearch}
            />
            <button className="search-btn">
              <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Run Stats */}
        <div className="run-stats-container">
          <div className="stat-card">
            <div className="stat-icon active-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <div className="stat-info">
              <h3>Active Runs</h3>
              <p className="stat-number">{stats.active}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon completed-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <div className="stat-info">
              <h3>Completed</h3>
              <p className="stat-number">{stats.completed}</p>
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
              <h3>Upcoming</h3>
              <p className="stat-number">{stats.upcoming}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon participants-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div className="stat-info">
              <h3>Total Participants</h3>
              <p className="stat-number">{stats.totalParticipants}</p>
            </div>
          </div>
        </div>
        
        {/* Results Table */}
        <div className="results-container">
          <div className="results-table-wrapper">
            <table className="results-table">
              <thead>
                <tr>
                  <th>Run Details</th>
                  <th>Status</th>
                  <th>Difficulty</th>
                  <th>Date</th>
                  <th>Participants</th>
                  <th>Run Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRuns.length > 0 ? (
                  currentRuns.map(run => (
                    <tr key={run.id} className="result-row">
                      <td className="title-cell">
                        <div className="title-wrapper">
                          <span className="run-title">{run.title}</span>
                          <span className="run-location">
                            <svg className="location-icon" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                              <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            {run.location}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className={`status-badge ${run.status.toLowerCase()}`}>
                          {run.status}
                        </span>
                      </td>
                      <td>
                        <span className={`difficulty-badge ${run.difficulty.toLowerCase()}`}>
                          {run.difficulty}
                        </span>
                      </td>
                      <td>
                        <div className="info-with-icon">
                          <svg className="calendar-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                          </svg>
                          {run.date}
                        </div>
                      </td>
                      <td>
                        <div className="info-with-icon">
                          <svg className="info-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                          {run.participants}
                        </div>
                      </td>
                      <td>
                        <div className='runTy-div'>
                          <img src={run.icon} alt={run.runType} />
                          <span className="run_type">{run.runType}</span>
                        </div>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            onClick={() => navigate(`/runs/${run.id}`, { state: { run } })}
                            className="details-btn"
                          >
                            View Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="no-results">
                      {searchTerm ? 'No matching runs found' : 'No runs created yet'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {filteredRuns.length > runsPerPage && (
          <div className="pagination-container">
            <div className="pagination-info">
              Showing <span className="pagination-bold">
                {indexOfFirstRun + 1}-{Math.min(indexOfLastRun, filteredRuns.length)}
              </span> of <span className="pagination-bold">{filteredRuns.length}</span> runs
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

export default OrgRunPage;