import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

import { Sidenav, Nav, Toggle } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import HistoryIcon from '@rsuite/icons/History';
import OffRoundIcon from '@rsuite/icons/OffRound';
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import Leader from '../../assets/icons/leader (2).png'
import Runner from '../../assets/icons/running (2).png'


import './sdnav.css'

function MySidenav({ userData, onLogout }) {

    const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate()
    const [activeKey, setActiveKey] = useState('1');
    
    return (
        <div style={{ width: 300, height: '100%', background: '#f8f9fa'}} className='sidenav-container'>
        
          <Sidenav  defaultOpenKeys={['3', '4']}>
            <div className='pfp-container'>
                <div className='profile-pic'>
                  
                </div>
                <div className='un-div'>
                  <h3 style={{
                    fontWeight:'400',
                    fontSize:'1rem'
                  }}> {userData.first_name}</h3>
                  <h4><b>@{userData.username}</b></h4>
                </div>
            </div>

            <hr />

            <Sidenav.Body>
              <Nav activeKey={activeKey} onSelect={setActiveKey} className='side-nav'>
                <Nav.Item eventKey="1" icon={<DashboardIcon />} >
                  Dashboard
                </Nav.Item>
                <Nav.Item eventKey="2" 
                onClick={()=> navigate('/user/organizer/create')}
                icon={ <AddOutlineIcon/> }>
                  Create a New Run
                </Nav.Item>
                
                <Nav.Menu eventKey="2" title="History" icon={<HistoryIcon />}>
                  <Nav.Item   onClick={() => navigate('/user/profile/organizer/runCreated', 
                              { state: { userId: userData.user_id } })} 
                              className='rh-item-sn'>
                    <img src={Leader}
                    
                      style={{
                          width:'20px',
                          marginBottom:'5px',
                          marginRight:".4rem"
                        }}
                      alt="Leader" />
                    As an Organizer
                  </Nav.Item>
                  <Nav.Item
                  style={{
                    display:'flex',
                    alignItems:'center'
                  }}
                  onClick={() => navigate('/user/profile/history', {state: {userId: userData.user_id}})} className='rh-item-sn second'>
                    <img src={Runner} 
                        style={{
                          width:'24px',
                          marginRight:".2rem",
                          marginLeft:'-5px'
                        }}
                    alt="Runner" />
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
                    <div className="logout-section"
                    >
                      <button 
                        onClick={() => setShowConfirm(true)}
                        className="logout-button"
                      >
                        Logout
                      </button>

                      {showConfirm && (
                        <div className='overlay'>
                          <div className="logout-confirm-dialog">
                            <p>Are you sure you want to logout?</p>
                            <div className="confirm-buttons">
                              <button 
                                onClick={() => {
                                  onLogout();
                                  setShowConfirm(false);
                                }}
                                className="confirm-logout"
                              >
                                Yes, Logout
                              </button>
                              <button 
                                onClick={() => setShowConfirm(false)}
                                className="cancel-logout"
                                >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                </Nav.Item>
              </Nav>
            </Sidenav.Body>
          </Sidenav>
      </div>
    )
}

export default MySidenav