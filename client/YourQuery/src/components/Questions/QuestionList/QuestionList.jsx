import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './QuestionList.css';

export default function QuestionList({questionList ,  setQuestionList , getQuestionList}) {
  
  const questions = questionList
  const url = "http://localhost:8000/";
  const activeUser = localStorage.getItem("User")

  
  // Create an array to track the toggle state for each item


  const [addRemarksToggled, setAddRemarksToggled] = useState(new Array(questions.length).fill(false));

  const [liked, setLiked] = useState(new Array(questions.length).fill(false)); // Track likes for each item

  const [remark, setRemark] = useState("")
  const [validRemark, setValidRemarks] = useState(new Array(questions.length).fill(false))




  
  
  
  const handleAddRemark = async (e) => {
    console.log(remark)
  }


  const handleRemarkToggle = (index) => {
    // Create a copy of the toggle state array
    const updatedToggles = [...addRemarksToggled];
    // Toggle the state for the clicked item
    updatedToggles[index] = !updatedToggles[index];
    // Update the state with the new array
    setAddRemarksToggled(updatedToggles);
  };



  const handleLikeToggle = (index) => {
    // Create a copy of the liked state array
    const updatedLikes = [...liked];
    // Toggle the like state for the clicked item
    updatedLikes[index] = !updatedLikes[index];
    // Update the state with the new array
    setLiked(updatedLikes);
  };



  const handleLike = async (id, user) => {
   
    try {
      await axios.post(`${url}api/v1/like`, {
        id, user
      }).then((res) => {
        if (res.status == 200) {
             
          getQuestionList()
        }

        if(res.data.status==2){
          alert("already liked")
        }
      })
    } catch (err) {
      console.log("Like Error", err)
    }
  }



  const handleValidToggle = (index) => {
    const updatedValid = [...validRemark]

    updatedValid[index] = !updatedValid[index]
    setValidRemarks(updatedValid)
  }



  function handleClick(question) {
    const textToCopy = question;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        // ...
      })
      .catch((error) => {
        console.error('Error copying text to clipboard:', error);
      });
  }



  return (
    <div className='container QuestionList px-0 mt-4'>
      {questions.map((items, index) => {
        return (
          <div className='container-fluid QuestionCont p-4' key={index}>
            <div id='header__top'>
              <p
                className='remarks'
                onClick={() => {
                  handleRemarkToggle(index); // Pass the index of the clicked item
                }}
              >
                <ion-icon name="add-outline" size="medium" /> Add Remarks
              </p>

              <p className='likes' onClick={() => {
                handleLikeToggle(index , )
                handleLike(items._id,activeUser)
              }}>
         
                  <ion-icon name="thumbs-up-outline" size="small" />
              
                {items.like}
              </p>
            </div>

            <h3 className='Question'>{items.Question}</h3>
            <div className='footerQ d-flex justify-content-between mt-4'>
              <div className='InfoBtn'>
                <button className='catBtn Btnb me-4'>{items.Category}</button>
                <button className='crtBtn Btnb'>{items.CreatedBy}</button>
              </div>
              <button className='copyBtn Btnb' onClick={() => handleClick(items.Question)}>
                Copy
              </button>
            </div>
            {/* ... Rest of your code */}
            {addRemarksToggled[index] ? (
              <div id='remarks__cont'>
                <input
                  type='text'
                  id="remarks__input"
                  placeholder="Enter your remarks"
                  onChange={(e) => {
                    if (/^.+$|^.{1,500}$/.test(e.target.value)) {
                      setValidRemarks(true); // Update the state if it matches the pattern
                    } else {
                      setValidRemarks(false)
                    }
                    setRemark(e.target.value)
                  }}
                />
                {
                  !validRemark[index] ? (
                    <p id='error__top'><ion-icon name="alert-circle" className="alert" color="red"></ion-icon>Should not be empty</p>
                  ) : null
                }
                <div id='remarks__btnCont'>
                  <p
                    className='remarks__btn add'
                    onClick={(e) => {
                      handleAddRemark();
                    }}


                  >
                    <ion-icon name="add-outline" size="medium" /> Add
                  </p>
                  <p
                    className='remarks__btn close'
                    onClick={() => {
                      handleRemarkToggle(index);
                    }}
                  >
                    <ion-icon name="close-outline" size="medium" /> Close
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
