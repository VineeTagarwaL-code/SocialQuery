import React, { useState, useEffect } from 'react'
import Navbar from '../../components/layout/navigation/NavBar/Navbar'
import Footer from '../../components/layout/navigation/Footer/Footer'
import './MainPage.css'

import QuestionList from '../../components/Questions/QuestionList/QuestionList'
import axios from 'axios'
import MainNav from '../../components/layout/navigation/NavbarMain/MainNav'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBox, faUser, faEnvelope, faPen, faPersonChalkboard, faQuestion, faTrash } from '@fortawesome/free-solid-svg-icons'

import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import flower from '../../assests/flower.png'

export default function MainPage() {
  const [text, setClickedText] = useState("")

  const searchTextClicked = () => {
    setClickedText("click")
    setTimeout(() => {
      setClickedText("")
    }, 3000)
  }
  const URL = "http://localhost:8000"
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [questionList, setQuestionList] = useState([])


  const [categories, setCategories] = useState([])

  const [question, setQuestion] = useState("")
  const [cat, setCat] = useState("Security")



  const [IsQuestionAdded, setIsQuestionAdded] = useState(false)
  const [IsQuestionExists, setIsQuestionExists] = useState(false)

  const [IsCategoryAdded, setIsCategoryAdded] = useState(false)
  const [catShow, setCatShow] = useState(false)

  const [AddCat, setAddCat] = useState("")
  //query inputted by user to be used a regex in the databse 

  const [query, setQuery] = useState("")
  const [NewQ, setIsNewQ] = useState(false)//for the new question added by the user
  const [catReq, setCatReq] = useState("")//for the category request of the user



  const getQuestionList = async () => {
    try {
      await axios.get(`${URL}/api/v1/query`).then((res) => {
        console.log("question", res)
        setQuestionList(res.data.response)
      })
    } catch (e) {
      console.error(e)
    }
  }



  useEffect(() => {
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


  const handleSelect = (e) => {
    setCat(e.target.value)
  }

  const optionItems = categories.map((category) => (
    <option key={category._id} value={category.Cat_name}   >
      {category.Cat_name}
    </option>
  ));




  const role = localStorage.getItem("Role")
  const user = localStorage.getItem("FirstName")


  let approve;

  if (role === "User") {
    approve = false
  } else {
    approve = true
  }


  const setQuestionAdded = () => {
    setTimeout(() => {
      setQuestion("")
      setIsQuestionAdded(false)
    }, 2000);
  }

  const setQuestionExists = () => {
    setTimeout(() => {
      setIsQuestionExists(false)
      setQuestion("")
    }, 2000);
  }

  let userlogged = true;
  //saving the question added by the user 
  const handleSaveQ = async () => {

    if (isLoggedIn) {
      try {

        await axios.post(`${URL}/api/v1/query`, {
          question, cat, approve, user
        }).then((res) => {

          if (res.status === 201) {

            setIsQuestionAdded(true)
            setIsNewQ(true)
            setQuestionAdded()


          } else if (res.status === 200) {
            setIsQuestionExists(true)
            setQuestionExists()

          }
        })
      } catch (e) {
        console.error(e)
      }
    } else {
      userlogged = false;
    }

  }

  const notifyQuestionAdded = () => {
    toast.success('Question Added', {
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



  //handling the change in state 
  const handleTextChange = (e) => {

    setQuestion(e.target.value)

  }


  ///


  // getting the categories 
  const getCategories = async () => {
    try {
      await axios.get(`${URL}/api/v1/category`).then((res) => {
        if (res.status == 201) {
          setCategories(res.data.response)
        } else {
          console.log(res)
        }

      })
    } catch (e) {
      console.error(e)
    }
  }


  function handleCatShow() {
    setCatShow(!catShow)
  }

  useEffect(() => {
    getCategories()
    setIsCategoryAdded(false)
  }, [IsCategoryAdded])

  const handleCatClick = (Cat_name) => {
    setCatReq(Cat_name);
  }


  const handleSaveCat = async () => {
    //will be sending a backend request soon 
    if (isLoggedIn) {
      try {
        await axios.post(`${URL}/api/v1/category`, {
          AddCat
        }).then((res) => {
          if (res.status === 201) {
            console.log(res)
            setIsCategoryAdded(true)


          } else if (res.status === 302) {
            console.log(res)
          }
        })
      } catch (e) {
        console.error(e)
      }
    } else {
      userlogged = false;
    }
  }
  const firstName = localStorage.getItem("FirstName")
  const lastName = localStorage.getItem("LastName")
  const capitalizedLastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);


  const fullName = firstName + " " + capitalizedLastName;

  return (
    <div className='container-auto d-flex  flex-column main'>
      <ToastContainer />
      <MainNav text={text} setQuery={setQuery} />
      <div id='mainCont'>


        <aside id='sidebar'>
          <div id="sidebarSec1" className='sidebarSec userSec'>
            <h5 id='listHeader'>User</h5>
            <div className="listItemsUl">
              <div className="listItems">
                <FontAwesomeIcon icon={faUser} style={{ color: "#292929" }} size="lg" />
                <p className='item' id='q'>{fullName ? fullName : ""}</p>
              </div>

            </div>
          </div>
          <div id="sidebarSec1" className='sidebarSec'>
            <h5 id='listHeader'>Add</h5>
            <div className="listItemsUl">
              <div className="listItems" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <FontAwesomeIcon icon={faQuestion} style={{ color: "#797979" }} size="lg" />
                <p className='item' id='q' >Question</p>
              </div>
              <div className="listItems" data-bs-toggle="modal" data-bs-target="#exampleModal1">
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
              <div className="listItems" onClick={handleCatShow}>
                <FontAwesomeIcon icon={faBox} style={{ color: "#797979" }} size="lg" />
                <p className='item'>Category</p>
              </div>
              {
                catShow ? (
                  <div className='categoriesSort_list'>

                    {
                      categories.map((item) => {
                        return (
                          <button className='catList ' key={item.id} onClick={() => handleCatClick(item.Cat_name)}>{item.Cat_name}</button>
                        )
                      })

                    }

                  </div>
                ) : ""
              }

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
        </aside>



        <div id='QueryList'>
          <QuestionList isLoggedIn={isLoggedIn} questionList={questionList} getQuestionList={getQuestionList} />
        </div>


      </div>

      <div>


      </div>
      <Footer />
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Add Question</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className='modalForm'>
                <label className='m-0 labelT'> Category</label>
                <select onChange={handleSelect}>{optionItems}</select>
              </div>
              <div className='modalForm'>
                <label className='m-0 labelT' > Question</label>
                <input type="text" placeholder='Add a Question' onChange={handleTextChange} value={question} className='Add__inputs' ></input>
                {
                  IsQuestionExists ? <p className='m-0 ps-1 Qexists text-danger'>Question Exists</p> : null
                }
              </div>

            </div>
            <div className="modal-footer">

              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              {
                IsQuestionAdded ? <button type="button" className="btn btn-success">Added</button> : <button type="button" className="btn btn-primary" onClick={handleSaveQ}>Add</button>
              }

            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Add Category</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className='modalForm'>
                <label className='m-0 labelT'> Category Name</label>
                <input type='text' value={AddCat} className='Add__inputs' onChange={(e) => setAddCat(e.target.value)}></input>

              </div>


            </div>
            <div className="modal-footer">

              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              {
                IsCategoryAdded ? <button type="button" className="btn btn-success">Added</button> : <button type="button" className="btn btn-primary" onClick={handleSaveCat}>Add</button>
              }

            </div>
          </div>
        </div>
      </div>


    </div>
  )
}
