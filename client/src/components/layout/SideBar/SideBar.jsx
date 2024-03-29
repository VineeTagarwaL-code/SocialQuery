import React from 'react'
import './Sidebar.css'
import 'animate.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPlus, faLayerGroup, faQuestion, faFilter, faPen, faBars, faLink, faCodePullRequest, faUserSecret } from '@fortawesome/free-solid-svg-icons'


function SideBar({ handleCatShow , catShow , categories , handleCatClick}) {

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
    
    overflow-scroll
    '>
            <div className='flex w-[fit-content] justify-center items-center gap-3 px-4 md:px-2 py-1 mt-1'>
                <FontAwesomeIcon icon={faUser} style={{ color: "#6e6e6e" }} size="md" />
                <h2 className='text-main text-sm md:text-lg'>{fullName}</h2>
            </div>

            <div className='flex  px-4 mt-10'>

                <div className='flex flex-col'>
                    <div className='flex items-center px-2 rounded-sm  bg-stone-900 justify-evenly w-[fit-content] gap-2 group cursor-pointer mb-3' >
                        <p className='text-sec mb-1 group-hover:text-stone-500'>Add</p>
                        <FontAwesomeIcon icon={faPlus} style={{ color: "#484848" }} />
                    </div>

                    <div className='flex flex-col gap-3'>

                        <div className='flex items-center px-4 rounded-lg  group hover:bg-stone-900 justify-evenly w-[fit-content]  group cursor-pointer' data-bs-toggle="modal" data-bs-target="#CategoryModal">
                            <div className="w-[30px]">
                                <FontAwesomeIcon icon={faLayerGroup} style={{ color: "#484848" }} />
                            </div>


                            <p className='text-sec mb-1 group-hover:text-stone-500 text-base'>Category</p>
                        </div>
                        <div className='flex items-center px-4 rounded-lg  group hover:bg-stone-900  w-[fit-content]  group cursor-pointer' data-bs-toggle="modal" data-bs-target="#QuestionModal">

                            <div className="w-[30px] pl-1">
                                <FontAwesomeIcon icon={faQuestion} style={{ color: "#484848" }} />
                            </div>

                            <p className='text-sec mb-1 group-hover:text-stone-500 text-base'>Question</p>
                        </div>

                    </div>


                </div>




            </div>


            <div className='flex  px-4 mt-10'>

                <div className='flex flex-col'>
                    <div className='flex items-center px-2 rounded-sm  bg-stone-900 justify-evenly w-[fit-content] gap-2 group cursor-pointer mb-3'>
                        <p className='text-sec mb-1 group-hover:text-stone-500'>Filter</p>
                        <FontAwesomeIcon icon={faFilter} style={{ color: "#484848" }} />
                    </div>

                    <div className='flex flex-col gap-3'>

                        <div className='flex items-center px-4 rounded-lg  group hover:bg-stone-900 justify-evenly w-[fit-content]  group cursor-pointer' onClick={handleCatShow}>
                            <div className="w-[30px]">
                                <FontAwesomeIcon icon={faBars} style={{ color: "#484848" }} />
                            </div>


                            <p className='text-sec mb-1 group-hover:text-stone-500 text-base'>Category</p>

                          
                        </div>
                        {
                                catShow ? (
                                    <div className=' w-[250px] ml-6 flex flex-wrap gap-2 animate__animated animate__fadeIn'>

                                        {
                                            categories.map((item) => {
                                                return (
                                                    <button className='text-stone-600 text-sm px-2 py-1 bg-stone-900 rounded-lg cursor-pointer' key={item.id} onClick={() => handleCatClick(item.Cat_name)}>{item.Cat_name}</button>
                                                )
                                            })

                                        }

                                    </div>
                                ) : ""
                            }

                        <div className='flex items-center px-4 rounded-lg  group hover:bg-stone-900  w-[fit-content]  group cursor-pointer'>

                            <div className="w-[30px] ">
                                <FontAwesomeIcon icon={faPen} style={{ color: "#484848" }} />
                            </div>

                            <p className='text-sec mb-1 group-hover:text-stone-500 text-base'>Text</p>
                        </div>

                    </div>


                </div>






            </div>


            <div className='flex  px-4 mt-10 '>

                <div className='flex flex-col'>
                    <div className='flex items-center px-2 rounded-sm  bg-stone-900 justify-evenly w-[fit-content] gap-2 group cursor-pointer mb-3'>
                        <p className='text-sec mb-1 group-hover:text-stone-500'>Link</p>
                        <FontAwesomeIcon icon={faLink} style={{ color: "#484848" }} />
                    </div>

                    <div className='flex flex-col gap-3'>

                        <div className='flex items-center px-4 rounded-lg  group hover:bg-stone-900 justify-evenly w-[fit-content]  group cursor-pointer'>
                            <div className="w-[30px]">
                                <FontAwesomeIcon icon={faCodePullRequest} style={{ color: "#484848" }} />

                            </div>


                            <a className='text-sec mb-1 group-hover:text-stone-500 text-base' href="https://github.com/VineeTagarwaL-code/SocialQuery" target='_blank'>Github</a>
                        </div>
                        <div className='flex items-center px-4 rounded-lg  group hover:bg-stone-900  w-[fit-content]  group cursor-pointer'>

                            <div className="w-[30px] ">
                                <FontAwesomeIcon icon={faUserSecret} style={{ color: "#484848" }} />
                            </div>

                            <a className='text-sec mb-1 group-hover:text-stone-500 text-base' href="https://github.com/VineeTagarwaL-code" target='_blank'>Creator</a>
                        </div>

                    </div>


                </div>






            </div>

        </div>
    )
}

export default SideBar