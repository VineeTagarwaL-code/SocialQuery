import React from 'react'
import './NavBarStyle.css'
import logo from '../../../../assests/logo.png'


export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg  p-0">
      <div className="container-fluid d-flex  justify-content-between align-items-center  NaVcont">
        <a className="navbar-brand">
          <img src={logo} alt="Bootstrap" className='logo' />
        </a>
        <button className="navbar-toggler navbar-expand-sm" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex   w-100 justify-content-evenly">
            <li className="nav-item">
             <h4 className='NavBtn pb-2'>Login</h4> 
            </li>
            <li className="nav-item">
            <h4 className='NavBtn pb-2'> Signup</h4> 
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
