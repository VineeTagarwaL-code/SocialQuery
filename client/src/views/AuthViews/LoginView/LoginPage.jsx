import React, { useState, useEffect } from 'react'
import '../Auth.css'
import 'animate.css';

import Navbar from '../../../components/layout/navigation/AuthNav/Navbar'
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
      <Navbar />
      <div className=' w-[screen] h-[100vh] md:w-[60%]   bg-stone-900 flex flex-col flex-nowrap   rounded-r-lg rounded-l-lg md:rounded-r-none md:rounded-l-none overflow-scroll justify-center '>

        <div className='md:mt-12 mt-2  w-[100vw] md:w-[100%]  h-[100vh] flex justify-center flex-col px-4'>
          <div className='flex mb-3'>
            <h1 className=' text-2xl mb-2 md:mb-0 md:text-4xl text-main inter animate__animated animate__fadeInUp'>Welcome To Social Query</h1>
            <span className='text-main  text-2xl md:text-4xl animate__animated animate__fadeInUp '>..</span>
          </div>
          <div className='flex  w[100%] md:w-[90%] md:mb-3 md-1 animate__animated animate__fadeInUp'>
            <h2 className='text-base text-sec inter'>Social-Query is Query management app which lets you manage , store , review all your <br /> and colleagues query at one place</h2>
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

      <div className=' hidden md:visible w-[screen] md:w-[40%] pt-6 md:pt-0 md:pb-0 pb-6 md:flex justify-center items-center flex-col flex-nowrap animate__animated animate__fadeInUp'>
        <img src={query} alt="queries"  />

        <div className='flex flex-nowrap justify-center items-center gap-2 border-1 rounded-sm  border-soild border-stone-300 px-3 py-2
        group cursor-pointer hover:border-transparent custom-hover-effect
        '>

          <h1 className='text-main text-sm md:text-lg  mb-1 group-hover:text-stone-900'>START YOUR JOURNEY</h1>
          <FontAwesomeIcon icon={faArrowRight} className=' text-stone-300 group-hover:text-stone-900' />
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

