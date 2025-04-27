import React from 'react'

import './profile.css'
import MySidenav from '../../components/Sidenav/MySidenav'
import CurrRun from '../../components/Profile/CurrRun/CurrRun'
import LastRun from '../../components/Profile/LastRun/LastRun'
import RunTime from '../../components/Profile/RunTime/RunTime'
import RunHis from '../../components/Profile/RunHis/RunHis'
import { TopNav } from '../../components/Profile/TopNav/TopNav'

function Profile() {
  return (
    <section className='profile-section'>
      <div style={{ gridArea: 'topNav' }}>
        <TopNav />
      </div>
      <div style={{ gridArea: 'sidenav' }}>
        <MySidenav />
      </div>
      <div style={{ gridArea: 'lastRun' }}>
        <LastRun />
      </div>
      <div style={{ gridArea: 'currRun' }}>
        <CurrRun />
      </div>
      <div style={{ gridArea: 'runTime' }}>
        <RunTime />
      </div>
      <div style={{ gridArea: 'runHis' }}>
        <RunHis />
      </div>     
    </section>
  );
}



export default Profile