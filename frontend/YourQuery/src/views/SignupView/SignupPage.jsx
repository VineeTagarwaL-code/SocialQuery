import React, { useState, useEffect } from 'react'
import Navbar from '../../components/layout/navigation/NavBar/Navbar'
import '../LoginView/LoginPage.css'

import Signup from '../../components/forms/signup/Signup'
import Loading from '../../utils/Loader/Loading'
import Errors from '../../utils/Errors/Errors'


export default function SignupPage(props) {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(null)

  useEffect(()=>{
    setTimeout(()=>{
         setIsError(null)
    }, 4000)
     },[isError])
  return (
    <div className='container-fluid d-flex flex-column justify-content-between loginPage'>
      <Navbar />
      <div className='container loginForm pt-4 pb-4' >
        <div className='formInfo'>
          <h2 className='pb-3'>Agent Signup </h2>
          <h4>Hey Signup below to proceed !</h4>
        </div>
        <div className='form'>
          <Signup
            setIsError={setIsError}
            setIsLoading={setIsLoading}
            setIsLoggedIn={props.setIsLoggedIn}
          />  {/* this is just the form  */}
        </div>
        {
          isLoading ?<Loading />: null
        }
      </div>
      <div className='error'>
        {
          isError ? <Errors error={isError} /> : null
        }
      </div>

    </div>
  )
}
