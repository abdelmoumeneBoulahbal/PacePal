import React from 'react'
import { useLocation } from 'react-router-dom'

import './auth.css'

/* Components */
import { Signup } from '../../components/Form/Signup/Signup'
import { Login } from '../../components/Form/Login/Login'
import MiniNav from '../../components/Mininav/MiniNav'
import Footer from '../../layouts/Footer/Footer'

function Auth() {
  const location = useLocation()

  return (
    <section className="auth-section">
      <MiniNav />
      
      {location.pathname === '/auth/login' ? <Login /> : <Signup />}
      
      <Footer />
    </section>
  )
}

export default Auth
