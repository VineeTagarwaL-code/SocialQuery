import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import FormError from '../formError/FormError';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup(props) {

  // states for forms
  const[FirstName , setFirstName] = useState("")
  const[LastName , setLastName] = useState("")
  const[Email , setEmail] = useState("")
  const[Pass , setPass] = useState("")
  const[cPass , setCpass]=useState("")

  const[validFirstName , setvalidFirstName] = useState(true)
  const[validLastName , setvalidLastName] = useState(true)
  const[validEmail , setvalidEmail] = useState(true)
  const[validPass , setvalidPass] = useState(true)
  const[validcPass , setvalidCpass]=useState(true)

  const navigate = useNavigate();

  const notify = (text) => {
    toast.error(text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }

const  notifySignup = (text) => {
    toast.success(text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }
  function navigateToHome() {
    props.setIsLoading(true)
    setTimeout(() => {
      props.setIsLoading(false)
      navigate("/")
    }, 2000)
  }
function setDefault(){
  setCpass("")
  setEmail("")
  setFirstName("")
  setLastName("")
  setPass("")
}

  async function handleFormSubmit(e) {
e.preventDefault();
    if(validEmail && validFirstName && validLastName && validPass ){
      console.log(Email , Pass , FirstName , LastName)
   
    try {
      await axios.post('http://localhost:8000/api/v1/signup', {
        Email , Pass , FirstName , LastName
      }).then((res) => {
        if (res.data.status === 0) {
          props.setIsLoggedIn(true);
          localStorage.setItem("FirstName", res.data.response.firstName)
          localStorage.setItem("LastName", res.data.response.lastName)
          localStorage.setItem("Email", res.data.response.email)
          localStorage.setItem("SessionId", res.data.session)
          localStorage.setItem("Role", "User")
          setDefault()
          props.notifySignup("Signup Successfull , check email");
          setTimeout( ()=>{
          
            navigateToHome()
          },2000)
       
        }
        else if(res.data.status === 2){
          props.notify("empty values")
        }

        else if (res.data.status === 1) {
       console.log("do something")
        }
      })
    } catch (e) {
      console.log(e)
    }
  }else{
    console.error("validation failed")
    props.notify("validation failed")
  }
  }

// validation functions
const handleFirstNameChange = (e) => {
  const newValue = e.target.value;
  setFirstName(newValue);

  // Check if the first name is longer than 20 characters
  if (newValue.length > 20) {
    setvalidFirstName(false);
  } else {
    setvalidFirstName(true);
  }
};

const handleLastNameChange = (e) => {
  const newValue = e.target.value;
  setLastName(newValue);

  // Check if the last name is longer than 20 characters
  if (newValue.length > 20) {
    setvalidLastName(false);
  } else {
    setvalidLastName(true);
  }
};
function validateEmail(email) {

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  return emailRegex.test(email);
}

function emailValidator(e){
  const email = e.target.value;
  setEmail(email);
  if (validateEmail(email)) {
    setvalidEmail(true)
  } else {
    setvalidEmail(false)
  }

}

function validatePassword(password) {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{12,}$/;

  return passwordRegex.test(password);
}

function passValidator(e){
  const pass = e.target.value;
  setPass(pass);
  if (validatePassword(pass)) {
    setvalidPass(true)
  } else {
    setvalidPass(false)
  }

}

function confirmPassValidate(e){
  const cPass = e.target.value;
  setCpass(cPass)
  if(cPass === Pass){
    setvalidCpass(true)
  }else{
    setvalidCpass(false)
  }
}



  return (
    <form onSubmit={handleFormSubmit} className=" w-[100%] md:w-[50%] mt-4 flex flex-col" >
  
      <div className="flex  flex-col lg:flex-row mb-3 lg:gap-5 gap-3 lg:w-[500px]">

        <div className='user__group'>
          <label htmlFor="name" className='text-sm md:text-lg text-sec inter ' >First Name</label>
          <input
            type="text"
            name="name"
            className='w-[100%] md:w-[100%] md:text-base  
            placeholder:text-gray-400 
            focus:outline
            focus:outline-stone-900
            text-sm rounded-md bg-stone-800 border-solid border-1 border-stone-800 px-2 mr-2 py-1 text-gray-400 mt-1'
            value={FirstName}
            id="name"
            placeholder="Enter your first name"
            onChange={(e)=>{
              handleFirstNameChange(e)
          
            }}
          />
          {
           !validFirstName && <FormError error = "Max 20 Chars"/>
                  
          }
     
        </div>

        <div className='user__group'>
          <label htmlFor="name" className='text-sm md:text-lg text-sec inter ' >Last Name</label>
          <input
            type="text"
            name="name"
            className='w-[100%] md:w-[100%] md:text-base  
            placeholder:text-gray-400 
            focus:outline
            focus:outline-stone-900
            text-sm rounded-md bg-stone-800 border-solid border-1 border-stone-800 px-2 mr-2 py-1 text-gray-400 mt-1'
            id="name"
            placeholder="Enter your last name"
            value={LastName}
            onChange={(e)=>{
              handleLastNameChange(e)
      
            }}

          />
              {
            !validLastName&&<FormError error = "Max 20 Chars"/>
                  
          }
        </div>
      </div>

      <div className="flex flex-col mb-3">
        <label htmlFor="password" className='text-sm md:text-lg text-sec inter '>Email</label>
        <input
          id="email"
          className='w-[100%] md:w-[100%] md:text-base  
          placeholder:text-gray-400 
          focus:outline
          focus:outline-stone-900
          text-sm rounded-md bg-stone-800 border-solid border-1 border-stone-800 px-2 mr-2 py-1 text-gray-400 mt-1'
          name="email"
          type="email"
          value={Email}
         onChange={emailValidator}
          placeholder="Enter your Email"

        />
           {
            !validEmail && <FormError error = "Enter valid email"/>
                  
          }

      </div>

      <div className="flex flex-col mb-3">
        <label htmlFor="password" className= 'text-sm md:text-lg text-sec inter'>Password</label>
        <input
          id="password"
          className='w-[100%] md:w-[100%] md:text-base  
            placeholder:text-gray-400 
            focus:outline
            focus:outline-stone-900
            text-sm rounded-md bg-stone-800 border-solid border-1 border-stone-800 px-2 mr-2 py-1 text-gray-400 mt-1'
          name="password"
          type="password"
          value={Pass}
         onChange={passValidator}
          placeholder="Enter your Password"

        />
          {
            !validPass && <FormError error = "Must be 12 char long , One Uppercase , Number "/>
                  
          }

      </div>
      <div className="flex flex-col mb-3">
        <label htmlFor="rePass" className='text-sm md:text-lg text-sec inter'>Confirm Password</label>
        <input
          id="rePass"
          name="rePass"
          type="password"
          className='w-[100%] md:w-[100%] md:text-base  
          placeholder:text-gray-400 
          focus:outline
          focus:outline-stone-900
          text-sm rounded-md bg-stone-800 border-solid border-1 border-stone-800 px-2 mr-2 py-1 text-gray-400 mt-1'
          value={cPass}
          onChange={confirmPassValidate}
          placeholder="Enter your password again "
      
        />
      
      {
            !validcPass && <FormError error = "Password doesnt Match"/>
                  
          }

      </div>
      <button className="bg-stone-800 px-3 py-1 rounded-md cursor-pointer mt-4 group self-center"  type="submit">
      <p className='text-sec group-hover:text-green-300'>Signup</p>
      </button>
    </form>
  );
}
