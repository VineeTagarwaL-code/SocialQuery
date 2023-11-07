import React from 'react'
import './Sidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser , faPlus} from '@fortawesome/free-solid-svg-icons'


function SideBar() {

    const firstName = localStorage.getItem("FirstName")
    const lastName = localStorage.getItem("LastName")

    const capitalizedLastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
    const fullName = firstName + " " + capitalizedLastName;


    return (
        <div className='absolute z-40 max-w-[20vw] w-[20vw] border-solid border-r-[1px] border-stone-800 rounded-medium h-[100%] md:invisible visible top-0 sidebar 
    flex
    flex-col
    py-3 
    px-2
    '>
            <div className='flex w-[fit-content] justify-center items-center gap-9 px-4 py-1'>
                <FontAwesomeIcon icon={faUser} style={{ color: "#6e6e6e" }} size="xl" />
                <h2 className='text-main text-lg'>{fullName}</h2>
            </div>

            <div className='flex  px-4 mt-10'>

                <div className='flex items-center px-2 rounded-sm  bg-stone-900 justify-evenly w-[fit-content] gap-2 group cursor-pointer'>
                    <p className='text-sec mb-1 group-hover:text-stone-500'>Add</p>
                    <FontAwesomeIcon icon={faPlus} style={{color:"#484848"}}  />
                    
                </div>
            </div>


        </div>
    )
}

export default SideBar