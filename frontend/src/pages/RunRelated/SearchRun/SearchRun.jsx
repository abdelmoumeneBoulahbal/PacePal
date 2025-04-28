import React, { useState } from 'react';
import { Search, ChevronDown, ChevronRight, User, Calendar, Clock, Users, Activity, Map, ZoomIn } from 'lucide-react';
import './srchRun.css'; 
import { useNavigate } from 'react-router-dom';// Import the CSS file

function SearchRun() {
  // State for expandable sections
  const [expanded, setExpanded] = useState({
    location: false,
    date: false,
    time: false,
    duration: false,
    difficulty: false,
    ageRange: false,
    gender: false
  });

  const navigate = useNavigate();

  // Toggle expand/collapse for each section
  const toggleSection = (section) => {
    setExpanded({
      ...expanded,
      [section]: !expanded[section]
    });
  };

  // Sample data for dropdown options
  const algerianWilayas = [
    'Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Biskra',
    'Béchar', 'Blida', 'Bouira', 'Tamanrasset', 'Tébessa', 'Tlemcen', 'Tiaret',
    'Tizi Ouzou', 'Algiers', 'Djelfa', 'Jijel', 'Sétif', 'Saïda'
  ];

  const difficultyLevels = ['Easy', 'Medium', 'Challenging', 'Difficult', 'Expert'];
  const genderOptions = ['Male', 'Female', 'Mixed', 'All'];
  const ageRanges = ['Under 18', '18-25', '26-35', '36-45', '46-55', '56+'];
  const durationOptions = ['Less than 1 hour', '1-2 hours', '2-3 hours', '3-5 hours', '5+ hours'];

  // Sample search results
  const searchResults = [
    {
      id: 1,
      title: 'Morning Run',
      createdBy: { username: 'runner1', name: 'Ahmed Bensaïd' },
      location: 'Algiers',
      date: '2025-04-26',
      time: '08:00',
      duration: '45 mins',
      difficulty: 'Medium',
      ageRange: '26-35',
      gender: 'Mixed',
      participants: 5,
      speed: '10 km/h',
      trackInfo: 'Park trail',
      zone: 'Zone 2'
    },
    {
      id: 2,
      title: 'Evening Jog',
      createdBy: { username: 'mountainRunner', name: 'Karim Farès' },
      location: 'Tizi Ouzou',
      date: '2025-04-25',
      time: '17:30',
      duration: '60 mins',
      difficulty: 'Challenging',
      ageRange: '18-25',
      gender: 'Male',
      participants: 3,
      speed: '12 km/h',
      trackInfo: 'Mountain path',
      zone: 'Zone 3'
    },
    {
      id: 3,
      title: 'Desert Trek',
      createdBy: { username: 'desertTrekker', name: 'Amina Hadj' },
      location: 'Béchar',
      date: '2025-04-24',
      time: '06:00',
      duration: '120 mins',
      difficulty: 'Difficult',
      ageRange: '26-35',
      gender: 'Female',
      participants: 7,
      speed: '8 km/h',
      trackInfo: 'Desert trail',
      zone: 'Zone 1'
    },
    {
      id: 4,
      title: 'City Marathon Prep',
      createdBy: { username: 'marathonPro', name: 'Leila Ziani' },
      location: 'Algiers',
      date: '2025-04-30',
      time: '07:00',
      duration: '90 mins',
      difficulty: 'Challenging',
      ageRange: '26-35',
      gender: 'Mixed',
      participants: 12,
      speed: '11 km/h',
      trackInfo: 'Urban routes',
      zone: 'Zone 2'
    },
    {
      id: 5,
      title: 'Coastal Run',
      createdBy: { username: 'seaRunner', name: 'Omar Benali' },
      location: 'Béjaïa',
      date: '2025-05-01',
      time: '16:30',
      duration: '60 mins',
      difficulty: 'Medium',
      ageRange: '18-25',
      gender: 'Mixed',
      participants: 8,
      speed: '9 km/h',
      trackInfo: 'Beach trail',
      zone: 'Zone 2'
    }
  ];

  return (
    <div className="search-run-container">
      {/* Side Navigation */}
      <div className="side-nav">
        <div className="filter-header">Filters</div>
        
        {/* Location Filter */}
        <div className="filter-section">
          <div 
            className="filter-title"
            onClick={() => toggleSection('location')}
          >
            <h3>Location</h3>
            {expanded.location ? 
              <ChevronDown className="chevron-icon" /> : 
              <ChevronRight className="chevron-icon" />
            }
          </div>
          
          {expanded.location && (
            <div className="filter-content">
              <div className="filter-list">
                {algerianWilayas.map((wilaya, index) => (
                  <div key={index} className="filter-item">
                    <input type="checkbox" id={`wilaya-${index}`} />
                    <label htmlFor={`wilaya-${index}`}>{wilaya}</label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Date Filter */}
        <div className="filter-section">
          <div 
            className="filter-title"
            onClick={() => toggleSection('date')}
          >
            <h3>Date</h3>
            {expanded.date ? 
              <ChevronDown className="chevron-icon" /> : 
              <ChevronRight className="chevron-icon" />
            }
          </div>
          
          {expanded.date && (
            <div className="filter-content">
              <div className="filter-input">
                <label htmlFor="date-from">From:</label>
                <input type="date" id="date-from" />
              </div>
              <div className="filter-input">
                <label htmlFor="date-to">To:</label>
                <input type="date" id="date-to" />
              </div>
            </div>
          )}
        </div>
        
        {/* Time Filter */}
        <div className="filter-section">
          <div 
            className="filter-title"
            onClick={() => toggleSection('time')}
          >
            <h3>Time</h3>
            {expanded.time ? 
              <ChevronDown className="chevron-icon" /> : 
              <ChevronRight className="chevron-icon" />
            }
          </div>
          
          {expanded.time && (
            <div className="filter-content">
              <div className="filter-input">
                <label htmlFor="time-start">Start Time:</label>
                <input type="time" id="time-start" />
              </div>
              <div className="filter-input">
                <label htmlFor="time-end">End Time:</label>
                <input type="time" id="time-end" />
              </div>
            </div>
          )}
        </div>
        
        {/* Duration Filter */}
        <div className="filter-section">
          <div 
            className="filter-title"
            onClick={() => toggleSection('duration')}
          >
            <h3>Duration</h3>
            {expanded.duration ? 
              <ChevronDown className="chevron-icon" /> : 
              <ChevronRight className="chevron-icon" />
            }
          </div>
          
          {expanded.duration && (
            <div className="filter-content">
              <div className="filter-list">
                {durationOptions.map((option, index) => (
                  <div key={index} className="filter-item">
                    <input type="checkbox" id={`duration-${index}`} />
                    <label htmlFor={`duration-${index}`}>{option}</label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Difficulty Filter */}
        <div className="filter-section">
          <div 
            className="filter-title"
            onClick={() => toggleSection('difficulty')}
          >
            <h3>Difficulty</h3>
            {expanded.difficulty ? 
              <ChevronDown className="chevron-icon" /> : 
              <ChevronRight className="chevron-icon" />
            }
          </div>
          
          {expanded.difficulty && (
            <div className="filter-content">
              <div className="filter-list">
                {difficultyLevels.map((level, index) => (
                  <div key={index} className="filter-item">
                    <input type="checkbox" id={`difficulty-${index}`} />
                    <label htmlFor={`difficulty-${index}`}>{level}</label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Age Range Filter */}
        <div className="filter-section">
          <div 
            className="filter-title"
            onClick={() => toggleSection('ageRange')}
          >
            <h3>Age Range</h3>
            {expanded.ageRange ? 
              <ChevronDown className="chevron-icon" /> : 
              <ChevronRight className="chevron-icon" />
            }
          </div>
          
          {expanded.ageRange && (
            <div className="filter-content">
              <div className="filter-list">
                {ageRanges.map((range, index) => (
                  <div key={index} className="filter-item">
                    <input type="checkbox" id={`age-${index}`} />
                    <label htmlFor={`age-${index}`}>{range}</label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Gender Filter */}
        <div className="filter-section">
          <div 
            className="filter-title"
            onClick={() => toggleSection('gender')}
          >
            <h3>Gender</h3>
            {expanded.gender ? 
              <ChevronDown className="chevron-icon" /> : 
              <ChevronRight className="chevron-icon" />
            }
          </div>
          
          {expanded.gender && (
            <div className="filter-content">
              <div className="filter-list">
                {genderOptions.map((option, index) => (
                  <div key={index} className="filter-item">
                    <input type="radio" name="gender" id={`gender-${index}`} />
                    <label htmlFor={`gender-${index}`}>{option}</label>
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
          {/* Search Page Title */}
          <div>
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
                  <th>Duration</th>
                  <th>Difficulty</th>
                  <th>Participants</th>
                  <th>Speed</th>
                  <th>Track Info</th>
                  <th>Date</th>
                  <th>Sign Up</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((result) => (
                  <tr key={result.id} className="result-row">
                    <td>
                      <button onClick={()=> navigate('/user/search/details')} className="view-details-btn">
                        <ZoomIn size={18} />
                      </button>
                    </td>
                    <td className="title-cell">
                      <div className="title-wrapper">
                        <span className="run-title">{result.title}</span>
                        <span className="run-location">{result.location}</span>
                      </div>
                    </td>
                    <td>
                      <div className="info-with-icon">
                        <Clock size={16} className="info-icon" />
                        <span>{result.duration}</span>
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
                        <span>{result.participants}</span>
                      </div>
                    </td>
                    <td>
                      <div className="info-with-icon">
                        <Activity size={16} className="info-icon" />
                        <span>{result.speed}</span>
                      </div>
                    </td>
                    <td>
                      <div className="info-with-icon">
                        <Map size={16} className="info-icon" />
                        <span>{result.trackInfo}</span>
                      </div>
                    </td>
                    <td>
                      <div className="info-with-icon">
                        <Calendar size={16} className="info-icon" />
                        <span>{result.date}</span>
                      </div>
                    </td>
            
                    <td>
                      <button className="join-run-btn">
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
        <div className="pagination-container">
          <p className="pagination-info">
            Showing <span className="pagination-bold">1</span> to <span className="pagination-bold">5</span> of <span className="pagination-bold">5</span> results
          </p>
          <div className="pagination-controls">
            <button className="pagination-btn" disabled>Previous</button>
            <button className="pagination-btn">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchRun;