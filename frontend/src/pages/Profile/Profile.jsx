import React, { useEffect, useState } from 'react'

import './profile.css'
import MySidenav from '../../components/Sidenav/MySidenav'
import CurrRun from '../../components/Profile/CurrRun/CurrRun'
import LastRun from '../../components/Profile/LastRun/LastRun'
import RunTime from '../../components/Profile/RunTime/RunTime'
import RunHis from '../../components/Profile/RunHis/RunHis'
import { TopNav } from '../../components/Profile/TopNav/TopNav'
import { useParams, useNavigate } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'

function Profile() {

  const { id } = useParams()
  const [userId, setUserId] = useState(null) 
  const [userData, setUserData] = useState(null) 
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  const handleLogout = () => {
    setUserId(null)
    setUserData(null)

    window.history.replaceState(null, '', '/auth/login');
    window.location.href = '/auth/login';
  };


  useEffect(()=>{
    
    console.log(id)
    setUserId(id)

    if(id){
      fetchUserData(id)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('userId', id);
    console.log('Stored userId:', id);
  }, [id]);

  const fetchUserData = async(userId) => {
    setLoading(true)
    console.log(userId)

    try{
      const response = await fetch(`http://localhost:3000/users/profile/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userId}`, // Send in headers
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to fetch user');
      const data = await response.json();
      setUserData(data)
      console.log(data)

    } catch (error) {
      console.error('Error:', error);
      return null;
    }finally{
      setLoading(false)
    }
  }

  if(loading){
    return <Loading loadingInfo={'Profile Page'}/>
  }

  if(!userId){
    return <div>Please login to view your profile</div>;
  }

  return (
    <>
      {userData ? (
        <section className='profile-section'>
        <div style={{ gridArea: 'topNav' }}>
          <TopNav />
        </div>
        <div style={{ gridArea: 'sidenav' }}>
          <MySidenav userData={userData}  onLogout={handleLogout} />
        </div>
        <div style={{ gridArea: 'lastRun' }}>
          <LastRun userData={userData} />
        </div>
        <div style={{ gridArea: 'currRun' }}>
          <CurrRun userData={userData} />
        </div>
        <div style={{ gridArea: 'runTime' }}>
          <RunTime userData={userData} />
        </div>   
        </section>
      ) : (
        <Loading loadingInfo={'Your Profile'}/>
      )}
    </>
  );
}



export default Profile