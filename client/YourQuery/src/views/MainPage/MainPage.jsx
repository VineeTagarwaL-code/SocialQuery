import React, { useState, useEffect } from 'react'
import Navbar from '../../components/layout/navigation/NavBar/Navbar'
import Footer from '../../components/layout/navigation/Footer/Footer'
import './MainPage.css'
import QuestionTop from '../../components/Questions/MainQuestionTop/QuestionTop'
import QuestionList from '../../components/Questions/QuestionList/QuestionList'
import axios from 'axios'


export default function MainPage() {

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



  useEffect(()=>{
    console.log("inside new ")
     if(NewQ){
  
      getQuestionList()
      setIsNewQ(false)
     }
  },[NewQ])


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



  return (
    <div className='container-auto d-flex  flex-column main'>
      <Navbar isLoggedIn={isLoggedIn} />
      <div className='container body mt-5'>
        <QuestionTop setIsNewQ={setIsNewQ} setQuery={setQuery} isLoggedIn={isLoggedIn} setCatReq={setCatReq} getQuery={getQuery} />
        <QuestionList questionList={questionList} getQuestionList={getQuestionList}/>
      </div>
      <Footer />

    </div>
  )
}
