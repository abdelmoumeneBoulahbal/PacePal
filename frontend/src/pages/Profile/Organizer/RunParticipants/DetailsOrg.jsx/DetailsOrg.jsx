/* eslint-disable no-unused-vars */
import { User, Calendar, Clock, Users, Activity, Map, Award, MapPin, Heart, Shield, ChevronLeft } from 'lucide-react';
import '../../../../RunRelated/DetailsRun/dtsRun.css'; // We'll create this CSS file
import { useNavigate } from 'react-router-dom';
import React, { useEffect,useState } from 'react'


function DetailsOrg({ data, creatorData }) {
  const navigate = useNavigate();



  const runData = data?.run?.[0] || {};

  
  return (
    <div className="run-details-container">
      
      {/* Page Title */}
      <h1 className="page-title"
          style={{marginBottom:'1.5rem'}}
      >Run Details</h1>
      
      {/* Main Content */}
      <div className="details-content">
        {/* Run Header */}
        <div className="run-header">
          <h2 className="run-title-detail">{runData.run_title}</h2>
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
                    <span className="stat-value">{creatorData.runs_created || 0}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="no-creator">Creator information not available</div>
            )}
          </div>
        </div>

        </div>
        
        {/* Run Details Grid */}
        <div className="details-grid">
          {/* Description */}
          <div className="details-card description-card">
            <h3>Description & Additional Info</h3>
            <p>{runData.description}</p>
            <p style={{ marginTop:"0rem"}}> {runData.additional_location_info} </p>
          </div>
          
          {/* Run Information */}
          <div className="details-card info-card">
            <h3>Basic Info</h3>
            <div className="info-grid">

              <div className="info-item">
                <div className="info-icon-wrapper">
                  <Calendar size={20} />
                </div>
                <div className="info-content">
                  <span className="info-label">Date</span>
                  <span className="info-value">{new Date(runData.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon-wrapper">
                  <Clock size={20} />
                </div>
                <div className="info-content">
                  <span className="info-label">Time</span>
                  <span className="info-value">{runData.start_time}</span>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon-wrapper">
                  <Award size={20} />
                </div>
                <div className="info-content">
                  <span className="info-label">Max People</span>
                  <span className=''>
                    {runData.max_people}
                  </span>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon-wrapper">
                  <Users size={20} />
                </div>
                <div className="info-content">
                  <span className="info-label">Age Range</span>
                  <span className="info-value">{runData.age_range}</span>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon-wrapper">
                  <Activity size={20} />
                </div>
                <div className="info-content">
                  <span className="info-label">Created At</span>
                  <span className="info-value"> 
                    {runData.created_at ? new Date(runData.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    }) : 'N/A'}
                  </span>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon-wrapper">
                  <Map size={20} />
                </div>
                <div className="info-content">
                  <span className="info-label">Run Track</span>
                  <span className="info-value">{runData.track_name}</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon-wrapper">
                  <Award size={20} />
                </div>
                <div className="info-content">
                  <span className="info-label">Status</span>
                  <span className={`status-badge ${(runData.status).toLowerCase()}`}>
                    {runData.status}
                  </span>
                </div>
              </div>

            </div>
          </div>
          
          {/* Location */}
          <div className="details-card location-card">
            <h3>Location</h3>
            <div className="location-content">
              <div className="location-header">
                <MapPin size={20} />
                <p>{runData.location}</p>
              </div>
              <div className="map-placeholder">
                <img src="/api/placeholder/400/200" alt="Map location" className="map-image" />
                <a href={runData.google_maps_link} className="map-link" target="_blank" rel="noopener noreferrer">
                  View on Google Maps
                </a>
              </div>
              
            </div>
            
          </div>
          
          <div className="details-card info-card">
            <h3>Run Info</h3>
            
            <div className="info-grid">

              <div className="info-item">
                <div className="info-icon-wrapper">
                  <Map size={20} />
                </div>
                <div className="info-content">
                  <span className="info-label">Run Type</span>
                  <span className="info-value"> {runData.run_type} </span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon-wrapper">
                  <Map size={20} />
                </div>
                <div className="info-content">
                  <span className="info-label">Duration</span>
                  <span className="info-value"> {runData.duration} </span>
                </div>
              </div>
                  <div className="info-item">
                <div className="info-icon-wrapper">
                  <Map size={20} />
                </div>
                <div className="info-content">
                  <span className="info-label">Difficulty</span>
                  <span className={`difficulty-badge ${(runData.difficulty).toLowerCase()}`}>
                    {runData.difficulty}
                  </span>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon-wrapper">
                  <Map size={20} />
                </div>
                <div className="info-content">
                  <span className="info-label">Average Speed</span>
                  <span className="info-value"> {runData.average_speed} </span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon-wrapper">
                  <Map size={20} />
                </div>
                <div className="info-content">
                  <span className="info-label">Distance</span>
                  <span className="info-value"> {runData.distance} </span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon-wrapper">
                  <Map size={20} />
                </div>
                <div className="info-content">
                  <span className="info-label">Group Gender</span>
                  <span className="info-value"> {runData.gender} </span>
                </div>
              </div>
              
            </div>
          </div>
                
        </div>
      </div>
  );
}

export default DetailsOrg;