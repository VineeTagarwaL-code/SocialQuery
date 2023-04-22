import React,{useEffect} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

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



 
  const navigate = useNavigate();

  function navigateToHome(){
    props.setIsLoading(true)
   setTimeout(()=>{
    props.setIsLoading(false)
    navigate("/")
   }, 2000)
  }
 async function handleFormSubmit(name , password){
  try {
      await axios.post('http://localhost:8000/login', {
          name , password
      }).then((res) => {

        
        if(res.data.status ===1){
          formik.setFieldValue("name","")
          formik.setFieldValue("password","")
          props.setIsError(res.data.response)
        } 
        else if(res.data.status === 0){
          

          //if the response is 1 , user is logged in we will set a session id in the logged in and name of the user
      
          localStorage.setItem("User" , res.data.response.name)
          localStorage.setItem("SessionId" , res.data.session)
          props.setIsLoggedIn(true)
          navigateToHome()

          //
          
        }
        else{
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
      
      handleFormSubmit(values.name , values.password);
    },
  });

  useEffect(()=>{
    
    setTimeout(()=>{
      formik.setFieldError('name', '');
      formik.setFieldError('password', '');
    },5000)
  },[formik.errors.name ,formik.errors.password ])

  return (
    <form onSubmit={formik.handleSubmit}>
   <div className="form-group">
      <label htmlFor="name">Username</label>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Username"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
      />
      {formik.touched.name && formik.errors.name ? (
        <span className='errors mb-0'>{formik.errors.name}</span>  
      ) : null}
    </div>
    <div className="form-group">
      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Password"
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password ? (
        <p className='errors'>{formik.errors.password}</p>  
      ) : null}

     
      </div>
      <button className="formBtn" type="submit">
        Login
      </button>
    </form>
  );
}
