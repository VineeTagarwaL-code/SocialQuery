import React,{useState} from 'react'
import './App.css'


import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

//components

import MainPage from './views/MainPage/MainPage'
import LoginPage from './views/LoginView/LoginPage'

import SignupPage from './views/SignupView/SignupPAGE';

function App() {

  const [isLoggedIn , setIsLoggedIn] = useState(false)


  return (
    <Router>
      <div className="App">
        
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/signup" element={<SignupPage setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
      </div>
    </Router>
  )
}


export default App
