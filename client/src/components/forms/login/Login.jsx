import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import '../../forms/form.css'
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
 

  const notifySuccess = () =>toast.success('Login Successfull , Loading...', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });


    const notifyFail = (errorText) =>toast.error(`${errorText}`, {
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
  async function handleFormSubmit(name, password) {


    try {
      await axios.post(`${url}/api/v1/login`, {
        name, password
      }).then( async (res) => {
        
 

        if (res.status === 200) {

          formik.setFieldValue("name", "")
          formik.setFieldValue("password", "")
          notifyFail(res.data.response)
        }
        else if (res.status === 201) {


          //if the response is 1 , user is logged in we will set a session id in the logged in and name of the user

          localStorage.setItem("User", res.data.response.name)
          localStorage.setItem("SessionId", res.data.session)
          localStorage.setItem("Role", "User")
          props.setIsLoggedIn(true)
          notify();
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
  }


  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
    },
    validationSchema: SignupSchema,
    onSubmit: values => {
       console.log("submitted")
      handleFormSubmit(values.name, values.password);
    },
  });

  useEffect(() => {
    setTimeout(() => {
      formik.setFieldError('name', '');
      formik.setFieldError('password', '');
    }, 5000)
  }, [formik.errors.name, formik.errors.password])

  return (
    <form onSubmit={formik.handleSubmit} id="form">
      <div className="form-group">
        <label htmlFor="name" className='label__form'>Username</label>
        <input
          type="text"
          autoComplete="off"
          name="name"
          id="name"
          placeholder="Enter your Username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          className='input__form'
        />
       
      </div>

      <div className="form-group">
        <label htmlFor="password" className='label__form'>Password</label>
        <input
          id="password"
          name="password"
          autoComplete="off"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter your Password"
          value={formik.values.password}
          className='input__form'
        />
     
      </div>


      <button className="formBtn" type="submit">
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
theme="light"/>

    </form>
  );
}
