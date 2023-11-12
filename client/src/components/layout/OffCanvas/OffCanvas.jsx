import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPlus, faLayerGroup, faQuestion, faFilter, faPen, faBars, faLink, faCodePullRequest, faUserSecret } from '@fortawesome/free-solid-svg-icons'
import 'animate.css';

function OffCanvas({ handleCatShow , catShow , categories , handleCatClick}) {

    const firstName = localStorage.getItem("FirstName")
    const lastName = localStorage.getItem("LastName")

    const capitalizedLastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
    const fullName = firstName + " " + capitalizedLastName;


    return (
        <div className="offcanvas offcanvas-start bg-stone-900 max-w-[80vw]" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">

            <div className="offcanvas-header">
                <div className="offcanvas-title text-main" id="offcanvasExampleLabel">
                    <div className='flex w-[fit-content] justify-center items-center gap-3 md:px-2 py-1 mt-1'>
                        <FontAwesomeIcon icon={faUser} style={{ color: "#6e6e6e" }} size="xl" />
                        <h2 className='text-main text-2xl '>{fullName}</h2>
                    </div>
                </div>
                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>

            <div className="offcanvas-body flex  px-4 mt-10 flex-col ">
                <div className='flex flex-col mb-16'>
                    <div className='flex items-center px-2 py-1 rounded-sm  bg-stone-800 justify-evenly w-[fit-content] gap-2 group cursor-pointer mb-3' >
                        <p className='  text-stone-500'>Add</p>
                        <FontAwesomeIcon icon={faPlus} style={{ color: "rgb(120 ,113 ,108) " }} size="lg" />
                    </div>

                    <div className='flex flex-col gap-3'>

                        <div className='flex items-center px-4 rounded-lg  justify-evenly w-[fit-content]  group cursor-pointer' data-bs-toggle="modal" data-bs-target="#CategoryModal">
                            <div className="w-[40px]">
                                <FontAwesomeIcon icon={faLayerGroup} style={{ color: "rgb(120 ,113 ,108) " }} size="lg" />
                            </div>


                            <p className=' mb-1 text-stone-500 text-xl'>Category</p>
                        </div>
                        <div className='flex items-center px-4 rounded-lg  group hover:bg-stone-900  w-[fit-content]  group cursor-pointer' data-bs-toggle="modal" data-bs-target="#QuestionModal">

                            <div className="w-[40px] pl-1">
                                <FontAwesomeIcon icon={faQuestion} style={{ color: "rgb(120 ,113 ,108) " }} size="lg" />
                            </div>

                            <p className='mb-1 text-stone-500 text-xl'>Question</p>
                        </div>

                    </div>


                </div>


                <div className='flex flex-col mb-16'>
                    <div className='flex items-center px-2 py-1 rounded-sm  bg-stone-800 justify-evenly w-[fit-content] gap-2 group cursor-pointer mb-3' >
                        <p className='  text-stone-500'>Filter</p>
                        <FontAwesomeIcon icon={faFilter} style={{ color: "rgb(120 ,113 ,108) " }} size="lg" />
                    </div>

                    <div className='flex flex-col gap-3'>

                        <div className='flex items-center px-4 rounded-lg  justify-evenly w-[fit-content]  group cursor-pointer'  onClick={handleCatShow}>
                            <div className="w-[40px]">
                                <FontAwesomeIcon icon={faBars} style={{ color: "rgb(120 ,113 ,108) " }} size="lg" />
                            </div>


                            <p className=' mb-1 text-stone-500 text-xl'>Category</p>
                        
                        
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

                        <div className='flex items-center px-4 rounded-lg  group hover:bg-stone-900  w-[fit-content]  group cursor-pointer' >

                            <div className="w-[40px] ">
                                <FontAwesomeIcon icon={faPen} style={{ color: "rgb(120 ,113 ,108) " }} size="lg" />
                            </div>

                            <p className='mb-1 text-stone-500 text-xl'>Text</p>
                        </div>

                    </div>


                </div>



                <div className='flex flex-col mb-16'>
                    <div className='flex items-center px-2 py-1 rounded-sm  bg-stone-800 justify-evenly w-[fit-content] gap-2 group cursor-pointer mb-3' >
                        <p className='  text-stone-500'>Link</p>
                        <FontAwesomeIcon icon={faLink} style={{ color: "rgb(120 ,113 ,108) " }} size="lg" />
                    </div>

                    <div className='flex flex-col gap-3'>

                        <div className='flex items-center px-4 rounded-lg  justify-evenly w-[fit-content]  group cursor-pointer' >
                            <div className="w-[40px]">
                                <FontAwesomeIcon icon={faCodePullRequest} style={{ color: "rgb(120 ,113 ,108) " }} size="lg" />
                            </div>


                            <p className=' mb-1 text-stone-500 text-xl'>Github</p>
                        </div>
                        <div className='flex items-center px-4 rounded-lg  group hover:bg-stone-900  w-[fit-content]  group cursor-pointer' >

                            <div className="w-[40px]">
                                <FontAwesomeIcon icon={faUserSecret} style={{ color: "rgb(120 ,113 ,108) " }} size="lg" />
                            </div>

                            <p className='mb-1 text-stone-500 text-xl'>Creator</p>
                        </div>

                    </div>


                </div>

            </div>

        </div>
    )
}

export default OffCanvas