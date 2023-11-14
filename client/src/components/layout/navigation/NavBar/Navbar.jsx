import React , {useState}from 'react'
// import './NavBarStyle.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faRightToBracket , faU, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import './AuthRoutes.css'
import logo from '../../../../assests/logo.png'
import Loading from '../../../../utils/Loader/Loading'
import { useNavigate } from 'react-router-dom';
import Button from '../../../../utils/Button/Button';

export default function Navbar(props) {

  const userName = localStorage.getItem('User')
  const navigate = useNavigate();
  const [isLoading , setIsLoading] = useState(true)


  const handleLoginClick = () => {
    navigate('/login')
  }
  const handleSignUpClick = () => {
    navigate('/signup')
  }
  const handleLogoutClick = ()=>{
    setIsLoading(true)
    setTimeout(()=>{
    setIsLoading(false)
    navigate('/login')
    localStorage.removeItem("SessionId")
    localStorage.removeItem("User")
    window.location.reload();
  }, 2000)

  }
  return ( 
    <div className=" absolute w-[fit-content] right-0 mt-4 mr-10 flex gap-10">
      <div onClick={handleLoginClick} className="flex justify-evenly items-center gap-1 bg-stone-900 px-3 py-1 rounded-md cursor-pointer group">
        <div className='  w-[25px]'>
        <FontAwesomeIcon icon={faRightToBracket} style={{ color: "#484848" }}  />
        </div>
    
        <p className='text-sec mb-1 text-base group-hover:text-stone-400'>Login</p>
      </div>

      <div   onClick={handleSignUpClick} className="flex justify-center items-center gap-1 bg-stone-900 px-3 py-1 rounded-md cursor-pointer group">
        <div className='  w-[25px]'>
        <FontAwesomeIcon icon={faUserPlus} style={{ color: "#484848" }}  />
        </div>
    
        <p className='text-sec mb-1 text-base group-hover:text-stone-400'>Signup</p>
      </div>
     
     {/* <div  onClick={handleLoginClick} ><Button icon="log-in" text="Login"/></div> 
     <div  onClick={handleSignUpClick}> <Button icon="person" text="Signup"/></div>  */}
    </div>
  )
}


