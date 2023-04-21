import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(7, 'Too Short!')
    .max(12, 'Too Long!')
    .required('Required'),
 rePass :Yup.string()
 .oneOf([Yup.ref('password'), null], "Passwords don't match")
 .required('Required')
});
 async function handleFormSubmit(name , password){
    try {
        await axios.post('http://localhost:8000/login', {
            name , password
        }).then((res) => {
          console.log(res.data)

        })
    } catch (e) {
        console.log(e)
    }
}
export default function Signup() {
  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
      rePass : '',
    },
    validationSchema: SignupSchema,
    onSubmit: values => {
      
      handleFormSubmit(values.name , values.password);
    },
  });

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
        <span className='errors  mb-0'>{formik.errors.password}</span>  
      ) : null}

     
      </div>
      <div className="form-group">
      <label htmlFor="rePass">Re-Password</label>
      <input
        id="rePass"
        name="rePass"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="rePass"
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password ? (
        <span className='errors mb-0'>{formik.errors.password}</span>  
      ) : null}

     
      </div>
      <button className="formBtn" type="submit">
        Signup
      </button>
    </form>
  );
}
