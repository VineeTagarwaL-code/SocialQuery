import React, { useState, useEffect } from 'react'
import Navbar from '../../components/layout/navigation/NavBar/Navbar'
import Footer from '../../components/layout/navigation/Footer/Footer'
import './MainPage.css'
import QuestionTop from '../../components/Questions/MainQuestionTop/QuestionTop'
import QuestionList from '../../components/Questions/QuestionList/QuestionList'
import axios from 'axios'
import MainNav from '../../components/layout/navigation/NavbarMain/MainNav'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBox, faUser ,faEnvelope, faPen, faPersonChalkboard, faQuestion , faTrash } from '@fortawesome/free-solid-svg-icons'

import flower from '../../assests/flower.png'

export default function MainPage() {
  const[text , setClickedText]  = useState("")

  const searchTextClicked = ()=>{
     setClickedText("click")
     setTimeout(()=>{
      setClickedText("")
     },3000)
  }
  const URL = "http://localhost:8000"
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [questionList, setQuestionList] = useState([])

  //query inputted by user to be used a regex in the databse 

  const [query, setQuery] = useState("")
  const [NewQ, setIsNewQ] = useState(false)//for the new question added by the user
  const [catReq, setCatReq] = useState("")//for the category request of the user


  //primary function for fetching the question from the database
  const getQuestionList = async () => {

    try {
      await axios.get(`${URL}/api/v1/query`).then((res) => {
        setQuestionList(res.data.response)
      })
    } catch (e) {
      console.error(e)
    }
  }



  useEffect(() => {
    console.log("inside new ")
    if (NewQ) {

      getQuestionList()
      setIsNewQ(false)
    }
  }, [NewQ])


  //the primary useEffect for the fetching the credentials from localstorage
  useEffect(() => {
    const id = localStorage.getItem("SessionId")
    getQuestionList()
    if (id != null) {
      setIsLoggedIn(true)
    }
  }, [])


  //for fetching the query matching the regex exp of the input field in QuestionTop.jsx
  const getQuery = async () => {
    try {
      axios.get(`${URL}/api/v1/regEx`, { params: { query: query } }).then((res) => {
        setQuestionList(res.data.response)


      })
    } catch (e) {
      console.error(e)
    }
  }


  //for fetching the query matching the category buttons in QuestionTop.jsx
  const CatReqQuery = async () => {
    try {
      await axios.get(`${URL}/api/v1/catQuery`, { params: { catName: catReq } }).then((res) => {
        setQuestionList(res.data.response)
      })
    } catch (e) {
      console.log(e)
    }
  }

  //useEffect for calling the function on updation
  useEffect(() => {
    getQuery()
  }, [query])

  useEffect(() => {

    CatReqQuery()
  }, [catReq])

  const firstName = localStorage.getItem("FirstName")
    const lastName = localStorage.getItem("LastName")
    const capitalizedLastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
    console.log(firstName , lastName)
     
    const fullName = firstName + " " + capitalizedLastName;

  return (
    <div className='container-auto d-flex  flex-column main'>
      <MainNav text={text}/>
      <div id='mainCont'>
        <aside id='sidebar'>
        <div id="sidebarSec1" className='sidebarSec userSec'>
            <h5 id='listHeader'>User</h5>
            <div className="listItemsUl">
              <div className="listItems">
                <FontAwesomeIcon icon={faUser} style={{ color: "#292929" }} size="lg" />
                <p className='item' id='q'>{fullName}</p>
              </div>
             
            </div>
          </div>
          <div id="sidebarSec1" className='sidebarSec'>
            <h5 id='listHeader'>ADD</h5>
            <div className="listItemsUl">
              <div className="listItems">
                <FontAwesomeIcon icon={faQuestion} style={{ color: "#797979" }} size="lg" />
                <p className='item' id='q'>Question</p>
              </div>
              <div className="listItems">
                <FontAwesomeIcon icon={faBars} style={{ color: "#797979" }} size="lg" />
                <p className='item'>Category</p>
              </div>
            </div>
          </div>
          <div id="sidebarSec2" className='sidebarSec'>
            <h5 id='listHeader'>Sort</h5>
            <div className="listItemsUl">
              <div className="listItems" onClick={searchTextClicked}>
                <FontAwesomeIcon icon={faPen} style={{ color: "#797979" }} size="lg" />
                <p className='item' id='q'>Text</p>
              </div>
              <div className="listItems">
                <FontAwesomeIcon icon={faBox} style={{ color: "#797979" }} size="lg" />
                <p className='item'>Category</p>
              </div>
            </div>
          </div>
          <div id="sidebarSec2" className='sidebarSec'>
            <h5 id='listHeader'>Manage</h5>
            <div className="listItemsUl">
              <div className="listItems">
                <FontAwesomeIcon icon={faPersonChalkboard} style={{ color: "#797979" }} size="lg" />
                <p className='item' id='q'>Admin Panel</p>
              </div>
              <div className="listItems">
                <FontAwesomeIcon icon={faTrash} style={{ color: "#797979" }} size="lg" />
                <p className='item'>Delete Account</p>
              </div>
            </div>
          </div>
          <img src={flower} id='flower'/>
        </aside>
        <div id='QueryList'>
        
        </div>
      </div>

      {/* <div className='container body mt-5'>
        <QuestionTop setIsNewQ={setIsNewQ} setQuery={setQuery} isLoggedIn={isLoggedIn} setCatReq={setCatReq} getQuery={getQuery} />
        <QuestionList isLoggedIn={isLoggedIn} questionList={questionList} getQuestionList={getQuestionList}/>
      </div> */}
      <Footer />

    </div>
  )
}
