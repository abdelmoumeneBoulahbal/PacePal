import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Search, UserCheck, UserX, Filter, ArrowUpDown } from 'lucide-react';
import './runpart.css'

function RunParticipants() {
  const navigate = useNavigate();
  const { runId } = useParams();
  
  // State for filter expansion
  const [expandedFilters, setExpandedFilters] = useState({
    status: true,
    age: true,
    joinDate: true,
    completedRuns: true
  });

  // State for sort
  const [sortConfig, setSortConfig] = useState({
    key: 'name',
    direction: 'ascending'
  });

  // State for search
  const [searchQuery, setSearchQuery] = useState('');

  // State for view
  const [viewMode, setViewMode] = useState('all'); // 'all', 'pending', 'accepted', 'rejected'

  // Toggle filter sections
  const toggleFilter = (filter) => {
    setExpandedFilters({
      ...expandedFilters,
      [filter]: !expandedFilters[filter]
    });
  };

  // Handle sort
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Mock data for run details
  const runDetails = {
    id: runId || '1',
    title: "Morning Trail Run",
    location: "Central Park, New York",
    date: "April 30, 2025",
    status: "Active",
    totalParticipants: 24,
    maxParticipants: 30,
    description: "A beautiful morning run through the scenic trails of Central Park."
  };

  // Mock data for participants
  const participantsData = [
    {
      id: 1,
      name: "Sarah Johnson",
      username: "sarahj",
      email: "sarah.j@example.com",
      age: 29,
      profilePic: "/api/placeholder/50/50",
      joinedSince: "Jan 15, 2024",
      averagePace: "5:30 min/km",
      runsCompleted: 24,
      status: "accepted"
    },
    {
      id: 2,
      name: "Michael Chen",
      username: "mikec",
      email: "mchen@example.com",
      age: 34,
      profilePic: "/api/placeholder/50/50",
      joinedSince: "Mar 22, 2024",
      averagePace: "4:45 min/km",
      runsCompleted: 42,
      status: "accepted"
    },
    {
      id: 3,
      name: "Jessica Miller",
      username: "jessmiller",
      email: "jess.m@example.com",
      age: 26,
      profilePic: "/api/placeholder/50/50",
      joinedSince: "Feb 10, 2024",
      averagePace: "5:15 min/km",
      runsCompleted: 18,
      status: "pending"
    },
    {
      id: 4,
      name: "David Wilson",
      username: "davew",
      email: "d.wilson@example.com",
      age: 31,
      profilePic: "/api/placeholder/50/50",
      joinedSince: "Dec 5, 2023",
      averagePace: "6:00 min/km",
      runsCompleted: 15,
      status: "pending"
    },
    {
      id: 5,
      name: "Emma Thompson",
      username: "emmat",
      email: "emma.t@example.com",
      age: 27,
      profilePic: "/api/placeholder/50/50",
      joinedSince: "Apr 3, 2024",
      averagePace: "5:50 min/km",
      runsCompleted: 9,
      status: "rejected"
    },
    {
      id: 6,
      name: "Alex Rodriguez",
      username: "alexr",
      email: "alex.r@example.com",
      age: 33,
      profilePic: "/api/placeholder/50/50",
      joinedSince: "Jan 30, 2024",
      averagePace: "4:30 min/km",
      runsCompleted: 35,
      status: "accepted"
    },
    {
      id: 7,
      name: "Lisa Wang",
      username: "lisaw",
      email: "lisa.wang@example.com",
      age: 29,
      profilePic: "/api/placeholder/50/50",
      joinedSince: "Feb 18, 2024",
      averagePace: "5:10 min/km",
      runsCompleted: 22,
      status: "pending"
    }
  ];

  // Filter participants based on search query and view mode
  const filteredParticipants = participantsData.filter(participant => {
    // Filter by search query
    const matchesSearch = 
      participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  // Stats for participant status
  const acceptedCount = participantsData.filter(p => p.status === 'accepted').length;
  const pendingCount = participantsData.filter(p => p.status === 'pending').length;
  const rejectedCount = participantsData.filter(p => p.status === 'rejected').length;

  // Handle status change
  const changeParticipantStatus = (id, newStatus) => {
    // In a real app, this would make an API call to update the participant status
    console.log(`Changed participant ${id} status to ${newStatus}`);
    // This would update the state in a real application
  };

  return (
    <div className="search-run-container">
      {/* Side Navigation */}
      <div className="side-nav-search">
        <div className="filter-header">Filter Participants</div>
        
        {/* Status Filter */}
        <div className="filter-section">
          <div className="filter-title" onClick={() => toggleFilter('status')}>
            <h3>Status</h3>
            <svg className={`chevron-icon ${expandedFilters.status ? 'rotate' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          {expandedFilters.status && (
            <div className="filter-content">
              <div className="filter-list">
                <div className="filter-item">
                  <input type="radio" id="status-all" name="status" checked={viewMode === 'all'} onChange={() => setViewMode('all')} />
                  <label htmlFor="status-all">All</label>
                </div>
                <div className="filter-item">
                  <input type="radio" id="status-accepted" name="status" checked={viewMode === 'accepted'} onChange={() => setViewMode('accepted')} />
                  <label htmlFor="status-accepted">Accepted</label>
                </div>
                <div className="filter-item">
                  <input type="radio" id="status-pending" name="status" checked={viewMode === 'pending'} onChange={() => setViewMode('pending')} />
                  <label htmlFor="status-pending">Pending</label>
                </div>
                <div className="filter-item">
                  <input type="radio" id="status-rejected" name="status" checked={viewMode === 'rejected'} onChange={() => setViewMode('rejected')} />
                  <label htmlFor="status-rejected">Rejected</label>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Age Filter */}
        <div className="filter-section">
          <div className="filter-title" onClick={() => toggleFilter('age')}>
            <h3>Age Range</h3>
            <svg className={`chevron-icon ${expandedFilters.age ? 'rotate' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          {expandedFilters.age && (
            <div className="filter-content">
              <div className="filter-input">
                <label htmlFor="min-age">Min Age:</label>
                <input type="number" id="min-age" min="18" max="100" />
              </div>
              <div className="filter-input">
                <label htmlFor="max-age">Max Age:</label>
                <input type="number" id="max-age" min="18" max="100" />
              </div>
            </div>
          )}
        </div>
        
        {/* Join Date Filter */}
        <div className="filter-section">
          <div className="filter-title" onClick={() => toggleFilter('joinDate')}>
            <h3>Join Date</h3>
            <svg className={`chevron-icon ${expandedFilters.joinDate ? 'rotate' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          {expandedFilters.joinDate && (
            <div className="filter-content">
              <div className="filter-input">
                <label htmlFor="from-date">From:</label>
                <input type="date" id="from-date" />
              </div>
              <div className="filter-input">
                <label htmlFor="to-date">To:</label>
                <input type="date" id="to-date" />
              </div>
            </div>
          )}
        </div>
        
        {/* Completed Runs Filter */}
        <div className="filter-section">
          <div className="filter-title" onClick={() => toggleFilter('completedRuns')}>
            <h3>Completed Runs</h3>
            <svg className={`chevron-icon ${expandedFilters.completedRuns ? 'rotate' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          {expandedFilters.completedRuns && (
            <div className="filter-content">
              <div className="filter-input">
                <label htmlFor="min-runs">Minimum:</label>
                <input type="number" id="min-runs" min="0" />
              </div>
              <div className="filter-input">
                <label htmlFor="max-runs">Maximum:</label>
                <input type="number" id="max-runs" min="0" />
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
                <button onClick={() => navigate('/user/profile/organizer/runCreated')} className="back-button">
                <ChevronLeft size={20} />
                <span>Go Back</span>
                </button>
            </div>
            <h1 className="page-title">Manage Participants</h1>
            <p className="page-subtitle">
              {runDetails.title} - {runDetails.location} | {runDetails.date}
            </p>
          </div>
          
          <div className="run-capacity-wrapper">
            <div className="run-capacity-info">
              <span className="capacity-label">Participants:</span>
              <span className="capacity-count">{runDetails.totalParticipants} / {runDetails.maxParticipants}</span>
            </div>
            <div className="capacity-bar">
              <div 
                className="capacity-progress" 
                style={{ width: `${(runDetails.totalParticipants / runDetails.maxParticipants) * 100}%` }}
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
              <p className="stat-number">5:15 min/km</p>
            </div>
          </div>
        </div>
        
        {/* Results Table */}
        <div className="results-container">
          <div className="results-table-wrapper">
            <table className="results-table">
              <thead>
                <tr>
                  <th onClick={() => requestSort('name')}>
                    Participant
                    {sortConfig.key === 'name' && (
                      <span className="sort-indicator">{sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}</span>
                    )}
                  </th>
                  <th onClick={() => requestSort('age')}>
                    Age
                    {sortConfig.key === 'age' && (
                      <span className="sort-indicator">{sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}</span>
                    )}
                  </th>
                  <th onClick={() => requestSort('joinedSince')}>
                    Joined Since
                    {sortConfig.key === 'joinedSince' && (
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
                {sortedParticipants.map(participant => (
                  <tr key={participant.id} className="result-row">
                    <td className="participant-cell">
                      <div className="participant-info">
                        <img src={participant.profilePic} alt={participant.name} className="participant-avatar" />
                        <div className="participant-details">
                          <span className="participant-name">{participant.name}</span>
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
                        {participant.joinedSince}
                      </div>
                    </td>
                    <td>
                      <div className="info-with-icon">
                        <svg className="info-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        {participant.averagePace}
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
                        {participant.status.charAt(0).toUpperCase() + participant.status.slice(1)}
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
                        <button className="view-profile-btn" title="View Profile">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
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
            Showing <span className="pagination-bold">1-{sortedParticipants.length}</span> of <span className="pagination-bold">{sortedParticipants.length}</span> participants
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

export default RunParticipants;