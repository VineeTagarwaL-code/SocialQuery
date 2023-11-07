import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faRightFromBracket , faFilter , faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
function Navbar() {
  return (
   <header className='relative md:sticky top-0 z-20 bg-main max-w-[100vw] justify-end flex items-center px-2 py-2'>
    <nav className=' max-w-[100vw] md:w-[80vw] w-[100vw] px-2 py-2 md:px-6 flex justify-between '>
        <div className='flex justify-start items-center  max-w-[200px] w-[170px] cursor:pointer ml-3 '>
        <input type='text' 
        placeholder='Search Query...'
        className='w-[120px] md:w-[200px] md:text-base  
        placeholder:text-gray-400 
        focus:outline
        focus:outline-stone-900
        text-sm rounded-md bg-transparent border-solid border-1 border-stone-800 px-2 mr-2 py-1 text-gray-400'
        />
        <FontAwesomeIcon icon={faMagnifyingGlass} style={{color:"#6e6e6e"}} />
        </div>
   
        <ul class=" md:flex  items-center gap-2 flex md:gap-7 ">
               <li className="cursor-pointer px-2 py-1 rounded-lg  hover:bg-stone-800 flex justify-center items-center gap-2 hover:text-white cursor:pointer" >
               <FontAwesomeIcon icon={faFilter} style={{color:"#6e6e6e"}} />
              
               <p className='text-main mb-1 '>Filter</p>
               </li>

               <li className="cursor-pointer px-2 py-1 rounded-lg hover:bg-stone-800 flex justify-center items-center gap-2 hover:text-white cursor:pointer" >
               <FontAwesomeIcon icon={faRightFromBracket} style={{color:"#6e6e6e"}}  />
               <p className='text-main mb-1 text-sm md:text-base'>Logout</p>
               </li>
            </ul>
    </nav>
   </header>
  )
}

export default Navbar