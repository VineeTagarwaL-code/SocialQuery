import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './QuestionTop.css'
import Loading from '../../../utils/Loader/Loading'
export default function QuestionTop({setIsNewQ , setQuery , isLoggedIn}) {
    const role = localStorage.getItem("Role")
    const user = localStorage.getItem("User")
    const [categories, setCategories] = useState([])

    const [question, setQuestion] = useState("")
    const [cat, setCat] = useState("Security")



    const [IsQuestionAdded  , setIsQuestionAdded] = useState(false)
    const [IsQuestionExists , setIsQuestionExists] = useState(false)


   
    let approve;

    if (role === "User") {
        approve = false
    } else {
        approve = true
    }


    const setQuestionAdded = ()=>{
        setTimeout(() => {
            setQuestion("")
            setIsQuestionAdded(false)
        }, 2000);
    }

    const setQuestionExists = ()=>{
        setTimeout(() => {
            setIsQuestionExists(false)
            setQuestion("")
        }, 2000);
    }

 let userlogged = true;
  //saving the question added by the user 
    const handleSaveQ = async () => {
        
        if(isLoggedIn){
            try {
                await axios.post("http://localhost:8000/addQuestion", {
                    question, cat, approve, user
                }).then((res) => {
                   if(res.data.status === 0 ){
                    setIsQuestionAdded(true)
                    setIsNewQ(true)
                    setQuestionAdded()
                   
                   }else if(res.data.status === 1){
                    setIsQuestionExists(true)
                    setQuestionExists()
                  
                   }
                })
            } catch (e) {
                console.error(e)
            }
        }else{
            userlogged=false;
        }
   
    }



    //handling the change in state 
    const handleTextChange = (e) => {

        setQuestion(e.target.value)

    }

    const handleSelect = (e) => {
        setCat(e.target.value)
    }

   ///


   // getting the categories 
    const getCategories = async () => {
        try {
            await axios.get("http://localhost:8000/getCategory").then((res) => {
                const responseData = res.data.response

                setCategories(responseData)
            })
        } catch (e) {
            console.error(e)
        }
    }
   



    useEffect(() => {
        getCategories()
    
    }, [])


    //option list for select

    const optionItems = categories.map((category) => (
        <option key={category._id} value={category.Cat_name}   >
            {category.Cat_name}
        </option>
    ));

 


    return (
        <div className='container top d-flex flex-column justify-content-evenly p-4'>
            <div className='headers d-flex justify-content-between align-items-center'>
                <h2 className='headerQ'>Questions</h2>
                {
                    isLoggedIn ? 
                        <button className='AddQ' data-bs-toggle="modal" data-bs-target="#exampleModal" >
                        Add Question
                               </button>
                    : 
                    null
                }
             
            </div>
            <div className='filter'>
                <h4 className='filter px-2'>Filter By :</h4>
                <input
                type='text' 
                placeholder='Text' 
                className='inputFilter' 
                onChange={(e)=>{setQuery(e.target.value)}}
                />
                <div className='categoriesList d-flex flex-start mt-4 flex-wrap align-items-center'>
                    {
                        categories.map((item) => {
                            return (
                                <button className='categories' key={item.id}>{item.Cat_name}</button>
                            )
                        })
                    }

                </div>
            </div>
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
                                <input type="text" placeholder='Question' onChange={handleTextChange} value={question}></input>
                                {
                                IsQuestionExists ? <p className='m-0 ps-1 Qexists text-danger'>Question Exists</p> : null
                            }
                            </div>
                          
                        </div>
                        <div className="modal-footer">
                       
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {
                                IsQuestionAdded ?<button type="button" className="btn btn-success">Saved</button> : <button type="button" className="btn btn-primary" onClick={handleSaveQ}>Save</button>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>

  
       

        </div>
    )
}
