import React from 'react'
import Navbar from '../../layouts/Navbar/Navbar'
import Hero from '../../layouts/Hero/Hero'
import './landing.css'

import arrows from '../../assets/texture/arrows.png'

export default function Landing() {

  return (
    <section>
        <div 
          className='nav-hero-container'>
          <header>
              <Navbar />
          </header>
          <Hero />
          
          <div className='hero-sfm-div'>
            <p className='hero-sfm-p'>SCROLL FOR MORE</p>
            <img src={arrows} alt="" />
          </div>
        </div>
        
    </section>
  )
}


