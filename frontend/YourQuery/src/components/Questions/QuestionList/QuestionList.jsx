import React,{useState , useEffect} from 'react'
import './QuestionList.css'
export default function QuestionList({questionList}) {
  const questions = questionList
   const [isCopied , setIsCopied] = useState(false)
  function handleClick(question){
    const textToCopy  = question
    navigator.clipboard.writeText(textToCopy)
    .then(() => {
    
      // setIsCopied(true)
      // setTimeout(() => {
      //   setIsCopied(false);
      // }, 2000);
    })
    .catch((error) => {
      console.error('Error copying text to clipboard:', error);
    });
  }
  
  function generateVote(){
    let vote = Math.floor(Math.random()*10);
    return vote;
  }
  return (
    <div className='container QuestionList px-0 mt-4'>
     {
      questions.map((items)=>{
        return (
          <div className='container-fluid QuestionCont p-4'>
            <p className='votes'>{generateVote()} Votes</p>
            <h3 className='Question'>{items.Question}</h3>
            <div className='footerQ d-flex justify-content-between mt-4'>
              <div className='InfoBtn'> 
              <button className='catBtn Btnb  me-4'>{items.Category}</button>
              <button className='crtBtn Btnb'>{items.CreatedBy}</button>
              </div>
              <button className='copyBtn Btnb' onClick={() => handleClick(items.Question)}>Copy</button>

          </div>
         </div>
        )
      })
     }
     

    </div>
  )
}
