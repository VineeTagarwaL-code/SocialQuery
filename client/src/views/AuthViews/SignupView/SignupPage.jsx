import React, { useState, useEffect } from 'react'
import '../../AuthViews/Auth.css'
import Navbar from '../../../components/layout/navigation/NavBar/Navbar'
import Footer from '../../../components/layout/navigation/Footer/Footer'
import Login from '../../../components/forms/login/Login'
import { Link } from 'react-router-dom'
import Signup from '../../../components/forms/signup/Signup'

import Loading from '../../../utils/Loader/Loading'
import Errors from '../../../utils/Errors/Errors'
import Button from '../../../utils/Button/Button'

import Gif from '../../../assests/form.gif'


 function SignupPage(props) {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(null)

  useEffect(()=>{
    setTimeout(()=>{
         setIsError(null)
    }, 4000)
     },[isError])
  return (
    <div className='container-fluid loginPage m-0 p-0'>
    <Navbar />
    <section id="form__cont">
        <div id="form__wrapper">
        <ion-icon name="log-out-outline" size="large" style={{"marginBottom" : "10px"}}></ion-icon>
        <h4><span id='welcome'>Create your account </span> </h4>
        <h5 id='info__'>Social-Query is Query management app which lets you manage , store , review all your <br/> and colleagues query at one place</h5>
        <Signup
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
export default SignupPage;