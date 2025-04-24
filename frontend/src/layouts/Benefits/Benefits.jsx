import React from 'react'

import './benefits.css'
import team from '../../assets/icons/team.png'
import people from '../../assets/icons/multiple-users-silhouette.png'
import rev from '../../assets/icons/positive-review.png'
import slider from '../../assets/icons/slider.png'
import track from '../../assets/icons/track.png'

function Benefits() {
  return (
    <section className="bnf-section">


        <div className="bnf-left">
            <div className="bnf-left-content">
                <h2>Run Together.</h2>
                    
                <h2>Grow Together.</h2>
                <p>
                Discover what you can achieve when running becomes a shared journey —
                whether you're starting out or leveling up, we help you stay on track. 
                </p>
                <button>Signup Now</button>
            </div>
        </div>

        <div className="bnf-right">
            <div className='bnf-right-content'>
                <h3 className="bnf-1">
                    <span>
                    <img src={people} />
                    </span>
                    Meet new runners near you
                </h3>
                <h3 className="bnf-2">
                    <img src={track} />
                    Explore fresh running tracks
                </h3>
                <h3 className="bnf-3">
                    <img src={team} />
                    Earn trust as a run leader
                </h3>
                <h3 className="bnf-4">
                    <img src={rev} />
                    Share tips, notes & ride plans
                </h3>
                <h3 className="bnf-5">
                    <img src={slider} />
                    Match runs to your pace & level
                </h3>
            </div>
        </div>


    </section>
  )
}

export default Benefits