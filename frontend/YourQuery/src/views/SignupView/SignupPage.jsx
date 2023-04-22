import React,{useState} from 'react'
import Navbar from '../../components/layout/navigation/NavBar/Navbar'


import Signup from '../../components/forms/signup/Signup'
import Loading from '../../utils/Loader/Loading'


export default function SignupPage(props) {
  const [isLoading , setIsLoading]= useState(false)
  return (
    <div className='container-auto d-flex flex-column justify-content-between'>
    <Navbar />
    <div className='container loginForm pt-4 pb-4' >
        <div className='formInfo'>
            <h2 className='pb-3'>Agent Signup </h2>
            <h4>Hey Signup below to proceed !</h4>
        </div>
        <div className='form'>
        <Signup setIsLoading = {setIsLoading} setIsLoggedIn={props.setIsLoggedIn}/>  {/* this is just the form  */}
        </div>
    
    </div>
    {
                isLoading? <Loading/> : null
            }
</div>
  )
}
