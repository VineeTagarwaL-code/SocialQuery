import React, { useState } from 'react'
import './AuthRoutes.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket, faU, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';


export default function Navbar(props) {

  const userName = localStorage.getItem('User')
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true)


  const handleLoginClick = () => {
    navigate('/login')
  }
  const handleSignUpClick = () => {
    navigate('/signup')
  }
  const handleLogoutClick = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      navigate('/login')
      localStorage.removeItem("SessionId")
      localStorage.removeItem("User")
      window.location.reload();
    }, 2000)

  }
  return (
    <div className=" absolute w-[fit-content] right-0 mt-4  md:mt-10 mr-4 gap-4 flex  top-0 z-50">


      <div onClick={handleLoginClick} className="flex justify-evenly items-center gap-1 md:bg-stone-900 bg-stone-800 px-3 py-1   rounded-md cursor-pointer group">
        <div className='w-[20px]  md:w-[25px]'>
          <FontAwesomeIcon icon={faRightToBracket} style={{ color: "#484848" }} />
        </div>

        <p className='text-sec mb-1 text-sm md:text-base group-hover:text-stone-400 '>Login</p>
      </div>



      <div onClick={handleSignUpClick} className="flex justify-center items-center gap-1 md:bg-stone-900 bg-stone-800 md:px-3 md:py-1 px-2 py-0 rounded-md cursor-pointer group">
        <div className='w-[20px]  md:w-[25px]'>
          <FontAwesomeIcon icon={faUserPlus} style={{ color: "#484848" }} />
        </div>

        <p className='text-sec mb-1 md:text-base group-hover:text-stone-400 text-sm' >Signup</p>
      </div>



    </div>
  )
}


