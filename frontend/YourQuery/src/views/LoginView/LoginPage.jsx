import React from 'react'
import './LoginPage.css'
import Navbar from '../../components/layout/navigation/NavBar/Navbar'
import Footer from '../../components/layout/navigation/Footer/Footer'
import Login from '../../components/forms/login/login'
import { Link } from 'react-router-dom'

export default function LoginPage() {
    return (
        <div className='container-auto d-flex flex-column justify-content-between'>
            <Navbar />
            <div className='container loginForm pt-4 pb-4' >
                <div className='formInfo'>
                    <h2 className='pb-3'>Agent Login </h2>
                    <h4>Hey login below to proceed !</h4>
                </div>
                <div className='form'>
                <Login/>  {/* this is just the form  */}
                </div>
                <div className='formFooter'>
                    <h5>Dont have an Account ? <Link to ="/signup" style={{ textDecoration: 'none' }}>Signup !</Link></h5>
                </div>
            </div>
            <Footer />
        </div>
    )
}
