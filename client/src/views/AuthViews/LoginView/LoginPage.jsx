import React, { useState, useEffect } from 'react'
import '../../AuthViews/Auth.css'
import Navbar from '../../../components/layout/navigation/NavBar/Navbar'
import Footer from '../../../components/layout/navigation/Footer/Footer'
import Login from '../../../components/forms/login/Login'
import { Link } from 'react-router-dom'

import Loading from '../../../utils/Loader/Loading'
import Errors from '../../../utils/Errors/Errors'
import Button from '../../../utils/Button/Button'

import Gif from '../../../assests/form.gif'

export default function LoginPage(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(null)

    useEffect(() => {
        setTimeout(() => {
            setIsError(null)
        }, 4000)
    }, [isError])



    return (
        <div className='container-fluid loginPage m-0 p-0'>
            <Navbar />
            <section id="form__cont">
                <div id="form__wrapper">
                <ion-icon name="search" size="large" style={{"marginBottom" : "10px"}}></ion-icon>
         
                <h4><span id='welcome'>Login to use SocialQuery</span> </h4>
           
                <h5 id='info__'>Social-Query is Query management app which lets you manage , store , review all your <br/> and colleagues query at one place</h5>
                <Login 
                setIsError={setIsError}
                setIsLoading={setIsLoading} 
                setIsLoggedIn={props.setIsLoggedIn}
                />  

               
            </div> 
            </section>
            <section id='right__cont'>
                <img src={Gif}/>
              
                <hr style={{"color":"black"}}/>
                <div id='social_ICONSLogin'>
                <ion-icon className="links" name="logo-github" style={{"color":"rgb(76, 76, 76" , "fontSize" :"30px" , "cursor":"pointer" , "marginRight":"10px"}} ></ion-icon>
                <ion-icon name="logo-instagram"  style={{"color":"rgb(76, 76, 76" , "fontSize" :"30px" , "cursor":"pointer" , "marginRight":"10px"}}></ion-icon>
                <ion-icon name="logo-twitter"  style={{"color":"rgb(76, 76, 76" , "fontSize" :"30px" , "cursor":"pointer" , "marginRight":"10px"}}></ion-icon>
                <ion-icon name="logo-linkedin"  style={{"color":"rgb(76, 76, 76" , "fontSize" :"30px" , "cursor":"pointer" , "marginRight":"10px"}}></ion-icon>
                </div>
                <hr/>
            </section>
        </div>
    )
}




{/* <div className='container loginForm pt-4 pb-4' >
                <div className='formInfo'>
                    <h2 className='pb-3'>User Login </h2>
                    <h4>Hey login below to proceed !</h4>
                </div>
                <div className='form'>
              
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
        
        */}