import React , { useState , lazy , Suspense } from 'react'
import './App.css'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

//components



const Login  =  React.lazy(()=> import('./views/LoginView/LoginPage'))
const Main = React.lazy(()=> import('./views/MainPage/MainPage'))
const Loading = React.lazy(()=> import('./utils/Loader/Loading'))
const Signup = React.lazy(() => import('./views/SignupView/SignupPage'));

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)


  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<React.Suspense fallback={<Loading/>}> <Main /></React.Suspense>} />
          <Route path="/login"element={<React.Suspense fallback={<Loading/>}> <Login setIsLoggedIn={setIsLoggedIn} /> </React.Suspense>  } />
          <Route path="/signup" element={<React.Suspense fallback={<Loading/>}><Signup setIsLoggedIn={setIsLoggedIn} /></React.Suspense>} />
        </Routes>
      </div>
    </Router>
  )
}


export default App
