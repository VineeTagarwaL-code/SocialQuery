import React from 'react'
import './QuestionList.css'
export default function QuestionList({questionList}) {
  const questions = questionList
  
  return (
    <div className='container QuestionList px-0 mt-4'>
     {
      questions.map((items)=>{
        return (
          <div className='container-fluid QuestionCont p-4'>
            <p className='votes'>2 Votes</p>
            <h3 className='Question'>{items.Question}</h3>
            <div className='footerQ d-flex justify-content-between mt-4'>
              <div className='InfoBtn'> 
              <button className='catBtn Btnb  me-4'>{items.Category}</button>
              <button className='crtBtn Btnb'>{items.CreatedBy}</button>
              </div>
              <button className='copyBtn Btnb' >Copy</button>
              
          </div>
         </div>
        )
      })
     }
     

    </div>
  )
}
