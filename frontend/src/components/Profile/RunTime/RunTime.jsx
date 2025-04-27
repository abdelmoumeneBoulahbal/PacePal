import React from 'react';
import './runtime.css';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

import stopWatch from '../../../assets/icons/stopwatch.png'

const data = [
  { date: 'Dec 20', time: 2 },
  { date: 'Dec 21', time: 3 },
  { date: 'Dec 22', time: 2.5 },
  { date: 'Dec 23', time: 3.2 },
  { date: 'Dec 24', time: 4 },
  { date: 'Dec 25', time: 4.5 },
  { date: 'Dec 26', time: 5 },
];

function RunTime() {
  return (
    <div className="rt-container">
      <div className="rt-top">
        <div className='rt-top-title'>
          <img src={stopWatch} alt="" />
          <h3>My Total Running Time</h3>
        </div>
        <button className="rt-button">See More</button>
      </div>

      <div className="rt-main">
        <h1>13 hr 26 min</h1>
        <p className="rt-percentage">+8.4% <span>vs Last Week</span></p>
      </div>

      <div className="rt-bottom">
        <ResponsiveContainer width="100%" height={120}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorTime" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7B61FF" stopOpacity={0.6}/>
                <stop offset="95%" stopColor="#7B61FF" stopOpacity={0}/>
              </linearGradient>
            </defs>

            <XAxis dataKey="date" hide />
            <YAxis hide />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey="time" 
              stroke="#7B61FF" 
              fillOpacity={1} 
              fill="url(#colorTime)" 
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>

        <div className="rt-bottom-footer">
          <span>Dec 26, 2024</span>
          <span>209 hr 43 min Total Time</span>
        </div>
      </div>
    </div>
  );
}

export default RunTime;
