import React from 'react'

import './services.css'

import PaceScroll from '../../components/Marquee/Marquee'

function Services() {
  return (
    <section className='srv-section'>
<div style={{ backgroundColor: "var(--primary-color)" }}>

          <PaceScroll />
        </div>
        <div className="srv-content">


          <div className="srv-left">
            <div className='srv-left-title-div'>
            <h2 className='srv-left-t1'>Run as One</h2>
            <h2 className='srv-left-t2'>Power <br /> in <br />Numbers</h2>
            </div>
          </div>

          <div className="srv-right">
            <div className='srv-right-content'>
              <h2>What do we do</h2>
              <p className='srv-p2'>
                <b>We make planning group runs effortless.</b> <br />
                Create, join, and organize running events with friends or the community — all in one place. 
                No messy group chats, no confusion. Just pure running, together.
              </p>
              <p className='srv-p2'>
                <b>Lace up, link up, and run it your way.</b> <br />
                Whether it's a casual jog or a full send, 
                you're one tap away from making it happen — with the crew, 
                or meeting new runners who move like you.
              </p>
              <button className="gi-srv-btn">
                <span className="gi-srv-content">
                  <span className="gi-srv-text">Get Involved</span>
                  <span className="gi-srv-arrow">»</span>
                </span>
              </button>
            </div>
          </div>


        </div>
    </section>

  )
}

export default Services