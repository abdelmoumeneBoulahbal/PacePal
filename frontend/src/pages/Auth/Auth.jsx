import React from 'react'

import './auth.css'

/* Components */
import { Signup } from '../../components/Form/Signup/Signup'
import { Login } from '../../components/Form/Login/Login'
import MiniNav from '../../components/Mininav/MiniNav'
import Footer from '../../layouts/Footer/Footer'

function Auth() {
  return (
    <section className="auth-section">
        <MiniNav></MiniNav>
        <Signup></Signup>
        <Footer/>
    </section>
  )
}

export default Auth