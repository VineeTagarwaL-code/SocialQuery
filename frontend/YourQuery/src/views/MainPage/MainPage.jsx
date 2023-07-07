import React, { useState, useEffect } from 'react'
import Navbar from '../../components/layout/navigation/NavBar/Navbar'
import Footer from '../../components/layout/navigation/Footer/Footer'
import './MainPage.css'
import QuestionTop from '../../components/Questions/MainQuestionTop/QuestionTop'
import QuestionList from '../../components/Questions/QuestionList/QuestionList'
import axios from 'axios'


export default function MainPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [questionList, setQuestionList] = useState([])

  //query inputted by user to be used a regex in the databse 

  const [query, setQuery] = useState("")



  const [NewQ, setIsNewQ] = useState(false)






  
  const getQuestionList = async () => {
    try {
      await axios.get("http://localhost:8000/getQuestion").then((res) => {
        setQuestionList(res.data.response)

      })
    } catch (e) {
      console.error(e)
    }
  }







  if (NewQ) {
    getQuestionList()
    setIsNewQ(false)
  }

  // useEffect(() => {
  //   getQueryList()
  // }, [query])



  useEffect(() => {
    const id = localStorage.getItem("SessionId")
    getQuestionList()
    if (id != null) {
      setIsLoggedIn(true)
    }
  }, [])

  const getQuery= async ()=>{ 
    try {
      axios.get('http://localhost:8000/getQuery', { params: { query: query } }).then((res) => {

      setQuestionList(res.data.response)
   
   
  })
    } catch (e) {
      console.error(e)
    }
  }
  useEffect(()=>{
    getQuery()
  } , [query])
  return (
    <div className='container-auto d-flex  flex-column main'>
      <Navbar isLoggedIn={isLoggedIn} />
      <div className='container body mt-5'>
        <QuestionTop setIsNewQ={setIsNewQ} setQuery={setQuery} isLoggedIn = {isLoggedIn} />
        <QuestionList questionList={questionList} />
      </div>
      <Footer />

    </div>
  )
}
