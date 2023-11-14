import React, { useEffect, useState } from 'react';

import * as Yup from 'yup';
import axios from 'axios';




import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
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

  const notifyValitdationFailed = () => toast.error(`Validation Failed`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });



  const notifySuccess = () => toast.success('Login Successfull , Loading...', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });


  const notifyFail = (errorText) => toast.error(`${errorText}`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

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


            notifyFail(res.data.response)
          }
          else if (res.status === 201) {


            //if the response is 1 , user is logged in we will set a session id in the logged in and name of the user
            console.log(res.data)
            localStorage.setItem("FirstName", res.data.response.firstName)
            localStorage.setItem("LastName", res.data.response.lastName)
            localStorage.setItem("Email", res.data.response.email)
            localStorage.setItem("SessionId", res.data.session)
            localStorage.setItem("Role", "User")
            props.setIsLoggedIn(true)
            notifySuccess();
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
      notifyValitdationFailed();
    }



  }


  // const formik = useFormik({
  //   initialValues: {
  //     name: '',
  //     password: '',
  //   },
  //   validationSchema: SignupSchema,
  //   onSubmit: values => {
  //      console.log("submitted")
  //     handleFormSubmit(values.name, values.password);
  //   },
  // });

  // useEffect(() => {
  //   setTimeout(() => {
  //     formik.setFieldError('name', '');
  //     formik.setFieldError('password', '');
  //   }, 5000)
  // }, [formik.errors.name, formik.errors.password])

  return (
    <form id="form">
      <div className="form-group">
        <label htmlFor="name" className='text-lg '>Email</label>
        <input
          type="email"
          autoComplete="off"
          name="name"
          id="name"
          placeholder="Enter your email"
          onChange={(e) => { handleEmailChange(e) }}
          value={email}
          className=''
        />

      </div>

      <div className="form-group">
        <label htmlFor="password" className=''>Password</label>
        <input
          id="password"
          name="password"
          autoComplete="off"
          type="password"
          onChange={(e) => { handlePasswordChange(e) }}

          placeholder="Enter your Password"
          value={password}
          className=''
        />

      </div>


      <button className="formBtn" onClick={(e) => { handleFormSubmit(e) }}>
        Login
      </button>
      <ToastContainer position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />

    </form>
  );
}
