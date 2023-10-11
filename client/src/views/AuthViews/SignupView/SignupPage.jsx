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
    <div className='container-fluid Page m-0 p-0'>
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
       
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" id='svg__waves'><path fill="#229ef6" fill-opacity="1" d="M0,224L26.7,234.7C53.3,245,107,267,160,282.7C213.3,299,267,309,320,293.3C373.3,277,427,235,480,224C533.3,213,587,235,640,245.3C693.3,256,747,256,800,224C853.3,192,907,128,960,117.3C1013.3,107,1067,149,1120,186.7C1173.3,224,1227,256,1280,261.3C1333.3,267,1387,245,1413,234.7L1440,224L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"></path></svg>
           
    </section>
</div>

 
  )
}
export default SignupPage;