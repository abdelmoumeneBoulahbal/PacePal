import React from 'react';
import './hero.css';

import Text from '../../components/Text/Text'

/* Assets */
import heroImg from "../../assets/hero/hero-4.png"

/* Texture */
import dots from '../../assets/texture/dot-group.png'
import cross from '../../assets/texture/cross.png'
import adds from '../../assets/texture/add.png'


export default function Hero() {
  return (
      <section className='hero-section'>
        <div className='hero-content'>
          <Text />
          <img src={heroImg} alt="runner" className='hero-runner-img' />
        </div>
        <div>
          <img src={dots} className='dots dts-txtr-1'/>
          <img src={dots} className='dots dts-txtr-2'/>
          <img src={dots} className='dots dts-txtr-3'/>
          <img src={dots} className='dots dts-txtr-4'/>

          <img src={cross} className='cross crs-txtr-1'/>
          <img src={cross} className='cross crs-txtr-2'/>
          <img src={cross} className='cross crs-txtr-3'/>
          <img src={cross} className='cross crs-txtr-4'/>

          <img src={adds} className='add add-txtr-1'/>
          <img src={adds} className='add add-txtr-2'/>


        </div>
      </section>
  );
}