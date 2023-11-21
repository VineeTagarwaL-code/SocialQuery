import React, {  useState } from 'react';

import * as Yup from 'yup';
import axios from 'axios';




import { useNavigate } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string()

    .max(20, 'Too Long!')
    .required('Required'),
});
export default function Login(props) {

  const [email, setEmail] = useState('')
  const [password, setPass] = useState('')



  const [validEmail, setIsValidEmail] = useState(false)
  const [ValidPass, setValidPass] = useState(false)

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    const valid = isEmailValid(newEmail);
    setIsValidEmail(valid);

  }

  const handlePasswordChange = (e) => {
    const newPass = e.target.value;
    setPass(newPass);

    const valid = isPasswordValid(newPass);
    setValidPass(valid);


  }


  function isEmailValid(email) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  }

  function isPasswordValid(password) {
    if (password.length === 0) {
      return false;
    } else if (password.length > 20) {
      return false;
    } else {
      return true;
    }
  }



  const url = "http://localhost:8000"

  const navigate = useNavigate();

  function navigateToHome() {
    props.setIsLoading(true)
    setTimeout(() => {
      props.setIsLoading(false)
      navigate("/")
    }, 2000)
  }
  async function handleFormSubmit(e) {
    e.preventDefault();
    if (validEmail && ValidPass) {
    
      try {
        console.log(email, password)
        await axios.post(`${url}/api/v1/login`, {
          email, password
        }).then(async (res) => {



          if (res.status === 200) {


            props.notifyFail(res.data.response)
          }
          else if (res.status === 201) {



            console.log(res.data)
            localStorage.setItem("FirstName", res.data.response.firstName)
            localStorage.setItem("LastName", res.data.response.lastName)
            localStorage.setItem("Email", res.data.response.email)
            localStorage.setItem("SessionId", res.data.session)
            localStorage.setItem("Role", "User")
            props.setIsLoggedIn(true)
            props.notifySuccess();
            setTimeout(() => {

              navigateToHome();
            }, 3000);


            //

          }
          else {
            alert("server error")
          }
        })
      } catch (e) {
        console.log(e)
      }
    } else {
      setEmail('')
      setPass('')
      props.notifyValitdationFailed();
    }



  }




  return (
    <form className=" w-[100%] md:w-[50%] mt-4 flex flex-col">
      <div className="flex flex-col mb-3">
        <label htmlFor="name" className=' text-sm md:text-lg text-sec inter  '>Email</label>
        <input
          type="email"
          autoComplete="off"
          name="name"
          id="name"
          placeholder="Enter your email"
          onChange={(e) => { handleEmailChange(e) }}
          value={email}
          className='w-[100%] md:w-[100%] md:text-base  
          placeholder:text-gray-400 
          focus:outline
          focus:outline-stone-900
          text-sm rounded-md bg-stone-800 border-solid border-1 border-stone-800 px-2 mr-2 py-1 text-gray-400 mt-1'
        />

      </div>

      <div className="flex flex-col mb-3">
        <label htmlFor="password" className='text-sm md:text-lg text-sec inter  '>Password</label>
        <input
          id="password"
          name="password"
          autoComplete="off"
          type="password"
          onChange={(e) => { handlePasswordChange(e) }}

          placeholder="Enter your Password"
          value={password}
          className='w-[100%] md:w-[100%] md:text-base  
          placeholder:text-gray-400 
          focus:outline
          focus:outline-stone-900
          text-sm rounded-md bg-stone-800 border-solid border-1 border-stone-800 px-2 mr-2 py-1 text-gray-400 mt-1'
        />

      </div>


      <button className="bg-stone-800 px-3 py-1 rounded-md cursor-pointer mt-4 group self-center" onClick={(e) => { handleFormSubmit(e) }}>
        <p className='text-sec group-hover:text-green-300'>Login</p>
      </button>

      <p className='text-sec mt-3 text-center ml-2 text-sm' >Dont have an account ? <span className='text-white underline cursor-pointer'>Signup</span> </p>
 

    </form>
  );
}
