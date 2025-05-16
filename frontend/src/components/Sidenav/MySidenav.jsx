import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

import { Sidenav, Nav, Toggle } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import HistoryIcon from '@rsuite/icons/History';
import OffRoundIcon from '@rsuite/icons/OffRound';

import './sdnav.css'

function MySidenav({ userData }) {


    const navigate = useNavigate()
    const [activeKey, setActiveKey] = useState('1');
    
    return (
        <div style={{ width: 250, height: '100%', background: '#f8f9fa'}} className='sidenav-container'>
        
          <Sidenav  defaultOpenKeys={['3', '4']}>
            <div className='pfp-container'>
                <div className='profile-pic'>
                  
                </div>
                <div className='un-div'>
                  <h3> {userData.username} </h3>
                  <h4>title</h4>
                </div>
            </div>

            <hr />

            <Sidenav.Body>
              <Nav activeKey={activeKey} onSelect={setActiveKey} className='side-nav'>
                <Nav.Item eventKey="1" icon={<DashboardIcon />} >
                  Dashboard
                </Nav.Item>
                <Nav.Menu eventKey="2" title="History" icon={<HistoryIcon />}>
                  <Nav.Item   onClick={() => navigate('/user/profile/organizer/runCreated', 
                              { state: { userId: userData.user_id } })} 
                              className='rh-item-sn'>
                    As an Organizer
                  </Nav.Item>
                  <Nav.Item onClick={() => navigate('/user/profile/history', {state: {userId: userData.user_id}})} className='rh-item-sn second'>
                    As a Runner
                  </Nav.Item>
                </Nav.Menu>
                <Nav.Item
                  eventKey="3"
                  icon={<GearCircleIcon />}
                  onClick={()=>navigate('/user/profile/settings')}
                >
                  Settings
                </Nav.Item>
                <Nav.Item icon={<OffRoundIcon />}>
                  Logout
                </Nav.Item>
              </Nav>
            </Sidenav.Body>
          </Sidenav>
      </div>
    )
}

export default MySidenav