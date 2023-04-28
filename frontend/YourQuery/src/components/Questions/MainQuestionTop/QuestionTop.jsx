import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './QuestionTop.css'
export default function QuestionTop() {
    const role = localStorage.getItem("Role")
    const user = localStorage.getItem("User")
    const [categories, setCategories] = useState([])

    const [question, setQuestion] = useState("")
    const [cat, setCat] = useState("")

    let approve;

    if (role === "User") {
        approve = false
    } else {
        approve = true
    }

  //saving the question added by the user 
    const handleSaveQ = async () => {
        try {
            await axios.post("http://localhost:8000/addQuestion", {
                question, cat, approve, user
            }).then((res) => {
               console.log(res)
            })
        } catch (e) {
            console.error(e)
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
                <button className='AddQ' data-bs-toggle="modal" data-bs-target="#exampleModal">Add Question</button>
            </div>
            <div className='filter'>
                <h4 className='filter px-2'>Filter By :</h4>
                <input type='text' placeholder='Text' className='inputFilter' />
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
                                <input type="text" placeholder='Question' onChange={handleTextChange}></input>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSaveQ}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
