import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import '../../forms/form.css'
import { useNavigate } from 'react-router-dom';



export default function Signup(props) {
  const navigate = useNavigate();


  function navigateToHome() {
    props.setIsLoading(true)
    setTimeout(() => {
      props.setIsLoading(false)
      navigate("/")
    }, 2000)
  }

  async function handleFormSubmit(name, password) {
    try {
      await axios.post('http://localhost:8000/api/v1/signup', {
        name, password
      }).then((res) => {
        if (res.data.status === 0) {
          props.setIsLoggedIn(true);
          localStorage.setItem("User", res.data.response.name)
          localStorage.setItem("SessionId", res.data.session)
          localStorage.setItem("Role", "User")
          navigateToHome()
        }

        else if (res.data.status === 1) {
       console.log("do something")
        }
      })
    } catch (e) {
      console.log(e)
    }
  }



  return (
    <form onSubmit={handleFormSubmit}>
      <div className="form-group usernameForm__cont">

        <div className='user__group'>
          <label htmlFor="name" className='label__form' >First Name</label>
          <input
            type="text"
            name="name"
            className='input__form usernameField'

            id="name"
            placeholder="Enter your first name"

          />
        </div>

        <div className='user__group'>
          <label htmlFor="name" className='label__form' >Last Name</label>
          <input
            type="text"
            name="name"
            className='input__form usernameField'
            id="name"
            placeholder="Enter your last name"

          />
        </div>
      </div>



      <div className="form-group">
        <label htmlFor="password" className='label__form'>Password</label>
        <input
          id="password"
          className='input__form'
          name="password"
          type="password"

  
          placeholder="Enter your Password"

        />
    

      </div>
      <div className="form-group">
        <label htmlFor="rePass" className='label__form'>Re-enter Password</label>
        <input
          id="rePass"
          name="rePass"
          type="password"
          className='input__form'

       
          placeholder="Enter your password again "
      
        />
      


      </div>
      <button className="formBtn" type="submit">
        Signup
      </button>
    </form>
  );
}
