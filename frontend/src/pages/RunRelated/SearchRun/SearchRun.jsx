import React, { useState, useEffect } from 'react';
import { Search, Route, ChevronDown, ChevronRight, User, Calendar, Clock, Users, Activity, Map, ZoomIn } from 'lucide-react';
import './srchRun.css'; 
import { useNavigate } from 'react-router-dom';// Import the CSS file
import { ChevronLeft } from 'lucide-react';

function SearchRun() {
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [runsPerPage] = useState(6);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRuns = async () => {
      try {
        const response = await fetch('http://localhost:3000/runs/runList');
        const data = await response.json();
        if (data.success) {
          // Replace existing results, don't append
          setSearchResults(data.data);
        }
      } catch (error) {
        console.error('Error fetching runs:', error);
      }
    };

    // Fetch runs only once when the component mounts
    fetchRuns();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatParticipants = (run) => {
    if (run.max_people) {
      return `${run.nmb_participants}/${run.max_people}`;
    }
    return run.nmb_participants;
  };


  const indexOfLastRun = currentPage * runsPerPage;
  const indexOfFirstRun = indexOfLastRun - runsPerPage;
  const currentRuns = searchResults.slice(indexOfFirstRun, indexOfLastRun);
  const totalPages = Math.ceil(searchResults.length / runsPerPage);

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


  return (
    <div className="search-run-container">
        
      {/* Main Content */}
      <div className="main-content">
        <div className="header-container">
          {/* Search Page Title */}
          <div>
          <div className="back-navigation">
            <button onClick={() => navigate(-1)} className="back-button">
              <ChevronLeft size={20} />
              <span>Go Back</span>
            </button>
          </div>
            <h1 className="page-title">Search Runs</h1>
            <p className="page-subtitle">Find runs that match your preferences and join the community</p>
          </div>
          
          {/* Find a Run Button */}
          <button className="find-run-btn">FIND A RUN</button>
        </div>
        
        {/* Search Bar */}
        <div className="search-container">
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search for runs..."
              className="search-input"
            />
            <button className="search-btn">
              <Search className="search-icon" />
            </button>
          </div>
        </div>
        
        {/* Search Results Table */}
        <div className="results-container">
        <div className="results-table-wrapper">
          <table className="results-table">
            <thead>
              <tr>
                <th>Details</th>
                <th>Title</th>
                <th>Run Info</th>
                <th>Difficulty</th>
                <th>Participants</th>
                <th>Type</th>
                <th>Date</th>
                <th>Sign Up</th>
              </tr>
            </thead>
            <tbody>
              {currentRuns.map((result) => (
                <tr key={result.run_id} className="result-row">
                  <td>
                    <button onClick={() => navigate('/user/search/details')} className="view-details-btn">
                      <ZoomIn size={18} />
                    </button>
                  </td>
                  <td className="title-cell">
                    <div className="title-wrapper">
                      <span className="run-title">{result.run_title}</span>
                      <span className="run-location">{result.location}</span>
                    </div>
                  </td>
                  <td>
                    <div className="info-with-icon run-info">
                      <div>
                      <Clock size={16} className="info-icon" />
                      <span>{result.duration}</span>
                      </div>

                      <div>
                      <Activity size={16} className="info-icon" />
                      <span>{result.average_speed} km/h</span>
                      </div>

                      <div>
                        <Route size={16} className='info-icon'/>
                        <span>Distance: {result.distance}</span>
                      </div>

                      <div>
                      <User size={16} className='info-icon'/>
                      <span>Ages: {result.age_range}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`difficulty-badge ${result.difficulty.toLowerCase()}`}>
                      {result.difficulty}
                    </span>
                  </td>
                  <td>
                    <div className="info-with-icon">
                      <Users size={16} className="info-icon" />
                      <span>{formatParticipants(result)}</span>
                    </div>
                  </td>
                  <td>
                    <span>{result.run_type}</span>
                  </td>
                  <td>
                    <div className="info-with-icon">
                      <Calendar size={16} className="info-icon" />
                      <span>{formatDate(result.date)}</span>
                    </div>
                  </td>
                  <td>
                    <button onClick={() => navigate('/details',{ state: { runId: result.run_id, creatorId: result.creator_id  } })} className="join-run-btn">
                      Join Run
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
        
        {/* Pagination Controls */}
        {searchResults.length > runsPerPage && (
          <div className="pagination-container">
            <div className="pagination-info">
              Showing <span className="pagination-bold">
                {indexOfFirstRun + 1}-{Math.min(indexOfLastRun, searchResults.length)}
              </span> of <span className="pagination-bold">{searchResults.length}</span> runs
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

export default SearchRun;