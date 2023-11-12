import React, { useState, useEffect } from 'react'
import SideBar from '../../components/layout/SideBar/SideBar'
import axios from 'axios'
import 'animate.css';
import QuestionList from '../../components/Questions/QuestionList/QuestionList';
import { ToastContainer, toast } from 'react-toastify';
import OffCanvas from '../../components/layout/OffCanvas/OffCanvas';

function Main({ query }) {
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
  const [catExists, setCatExists] = useState(false)
  const [catShow, setCatShow] = useState(false)

  const [AddCat, setAddCat] = useState("")
  //query inputted by user to be used a regex in the databse 


  const [NewQ, setIsNewQ] = useState(false)//for the new question added by the user
  const [catReq, setCatReq] = useState("")//for the category request of the user



  const getQuestionList = async () => {
    console.log("called")
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
    console.log("useEFFECT CALLED")
    getQuestionList()
    if (id != null) {
      setIsLoggedIn(true)
    }
  }, [])


  //for fetching the query matching the regex exp of the input field in QuestionTop.jsx
  const getQuery = async (query1) => {
    try {
      axios.get(`${URL}/api/v1/regEx`, { params: { query: query1 } }).then((res) => {
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
   
    getQuery(query)
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
    console.log("cat show")
    setCatShow(!catShow)
  }

  useEffect(() => {
    getCategories()
    setTimeout(() => {
      setIsCategoryAdded(false)
    }, 3000)

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
            setAddCat("")
            setIsCategoryAdded(true)


          } else if (res.status === 202) {
            console.log('exists')
            catExistsf()

          }
        })
      } catch (e) {
        console.error(e)
      }
    } else {
      userlogged = false;
    }
  }

  function catExistsf() {
    setAddCat("")
    setCatExists(true)
    setTimeout(() => {
      setCatExists(false);
    }, 2000)
  }
  return (
    <div className=' h-[calc(100vh-68px)] w-screen main overflow-scroll  '>
      <SideBar handleCatShow={handleCatShow} catShow={catShow} categories={categories} handleCatClick={handleCatClick} />
      <OffCanvas handleCatShow={handleCatShow} catShow={catShow} categories={categories} handleCatClick={handleCatClick}/>
      <div className=' flex justify-end'>
        <div className=' max-w-[100vw] md:w-[80vw] w-[100vw] px-2 py-2 md:px-6 flex justify-center animate__animated animate__bounce overflow-scroll'>
          <QuestionList isLoggedIn={isLoggedIn} questionList={questionList} getQuestionList={getQuestionList} />
        </div>
      </div>
      {/* question modal  */}

      <div className="modal fade" id="QuestionModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-stone-900">
            <div className="modal-header border-stone-700">
              <h1 className="modal-title fs-5  text-main text-lg" id="exampleModalLabel">ADD QUESTION</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className='modalForm flex flex-col border-stone-700 mb-4'>
                <label className='m-0 labelT text-main mb-2 pl-1 text-lg'> Category</label>
                <select onChange={handleSelect} className='w-[100%] md:text-base  
        placeholder:text-gray-400 
        focus:outline
        focus:outline-stone-900
        text-sm rounded-md bg-transparent border-solid border-1 border-stone-600 px-2 mr-2 py-1 text-gray-400'>{optionItems}</select>
              </div>
              <div className='modalForm flex flex-col border-stone-700'>
                <label className='m-0 labelT text-main mb-2 pl-1 text-lg' > Question</label>
                <input type="text" placeholder='Add a Question' onChange={handleTextChange} value={question} className='w-[100%] md:text-base  
        placeholder:text-gray-400 
        focus:outline
        focus:outline-stone-900
        text-sm rounded-md bg-transparent border-solid border-1 border-stone-600 px-2 mr-2 py-1 text-gray-400' ></input>
                {
                  IsQuestionExists ? <p className='m-0 ps-1 Qexists text-danger'>Question Exists</p> : null
                }
              </div>

            </div>
            <div className="modal-footer border-stone-700">

              <button type="button" className="bg-stone-800 px-3 py-1 text-main rounded-sm hover:text-red-400" data-bs-dismiss="modal">Close</button>
              {
                IsQuestionAdded ? <button type="button" className="bg-stone-800 px-3 py-1  rounded-sm text-green-700">Added</button> : <button type="button" className="bg-stone-800 px-3 py-1 text-main rounded-sm hover:text-green-400" onClick={handleSaveQ}>Add</button>
              }

            </div>
          </div>
        </div>
      </div>
      {/* end of question modal */}


      {/* category modal */}

      <div className="modal fade" id="CategoryModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content border-solid  bg-stone-900">
            <div className="modal-header border-stone-700">
              <h1 className="modal-title fs-5 text-main text-lg" id="exampleModalLabel">ADD CATEGORY</h1>
              <button type="button" className="btn-close " data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body border-stone-700">
              <div className='modalForm flex flex-col border-stone-700'>
                <label className='m-0 labelT text-main mb-3 text-lg'> Category Name</label>
                <input type='text' value={AddCat}
                  placeholder='Enter a name'
                  className='w-[100%] md:text-base  
        placeholder:text-gray-400 
        focus:outline
        focus:outline-stone-900
        text-sm rounded-md bg-transparent border-solid border-1 border-stone-600 px-2 mr-2 py-1 text-gray-400' onChange={(e) => setAddCat(e.target.value)}></input>
                {
                  catExists ? <p className='mt-2 text-red-500 text-sm ml-2'>Category Already Exists</p> : ""
                }

              </div>


            </div>
            <div className="modal-footer border-stone-700">

              <button type="button" className="bg-stone-800 px-3 py-1 text-main rounded-sm hover:text-red-400" data-bs-dismiss="modal">Close</button>
              {
                IsCategoryAdded ? <button type="button" className="bg-stone-800 px-3 py-1  rounded-sm text-green-700">Added</button> : <button type="button" className="bg-stone-800 px-3 py-1 text-main rounded-sm hover:text-green-400" onClick={handleSaveCat}>Add</button>
              }

            </div>
          </div>
        </div>
      </div>

      {/* end of category modal */}
    </div>
  )
}

export default Main