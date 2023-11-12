import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './QuestionList.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faThumbsUp, faCopy , faHeart, faComment, faBars, faUser } from '@fortawesome/free-solid-svg-icons'

import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const customId = "custom-id-yes";


export default function QuestionList({ questionList, isLoggedIn, setQuestionList, getQuestionList }) {

  const questions = questionList
  const url = "http://localhost:8000/";
  const activeUser = localStorage.getItem("User")


  // Create an array to track the toggle state for each item


  const [addRemarksToggled, setAddRemarksToggled] = useState(new Array(questions.length).fill(false));

  const [liked, setLiked] = useState(new Array(questions.length).fill(false)); // Track likes for each item

  const [text, setRemark] = useState("")
  const [validRemark, setValidRemarks] = useState(new Array(questions.length).fill(false))

  const [isRemarkAdded, setIsRemarkAdded] = useState(false);

  const [showRemarks, setShowRemarks] = useState(false);

  const createdBy = localStorage.getItem('User');


  const showRemark = () => {
    if (isLoggedIn) {
      setShowRemarks(!showRemarks)
    } else {
      notify()
    }

  }

  useEffect(() => {
    setTimeout(() => {
      setIsRemarkAdded(false)
    }, 2000)
  }, [isRemarkAdded])

  const handleAddRemark = async (e, id) => {
    console.log("CreatedBy:", createdBy);
    console.log("Text:", text);
    console.log("ID :", id);
    console.log("URL:", `${url}/api/v1/remark`);


    try {
      await axios.post(`http://localhost:8000/api/v1/remark`, {
        text, createdBy, id
      }).then((res) => {
        setIsRemarkAdded(true)
        setRemark("")
        getQuestionList()
        console.log(res)
      })
    } catch (error) {
      setRemark("")
      console.log("remark", error)
    }



  }


  const handleRemarkToggle = (index) => {
    if (isLoggedIn) {
      // Create a copy of the toggle state array
      const updatedToggles = [...addRemarksToggled];
      // Toggle the state for the clicked item
      updatedToggles[index] = !updatedToggles[index];
      // Update the state with the new array
      setAddRemarksToggled(updatedToggles);
    } else {
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

    if (isLoggedIn) {
      try {
        await axios.post(`${url}api/v1/like`, {
          id, user
        }).then((res) => {
          if (res.status == 200) {

            getQuestionList()
          }

          if (res.data.status == 2) {
            alert("already liked")
          }
        })
      } catch (err) {
        console.log("Like Error", err)
      }
    } else {
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
        notifyCopied()
      })
      .catch((error) => {
        console.error('Error copying text to clipboard:', error);
      });
  }


  const notify = () => {
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

  const notifyCopied = () => {
    toast.success('Copied', {
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
    <div className='px-2 md:px-6 pt-16 pb-16 md:pt-20 md:pb-44 max-w-[80vw]  md:mx-auto'>
      {questions.map((item, index) => {
        return (
          <div className=' bg-stone-900 px-3 md:px-6 py-3 flex justify-between mb-5 rounded-lg w-[fit-content] min-w-[300px] md:w-[600px]'>
            <div>
              <h1 className='md:text-xl text-sm text-stone-500 mb-4 inter'>{item.Question}</h1>
              <div className='flex gap-2'>
                <div className='likes px-2 py-1 rounded-lg bg-stone-700 max-w-[40px]' onClick={() => {
                  handleLikeToggle(index,)
                  handleLike(item._id, activeUser)
                }}>
                <FontAwesomeIcon icon={faHeart} style={{ color: "rgb(120, 113, 108)" }} />
                   <p className='text-stone-500 text-xs '>{item.like}</p>
                </div>

                <div className='flex justify-center items-center gap-1 px-2 py-1 rounded-lg bg-stone-700 max-w-[fit-content]' >
                <FontAwesomeIcon icon={faComment } style={{ color: "rgb(120, 113, 108)" }} />
                   <p className='text-stone-500 text-xs hText'>Remarks</p>
                </div>
              
              </div>
            </div>
            <div className=' md:ml-10 ml-5 flex flex-col justify-between'>
              <div className='flex flex-nowrap gap-2 self-end'>
              <div className='flex justify-center items-center gap-2 px-2 py-1 rounded-lg bg-stone-800 max-w-[fit-content]' >
                <FontAwesomeIcon icon={faBars } style={{ color: "rgb(120, 113, 108)" }} size="xs" />
                   <p className='text-stone-600 text-xs md:text-sm hText'>{item.Category}</p>
                </div>
                <div className='flex justify-center items-center gap-2 px-2 py-1 rounded-lg bg-stone-800 max-w-[fit-content]' >
                <FontAwesomeIcon icon={faUser } style={{ color: "rgb(120, 113, 108)" }} size="xs"/>
                   <p className='text-stone-600 text-xs md:text-sm hText'>{item.CreatedBy}</p>
                </div>
              </div>
              <div className='self-end cursor-pointer'  onClick={() => handleClick(item.Question)}>
              <FontAwesomeIcon  style={{ color: "rgb(120, 113, 108)" }} icon={faCopy} />
                </div>
            </div>
          </div>
        )
      })}
    </div>
  );
}
// Previous code 

{/* <div className='container QuestionList px-0 mt-4'>
{questions.map((items, index) => {
  return (
    <div className='container-fluid QuestionCont p-4' key={index}>
      <div id='header__top'>
        <div id='headerLeft'>
          <button className='catBtn Btnb '>{items.Category}</button>
          <button className='crtBtn Btnb'>{items.CreatedBy}</button>
          <p
            className='remarks'
            onClick={() => {
              handleRemarkToggle(index); // Pass the index of the clicked item
            }}
          >
            <FontAwesomeIcon icon={faCirclePlus} style={{ color: "#4f4f4f", }} size="lg" />
          </p>
        </div>

        <p className='likes' onClick={() => {
          handleLikeToggle(index,)
          handleLike(items._id, activeUser)
        }}>

          <FontAwesomeIcon icon={faThumbsUp} style={{ color: "#4f4f4f", }} />

          <span style={{ "color": "blue" }}>{items.like}</span>
        </p>
      </div>

      <h3 className='Question'>{items.Question}</h3>

      <div className='footerQ d-flex justify-content-between'>
        <div className='InfoBtn'>
          {/* <button className='catBtn Btnb me-4'>{items.Category}</button>
          <button className='crtBtn Btnb'>{items.CreatedBy}</button> */}
{/*  </div>
        <button className='copyBtn ' >
          <FontAwesomeIcon style={{ color: "#797979", }} icon={faCopy} />
        </button>
      </div>


    </div>
  );
})}
<ToastContainer />
</div> */}

//

//    {/* ... Rest of your code */}
//    {addRemarksToggled[index] ? (
//     <div id='remarks__cont'>
//       <input
//         type='text'
//         id="remarks__input"
//         placeholder="Enter your remarks"
//         onChange={(e) => {
//           setRemark(e.target.value)
//         }}
//       />

//       <div id='remarks__btnCont'>
//         <p
//           className={`remarks__btn add ${isRemarkAdded ? "added" : ""}`}
//           onClick={(e) => {
//             handleAddRemark(e, items._id);
//           }}
//         >
//           <ion-icon name="add-outline" size="medium" /> {isRemarkAdded ? "Added" : "Add"}
//         </p>
//         <p
//           className='remarks__btn close'
//           onClick={() => {
//             handleRemarkToggle(index);
//           }}
//         >
//           <ion-icon name="close-outline" size="medium" /> Close
//         </p>
//       </div>
//     </div>
//   ) : null}
//   <div>
//     <div id="show__remarksBtn" onClick={() => { showRemark() }}>
//       <ion-icon name="chatbubbles-outline" /><p id='remarks_show'>{items.remarkCounter}</p>
//     </div>
//   </div>
// {
//     showRemarks ? (
//       <div id='remarks_show_cont'>
//         {items.remarks.map((remark, index) => (
//           <div key={index} id='remark__user'>
//             {/* Display the properties of the remark */}
//             <p className="query_remark">{remark.text} - </p>
//             <p className="query_remark">  {remark.createdBy}</p>
//             {/* Add more JSX elements as needed */}
//           </div>
//         ))}
//       </div>
//     ) : null
//   }