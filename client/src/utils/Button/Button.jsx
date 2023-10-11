import React from 'react'
import './Button.css'
function Button(props) {
  return (
    <div id='button__cont'>
        <span><ion-icon name={`${props.icon}`} ></ion-icon></span>
        <p id='button__text'>{props.text}</p>
    </div>
  )
}

export default Button