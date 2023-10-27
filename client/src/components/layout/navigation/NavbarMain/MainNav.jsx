import React from 'react'
import Button from '../../../../utils/Button/Button'
import './MainNav.css'

import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBox, faUser, faEnvelope, faPen, faPersonChalkboard, faQuestion, faTrash } from '@fortawesome/free-solid-svg-icons'



function MainNav({ text , setQuery }) {
    const navigate = useNavigate();
    function handleLogout(){
        console.log("hello")
        localStorage.clear(); 

        navigate('/login')

    } 
    const firstName = localStorage.getItem("FirstName")
    const lastName = localStorage.getItem("LastName")
    const capitalizedLastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
    console.log(firstName, lastName)

    const fullName = firstName + " " + capitalizedLastName;
    return (
        <>
            <nav id='mainNav'>
                <div className='user inner-content'>
                    <FontAwesomeIcon icon={faUser} style={{ color: "#797979" }} size="lg" />
                    <p id='userName'>{fullName}</p>

                </div>

                <div className='utilities inner-content'>
                    <div>
                        <input type="text" placeholder='Search...'
                         onChange={(e) => { setQuery(e.target.value) }}
                          id='search' className={`${text}`}></input>
                    </div>
                    <div id='btnCont'>
                        <div className='btn2 manage'> <Button text="Manage" icon="cog-outline" /></div>
                        <div className='btn2'onClick={handleLogout}> <Button text="logout" icon="log-out-outline" /></div>

                    </div>

                </div>
            </nav>
            <nav id='mainNavMobileView'>
                <div className='burger'>

                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <div className='utilitiesM'>
                    <input type="text" placeholder='Search...' id='search1' className={`${text}`}></input>
                    <div className='btn2' onClick={handleLogout} > <Button text="logout" icon="log-out-outline" /></div>

                </div>


            </nav>
        </>
    )
}

export default MainNav