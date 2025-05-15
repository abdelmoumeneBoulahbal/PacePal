import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

import './runHisPage.css'

function RunnerHistoryPage() {
  const navigate = useNavigate();

  // Mock data for runner's participated runs
  const participatedRuns = [
    {
      id: 1,
      title: "Morning Trail Run",
      location: "Central Park, New York",
      status: "Completed",
      difficulty: "Easy",
      date: "April 30, 2025",
      organizer: "Run Club NYC",
      averagePace: "5:30/km",
      totalDistance: "5.2 km",
      totalTime: "28:36"
    },
    {
      id: 2,
      title: "Urban Marathon Training",
      location: "Brooklyn Bridge, New York",
      status: "Completed",
      difficulty: "Challenging",
      date: "April 15, 2025",
      organizer: "NYC Marathon Team",
      averagePace: "4:45/km",
      totalDistance: "18.5 km",
      totalTime: "1:27:56"
    },
    {
      id: 3,
      title: "Hill Interval Challenge",
      location: "Prospect Park, Brooklyn",
      status: "Cancelled",
      difficulty: "Difficult",
      date: "May 5, 2025",
      organizer: "Brooklyn Runners",
      averagePace: "N/A",
      totalDistance: "N/A",
      totalTime: "N/A"
    },
    {
      id: 4,
      title: "Night City Run",
      location: "Hudson River Park, Manhattan",
      status: "Rejected",
      difficulty: "Medium",
      date: "April 10, 2025",
      organizer: "Manhattan Pacers",
      averagePace: "N/A",
      totalDistance: "N/A",
      totalTime: "N/A"
    },
    {
      id: 5,
      title: "Weekend Trail Adventure",
      location: "Bear Mountain, NY",
      status: "Upcoming",
      difficulty: "Expert",
      date: "May 15, 2025",
      organizer: "Trail Blazers NY",

      averagePace: "N/A",
      totalDistance: "N/A",
      totalTime: "N/A"
    }
  ];

  // Stats calculation
  const completedRuns = participatedRuns.filter(run => run.status === "Completed").length;
  const cancelledRuns = participatedRuns.filter(run => run.status === "Cancelled").length;
  const upcomingRuns = participatedRuns.filter(run => run.status === "Upcoming").length;
  const rejectedRuns = participatedRuns.filter(run => run.status === "Rejected").length;

  // Calculate total distance (only from completed runs)
  const totalDistance = participatedRuns
    .filter(run => run.status === "Completed")
    .reduce((total, run) => {
      if (run.totalDistance !== "N/A") {
        return total + parseFloat(run.totalDistance);
      }
      return total;
    }, 0);

  return (
    <div className="runner-history-container">
      <div className="main-content">
        <div className="header-container">
          <div>
          <div className="back-navigation">
            <button onClick={() => navigate('/user/profile')} className="back-button">
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
            <div className="stat-icon active-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
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
            <div className="stat-icon distance-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
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
            <input type="text" className="search-input" placeholder="Search runs by title, location, or description..." />
            <button className="search-btn">
              <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
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
                  <th>Organizer</th>
                  <th>Run Type</th>
                  <th>Performance</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {participatedRuns.map(run => (
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
                        {run.organizer}
                      </div>
                    </td>
                    <td>
                      <span className={`zone-badge zone-${run.zone.split(' ')[1]}`}>{run.zone}</span>
                    </td>
                    <td>
                      {run.status === "Completed" ? (
                        <div className="performance-details">
                          <div className="performance-item">
                            <span className="performance-label">Pace:</span>
                            <span className="performance-value">{run.averagePace}</span>
                          </div>
                          <div className="performance-item">
                            <span className="performance-label">Distance:</span>
                            <span className="performance-value">{run.totalDistance}</span>
                          </div>
                          <div className="performance-item">
                            <span className="performance-label">Duration:</span>
                            <span className="performance-value">{run.totalTime}</span>
                          </div>
                          <div className="performance-item">
                            <span className="performance-label">Gender:</span>
                            <span className="performance-value">Mix</span>
                          </div>
                            
                        </div>
                      ) : (
                        <span className="no-performance">No performance data</span>
                      )}
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="view-details-btn" title="View Details">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        </button>
                        {run.status === "Completed" && (
                          <button className="stats-btn" title="View Stats">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="18" y1="20" x2="18" y2="10"></line>
                              <line x1="12" y1="20" x2="12" y2="4"></line>
                              <line x1="6" y1="20" x2="6" y2="14"></line>
                            </svg>
                          </button>
                        )}
                        {run.status === "Upcoming" && (
                          <button className="cancel-btn" title="Cancel Registration">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10"></circle>
                              <line x1="15" y1="9" x2="9" y2="15"></line>
                              <line x1="9" y1="9" x2="15" y2="15"></line>
                            </svg>
                          </button>
                        )}
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

export default RunnerHistoryPage;