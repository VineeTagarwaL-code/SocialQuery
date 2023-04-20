import React,{useState} from 'react'
import Navbar from '../../components/layout/navigation/NavBar/Navbar'
import Footer from '../../components/layout/navigation/Footer/Footer'
import './MainPage.css'

export default function MainPage() {
 
  return (
    <div className='container-auto'>
     <Navbar/>
     <div className='container body'>
      this is main page
     </div>
    <Footer/>
    </div>
  )
}
