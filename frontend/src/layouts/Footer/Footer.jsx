import React from 'react';
import hermesLeg from '../../assets/icons/hermes (1).png';
import './footer.css';
import { Instagram, Youtube, Twitter, Linkedin } from 'lucide-react';

function Footer() {
  return (
    <section className='footer-section'> 
      <div className='social-icons-row'>
        <a href="#" className='social-icon instagram'>
          <Instagram size={20} />
        </a>
        <a href="#" className='social-icon youtube'>
          <Youtube size={20} />
        </a>

        <a href="#" className='social-icon twitter'>
          <Twitter size={20} />
        </a>
        <a href="#" className='social-icon linkedin'>
          <Linkedin size={20} />
        </a>
      </div>
      
      <div className='main-logo-text'>
        <h1>PACEPAL</h1>
      </div>
      
      <div className='footer-content'>
        <p>2025 © PACEPAL</p>
        <p>ALL RIGHTS RESERVED</p>
      </div>

    </section>
  );
}

export default Footer;