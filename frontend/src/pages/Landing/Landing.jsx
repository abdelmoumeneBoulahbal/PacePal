import React from 'react'
import Navbar from '../../layouts/Navbar/Navbar'
import Hero from '../../layouts/Hero/Hero'
import Services from '../../layouts/Services/Services'

import './landing.css'

import arrows from '../../assets/icons/arrows.png'
import HowTo from '../../layouts/HowTo/HowTo'
import Benefits from '../../layouts/Benefits/Benefits'
import Footer from '../../layouts/Footer/Footer'

export default function Landing() {

  return (
    <section className='land-section'>
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
        <Services />
        <HowTo />
        <Benefits />
        <Footer />
    </section>
  )
}


