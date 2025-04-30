import React, { useState } from 'react';
import './orgRunPag.css';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

function OrgRunPage() {
  const navigate = useNavigate()

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

  // Mock data for organizer's created runs
  const createdRuns = [
    {
      id: 1,
      title: "Morning Trail Run",
      location: "Central Park, New York",
      status: "Active",
      difficulty: "Easy",
      date: "April 30, 2025",
      participants: 12,
      zone: "Zone 1",
    },
    {
      id: 2,
      title: "Urban Marathon Training",
      location: "Brooklyn Bridge, New York",
      status: "Completed",
      difficulty: "Challenging",
      date: "April 15, 2025",
      participants: 24,
      zone: "Zone 3",
    },
    {
      id: 3,
      title: "Hill Interval Challenge",
      location: "Prospect Park, Brooklyn",
      status: "Active",
      difficulty: "Difficult",
      date: "May 5, 2025",
      participants: 8,
      zone: "Zone 2",
    },
    {
      id: 4,
      title: "Night City Run",
      location: "Hudson River Park, Manhattan",
      status: "Cancelled",
      difficulty: "Medium",
      date: "April 10, 2025",
      participants: 15,
      zone: "Zone 2",
    },
    {
      id: 5,
      title: "Weekend Trail Adventure",
      location: "Bear Mountain, NY",
      status: "Upcoming",
      difficulty: "Expert",
      date: "May 15, 2025",
      participants: 6,
      zone: "Zone 3",
    }
  ];

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
                <div className="filter-item">
                  <input type="checkbox" id="status-active" />
                  <label htmlFor="status-active">Active</label>
                </div>
                <div className="filter-item">
                  <input type="checkbox" id="status-completed" />
                  <label htmlFor="status-completed">Completed</label>
                </div>
                <div className="filter-item">
                  <input type="checkbox" id="status-upcoming" />
                  <label htmlFor="status-upcoming">Upcoming</label>
                </div>
                <div className="filter-item">
                  <input type="checkbox" id="status-cancelled" />
                  <label htmlFor="status-cancelled">Cancelled</label>
                </div>
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
                <div className="filter-item">
                  <input type="checkbox" id="difficulty-easy" />
                  <label htmlFor="difficulty-easy">Easy</label>
                </div>
                <div className="filter-item">
                  <input type="checkbox" id="difficulty-medium" />
                  <label htmlFor="difficulty-medium">Medium</label>
                </div>
                <div className="filter-item">
                  <input type="checkbox" id="difficulty-challenging" />
                  <label htmlFor="difficulty-challenging">Challenging</label>
                </div>
                <div className="filter-item">
                  <input type="checkbox" id="difficulty-difficult" />
                  <label htmlFor="difficulty-difficult">Difficult</label>
                </div>
                <div className="filter-item">
                  <input type="checkbox" id="difficulty-expert" />
                  <label htmlFor="difficulty-expert">Expert</label>
                </div>
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
        
        {/* Zone Filter */}
        <div className="filter-section">
          <div className="filter-title" onClick={() => toggleFilter('zone')}>
            <h3>Zone</h3>
            <svg className={`chevron-icon ${expandedFilters.zone ? 'rotate' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          {expandedFilters.zone && (
            <div className="filter-content">
              <div className="filter-list">
                <div className="filter-item">
                  <input type="checkbox" id="zone-1" />
                  <label htmlFor="zone-1">Zone 1</label>
                </div>
                <div className="filter-item">
                  <input type="checkbox" id="zone-2" />
                  <label htmlFor="zone-2">Zone 2</label>
                </div>
                <div className="filter-item">
                  <input type="checkbox" id="zone-3" />
                  <label htmlFor="zone-3">Zone 3</label>
                </div>
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
            <button onClick={() => navigate('/user/profile')} className="back-button">
              <ChevronLeft size={20} />
              <span>Go Back</span>
            </button>
          </div>
            <h1 className="page-title">My Created Runs</h1>
            <p className="page-subtitle">Track and manage all the running events you've organized</p>
          </div>
          <button onClick={() => navigate('/user/organizer/create')} className="create-run-btn">
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
            <input type="text" className="search-input" placeholder="Search runs by title, location, or description..." />
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
              <p className="stat-number">2</p>
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
              <p className="stat-number">1</p>
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
              <p className="stat-number">1</p>
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
              <p className="stat-number">65</p>
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
                  <th>Zone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {createdRuns.map(run => (
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
                      <span className={`status-badge ${run.status.toLowerCase()}`}>{run.status}</span>
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
                      <span className={`zone-badge zone-${run.zone.split(' ')[1]}`}>{run.zone}</span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button onClick={()=>navigate('details')} className="view-details-btn">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        </button>
                        <button className="edit-run-btn">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                        </button>
                        <button className="delete-run-btn">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="pagination-container">
          <div className="pagination-info">
            Showing <span className="pagination-bold">1-5</span> of <span className="pagination-bold">5</span> runs
          </div>
          <div className="pagination-controls">
            <button className="pagination-btn" disabled>Previous</button>
            <button className="pagination-btn" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrgRunPage;