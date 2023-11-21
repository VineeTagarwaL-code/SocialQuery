import React, { useState, useEffect } from 'react'
import '../Auth.css'
import 'animate.css';
import Navbar from '../../../components/layout/navigation/NavBar/Navbar'

import Login from '../../../components/forms/login/Login'

import query from '../../../assests/login.png'
import { ToastContainer, toast } from 'react-toastify';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'




export default function LoginPage(props) {

    const notifyValitdationFailed = () => toast.error(`Validation Failed`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    
    
    
      const notifySuccess = () => toast.success('Login Successfull , Loading...', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    
    
      const notifyFail = (errorText) => toast.error(`${errorText}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });


    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(null)

    useEffect(() => {
        setTimeout(() => {
            setIsError(null)
        }, 4000)
    }, [isError])



    return (
       <div className=' h-screen w-screen main flex cont overflow-scroll'>
        <Navbar/>
      <div className='cont2 w-[screen] md:w-[60%]  bg-stone-900 flex flex-col flex-nowrap px-3 pt-4 pb-4 md:pt-16   rounded-r-lg rounded-l-lg md:rounded-r-none md:rounded-l-none overflow-scroll justify-center '>
    
        <div className='mt-12'>
        <div className='flex mb-3'>
          <h1 className=' text-lg md:text-4xl text-main inter animate__animated animate__fadeInUp'>Welcome To Social Query</h1>
          <span className='text-main  text-lg md:text-4xl animate__animated animate__fadeInUp'>..</span>
        </div>
        <div className='flex  w[100%] md:w-[90%] md:mb-3 md-1 animate__animated animate__fadeInUp'>
          <h2 className='text-base text-sec inter'>Social-Query is Query management app which lets you manage , store , review all your <br/> and colleagues query at one place</h2>
        </div>
        <div className='animate__animated animate__fadeInUp flex  items-center'>
        <Login 
          setIsError={setIsError}
          setIsLoading={setIsLoading} 
          setIsLoggedIn={props.setIsLoggedIn}
          notifyValitdationFailed={notifyValitdationFailed}
          notifySuccess={notifySuccess}
          notifyFail={notifyFail}
         />  
        </div>
        </div>
      
   
      
      </div>
    
      <div className=' w-[screen] md:w-[40%] pt-6 md:pt-0 md:pb-0 pb-6 flex justify-center items-center flex-col flex-nowrap'>
        <img src={query} alt="queries" className='animate__animated animate__fadeInUp'/>
        <h1 className='text-main  text-sm md:text-lg  cursor-none  inter animate__animated animate__fadeInUp'>Interested ?</h1>
        <div className='flex flex-nowrap justify-center items-center gap-2 '>
    
        <h1 className='text-main text-sm md:text-lg  cursor-none mb-1 underline animate__animated animate__fadeInUp'>Start you Journey now </h1>
        <FontAwesomeIcon icon={faArrowRight} style={{color:"white"}} className='animate__animated animate__fadeInUp'/>
        </div>
        
      </div>

      <ToastContainer position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />
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


    //     <div className='container-fluid Page m-0 p-0'>
    //     {/* <Navbar /> */}
    //     <section id="form__cont">
    //         <div id="form__wrapper">
    //         <ion-icon name="search" size="large" style={{"marginBottom" : "10px"}}></ion-icon>
     
    //         <h4><span id='welcome'>Login to use SocialQuery</span> </h4>
       
    //         <h5 id='info__'>Social-Query is Query management app which lets you manage , store , review all your <br/> and colleagues query at one place</h5>
    //         <Login 
    //         setIsError={setIsError}
    //         setIsLoading={setIsLoading} 
    //         setIsLoggedIn={props.setIsLoggedIn}
    //         />  

    // </div> 
    // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" id='svg__Cont'><path fill="#229ef6" fill-opacity="1" d="M0,224L26.7,234.7C53.3,245,107,267,160,282.7C213.3,299,267,309,320,293.3C373.3,277,427,235,480,224C533.3,213,587,235,640,245.3C693.3,256,747,256,800,224C853.3,192,907,128,960,117.3C1013.3,107,1067,149,1120,186.7C1173.3,224,1227,256,1280,261.3C1333.3,267,1387,245,1413,234.7L1440,224L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"></path></svg>

    //     </section>
    //     <section id='right__cont'>
    //         <img src={Gif}/>
          
    //         <hr style={{"color":"black"}}/>
    //         <div id='social_ICONSLogin'>
    //         <ion-icon className="links" name="logo-github" style={{"color":"rgb(76, 76, 76" , "fontSize" :"30px" , "cursor":"pointer" , "marginRight":"10px"}} ></ion-icon>
    //         <ion-icon name="logo-instagram"  style={{"color":"rgb(76, 76, 76" , "fontSize" :"30px" , "cursor":"pointer" , "marginRight":"10px"}}></ion-icon>
    //         <ion-icon name="logo-twitter"  style={{"color":"rgb(76, 76, 76" , "fontSize" :"30px" , "cursor":"pointer" , "marginRight":"10px"}}></ion-icon>
    //         <ion-icon name="logo-linkedin"  style={{"color":"rgb(76, 76, 76" , "fontSize" :"30px" , "cursor":"pointer" , "marginRight":"10px"}}></ion-icon>
    //         </div>
        
       
    //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" id='svg__waves'><path fill="#229ef6" fill-opacity="1" d="M0,224L26.7,234.7C53.3,245,107,267,160,282.7C213.3,299,267,309,320,293.3C373.3,277,427,235,480,224C533.3,213,587,235,640,245.3C693.3,256,747,256,800,224C853.3,192,907,128,960,117.3C1013.3,107,1067,149,1120,186.7C1173.3,224,1227,256,1280,261.3C1333.3,267,1387,245,1413,234.7L1440,224L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"></path></svg>
       
    //     </section>
    // </div>