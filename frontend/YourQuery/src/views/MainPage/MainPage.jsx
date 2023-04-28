import React,{useState , useEffect} from 'react'
import Navbar from '../../components/layout/navigation/NavBar/Navbar'
import Footer from '../../components/layout/navigation/Footer/Footer'
import './MainPage.css'

export default function MainPage() {
  const [isLoggedIn , setIsLoggedIn] = useState(false)
   useEffect(()=>{
    const id = localStorage.getItem("SessionId")
    if(id != null){
     setIsLoggedIn(true)
    }
   })
  return (
    <div className='container-auto d-flex  flex-column'>
        <Navbar isLoggedIn= { isLoggedIn}/>
     <div className='container body'>
 
     </div>
    <Footer/>
    </div>
  )
}
