/* eslint-disable no-unused-vars */
import Marquee from "react-fast-marquee";
import hermesLeg from "../../assets/icons/hermes (1).png"; // or use an emoji/icon

import cardio from '../../assets/icons/cardio.png'
import thunder from '../../assets/icons/thunder.png'
import runner from '../../assets/icons/race.png'

import './marquee.css'

const PaceScroll = () => {
  return (
    <div className="marquee-container">
    <Marquee speed={50} className="marquee"
     gradient={false} 
     pauseOnHover={false}
     autoFill
     >
        <div className="marquee-group">
            <p className="marquee-item">PACE</p>
            <img src={runner} alt="icon" className="marquee-icon" />
            <p className="marquee-item">PAL</p>
        </div>

        <img src={hermesLeg} alt="hermes" className="marquee-hermes" />

        <div className="marquee-group">
            <p className="marquee-item">PACE</p>
            <img src={thunder} alt="icon" className="marquee-icon" />
            <p className="marquee-item">PAL</p>
        </div>

        <img src={hermesLeg} alt="hermes" className="marquee-hermes" />

        <div className="marquee-group">
            <p className="marquee-item">PACE</p>
            <img src={cardio} alt="icon" className="marquee-icon" />
            <p className="marquee-item">PAL</p>
        </div>

        <img src={hermesLeg} alt="hermes" className="marquee-hermes" />
    </Marquee>

    </div>
  );
};

export default PaceScroll;
