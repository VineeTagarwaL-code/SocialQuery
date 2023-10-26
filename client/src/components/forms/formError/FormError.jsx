import React from 'react'
import './FormError.css'
function FormError(props) {
  return (
    <div id="formError"><ion-icon name="alert-circle-outline" style={{color:"red"}}></ion-icon><span>{props.error}</span></div>
  )
}

export default FormError