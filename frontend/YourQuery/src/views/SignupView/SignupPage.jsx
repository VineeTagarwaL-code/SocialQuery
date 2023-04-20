import React from 'react'
import Navbar from '../../components/layout/navigation/NavBar/Navbar'
import Footer from '../../components/layout/navigation/Footer/Footer'
import Login from '../../components/forms/login/login'
export default function SignupPage() {
  return (
    <div className='container-auto d-flex flex-column justify-content-between'>
    <Navbar />
    <div className='container loginForm pt-4 pb-4' >
        <div className='formInfo'>
            <h2 className='pb-3'>Agent Signup </h2>
            <h4>Hey Signup below to proceed !</h4>
        </div>
        <div className='form'>
        <Login/>  {/* this is just the form  */}
        </div>
        <div className='formFooter'>
            <h5>Go back to Login ? </h5>
        </div>
    </div>
    <Footer />
</div>
  )
}
