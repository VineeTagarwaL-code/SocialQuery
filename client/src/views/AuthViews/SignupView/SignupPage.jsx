import React, { useState, useEffect } from 'react'

import '../../AuthViews/Auth.css'
import Navbar from '../../../components/layout/navigation/AuthNav/Navbar'
import Signup from '../../../components/forms/signup/Signup'
import query from '../../../assests/login.png'

import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

function SignupPage(props) {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      setIsError(null)
    }, 4000)
  }, [isError])


  const notify = (text) => {
    toast.error(text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  const notifySignup = (text) => {
    toast.success(text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }



  return (

    <div className=' h-screen w-screen main flex cont overflow-scroll'>
      <Navbar />
      <div className='cont2 w-[screen] md:w-[60%]  bg-stone-900 flex flex-col flex-nowrap px-3 pt-4 pb-4 md:pt-16   rounded-r-lg rounded-l-lg md:rounded-r-none md:rounded-l-none overflow-scroll justify-center '>

        <div className='mt-12'>
          <div className='flex mb-3 mt-[250px] sm:mt-0 '>
            <h1 className=' text-lg md:text-4xl text-main inter animate__animated animate__fadeInUp'>Signup For Social Query</h1>
            <span className='text-main  text-lg md:text-4xl animate__animated animate__fadeInUp ml-1'> ! </span>
          </div>
          <div className='flex  w[100%] md:w-[90%] md:mb-3 md-1 animate__animated animate__fadeInUp'>
            <h2 className='text-base text-sec inter'>Social-Query is Query management app which lets you manage , store , review all your <br /> and colleagues query at one place</h2>
          </div>
          <div className='animate__animated animate__fadeInUp flex  items-center'>
            <Signup
              setIsError={setIsError}
              setIsLoading={setIsLoading}
              setIsLoggedIn={props.setIsLoggedIn}
              notifySignup={notifySignup}
              notify={notify}
            />
          </div>
        </div>





      </div>


      <div className=' w-[screen] md:w-[40%] pt-6 md:pt-0 md:pb-0 pb-6 flex justify-center items-center flex-col flex-nowrap'>
        <img src={query} alt="queries" className='animate__animated animate__fadeInUp' />

        <div className='flex flex-nowrap justify-center items-center gap-2 '>

          <h1 className='text-main text-sm md:text-lg  cursor-none mb-1 underline animate__animated animate__fadeInUp'>Start you Journey now </h1>
          <FontAwesomeIcon icon={faArrowRight} style={{ color: "white" }} className='animate__animated animate__fadeInUp' />
        </div>

      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" />
    </div>
  )
}
export default SignupPage;

