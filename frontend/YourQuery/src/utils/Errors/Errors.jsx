import React from 'react'
import './Errors.css'
export default function Errors(props) {
  return (
    <div className='errorCont' style={{color:"black"}}><h4>{props.error}</h4></div>
  )
}
