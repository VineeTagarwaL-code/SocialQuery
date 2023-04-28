import React,{useState , useEffect} from 'react'
import './LoginPage.css'
import Navbar from '../../components/layout/navigation/NavBar/Navbar'
import Footer from '../../components/layout/navigation/Footer/Footer'
import Login from '../../components/forms/login/login'
import { Link } from 'react-router-dom'

import Loading from '../../utils/Loader/Loading'
import Errors from '../../utils/Errors/Errors'

export default function LoginPage(props) {
    const [isLoading , setIsLoading]= useState(false)
    const [isError , setIsError]= useState(null)

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
                    <h2 className='pb-3'>Agent Login </h2>
                    <h4>Hey login below to proceed !</h4>
                </div>
                <div className='form'>
                <Login 
                setIsError={setIsError}
                setIsLoading={setIsLoading} 
                setIsLoggedIn={props.setIsLoggedIn}
                />  {/* this is just the form  */}
                </div>
                <div className='formFooter'>
                    <h5>Dont have an Account ? <Link to ="/signup" style={{ textDecoration: 'none' }}>Signup !</Link></h5>
                </div>
                {
                isLoading? <Loading/> : null
                }
            </div>
          <div className='error'>
            {
                isError ? <Errors error={isError}/> : null
            }
          </div>
          
        </div>
    )
}
