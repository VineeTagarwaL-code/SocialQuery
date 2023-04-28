import React , {useState}from 'react'
import './NavBarStyle.css'
import logo from '../../../../assests/logo.png'
import Loading from '../../../../utils/Loader/Loading'
import { useNavigate } from 'react-router-dom';

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
    <nav className="navbar navbar-expand-lg  p-0">
      <div className="container-fluid d-flex  justify-content-between align-items-center  NaVcont">
        <a className="navbar-brand">
          <img src={logo} alt="Bootstrap" className='logo' />
        </a>
        <button className="navbar-toggler navbar-expand-sm" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        {
          props.isLoggedIn
            ?
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex   w-100 justify-content-evenly align-items-center">
              <li className="nav-item userP d-flex ">
                <button className='LoggedAs'>Logged As : </button> <h4 className='m-0 user'>{userName}</h4>
              </li>
              <li className="nav-item">
              <h4 className='NavLogouts m-0' onClick={handleLogoutClick}> Logout</h4>
              </li>
            </ul>
          </div>
            :
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex   w-100 justify-content-evenly">
                <li className="nav-item">
                  <h4 className='NavBtn pb-2' onClick={handleLoginClick}>Login</h4>
                </li>
                <li className="nav-item">
                  <h4 className='NavBtn pb-2' onClick={handleSignUpClick}> Signup</h4>
                </li>
              </ul>
            </div>
        }
     

      </div>
    </nav>
  )
}
