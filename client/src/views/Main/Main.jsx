import React from 'react'
import SideBar from '../../components/layout/SideBar/SideBar'
import { ToastContainer, toast } from 'react-toastify';

function Main() {
  return (
    <div className=' h-[calc(100vh-68px)] w-screen main overflow-hidden flex '>
      <SideBar/>
      <div>
        <p>hello</p>
      </div>
    </div>
  )
}

export default Main