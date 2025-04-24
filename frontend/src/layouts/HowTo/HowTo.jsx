import React from 'react'
import './howto.css'
import Card from '../../components/Card/Card'

/* img */
import startBlock from '../../assets/img/athlete-running-starting-line-side-view.jpg'

export default function HowTo() {
  return (
    <section className='ht-section'>
        <h2>How can i start ?</h2>
        <div className='ht-content-container'>
            <div className='card-1'>
                <Card 
                  cardTitle="Create Your First Run" 
                  cardImg={startBlock} 
                  cardDesc="Set the time, pace, and track. Add details 
                            like age range and return plans.
                            Let others join your vibe."
                />
            </div>

            <div className='card-2'>
                <Card
                cardTitle="Join a Scheduled Run"
                cardImg={startBlock} 
                cardDesc="Pick a session that fits 
                your style. Get reminders. 
                Show up. Run together."
                
                />
            </div>

            <div className='card-3'>
                <Card 
                cardTitle="Customize your experience"
                cardImg={startBlock} 
                cardDesc="Choose your speed, age group, and crowd
                        size. Every run, your rules
                "
                />
            </div>

            <div className='card-4'>
                <Card 
                cardTitle="Trust to Grow"
                cardImg={startBlock} 
                cardDesc="Host great runs, get 
                rated, and climb the ranks. 
                Your rep grows with every step."
                />
            </div>

        </div>

    </section>

    )
}
