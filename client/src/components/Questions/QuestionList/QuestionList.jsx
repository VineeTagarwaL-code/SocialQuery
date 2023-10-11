import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './QuestionList.css';


import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const customId = "custom-id-yes";


export default function QuestionList({questionList ,isLoggedIn,  setQuestionList , getQuestionList}) {
  
  const questions = questionList
  const url = "http://localhost:8000/";
  const activeUser = localStorage.getItem("User")

  
  // Create an array to track the toggle state for each item


  const [addRemarksToggled, setAddRemarksToggled] = useState(new Array(questions.length).fill(false));

  const [liked, setLiked] = useState(new Array(questions.length).fill(false)); // Track likes for each item

  const [text, setRemark] = useState("")
  const [validRemark, setValidRemarks] = useState(new Array(questions.length).fill(false))

  const [isRemarkAdded , setIsRemarkAdded] = useState(false);

  const[showRemarks , setShowRemarks] = useState(false);
  
  const createdBy = localStorage.getItem('User');
  

  const showRemark = ()=>{
    if(isLoggedIn){
      setShowRemarks(!showRemarks)
    }else{
      notify()
    }
  
  }

  useEffect(()=>{
    setTimeout(()=>{
      setIsRemarkAdded(false)
    },2000)
  },[isRemarkAdded])

  const handleAddRemark = async (e , id) => {
    console.log("CreatedBy:", createdBy);
    console.log("Text:", text);
    console.log("ID :" , id);
    console.log("URL:", `${url}/api/v1/remark`);


      try{
        await axios.post(`http://localhost:8000/api/v1/remark` , {
          text , createdBy , id
        }).then((res)=>{
          setIsRemarkAdded(true)
          setRemark("")
          getQuestionList()
          console.log(res)
        })
      }catch(error){
        setRemark("")
        console.log("remark" , error)
      }
  
  

  }


  const handleRemarkToggle = (index) => {
    if(isLoggedIn){
    // Create a copy of the toggle state array
    const updatedToggles = [...addRemarksToggled];
    // Toggle the state for the clicked item
    updatedToggles[index] = !updatedToggles[index];
    // Update the state with the new array
    setAddRemarksToggled(updatedToggles);
    }else{
      notify()
    }

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
   
   if(isLoggedIn){
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
   }else{
    notify()
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


  const notify = () =>{
    toast.error('Please Login / Signup ', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      toastId: customId
      });
  };


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
                <ion-icon name="add-outline" size="medium" id="remarks__icon" /> Add Remarks
              </p>

              <p className='likes' onClick={() => {
                handleLikeToggle(index , )
                handleLike(items._id,activeUser)
              }}>
         
                  <ion-icon name="thumbs-up-outline" size="small" />
              
                <span style={{"color":"blue"}}>{items.like}</span>
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
                    setRemark(e.target.value)
                  }}
                />
             
                <div id='remarks__btnCont'>
                  <p
                    className={`remarks__btn add ${isRemarkAdded ? "added" : ""}`}
                    onClick={(e) => {
                      handleAddRemark(e,items._id);
                    }}
                  >
                    <ion-icon name="add-outline" size="medium" /> {isRemarkAdded ? "Added" : "Add"}
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
            <div>
                <div id="show__remarksBtn" onClick={()=>{showRemark()}}>
                <ion-icon name="chatbubbles-outline"/><p id='remarks_show'>{items.remarkCounter}</p>
                </div>
            </div>
            {
            showRemarks ? (
              <div id='remarks_show_cont'>
                {items.remarks.map((remark, index) => (
                  <div key={index} id='remark__user'>
                    {/* Display the properties of the remark */}
                    <p className="query_remark">{remark.text} - </p>
                    <p className="query_remark">  {remark.createdBy}</p>
                    {/* Add more JSX elements as needed */}
                  </div>
                ))}
              </div>
            ) : null      
            }
          </div>
        );
      })}
      <ToastContainer/>
    </div>
  );
}