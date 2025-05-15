import React from 'react'
import './loading.css'
import loadingAnimation from '../../assets/icons/running.gif'

function Loading({  loadingInfo  }) {
  return (
    <div className="loading-div">
        <img src={loadingAnimation} alt="Loading Animation" />
        <h2>Loading {loadingInfo} </h2>
    </div>
  )
}

export default Loading