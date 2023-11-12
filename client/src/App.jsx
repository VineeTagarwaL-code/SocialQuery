import React , { useState , lazy , Suspense, useEffect } from 'react'
import './App.css'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

//components

import Navbar from './components/layout/navigation/Nav/Navbar';


const Login  =  React.lazy(()=> import('./views/AuthViews/LoginView/LoginPage'))
const Main2 = React.lazy(()=> import('./views/Main/Main2.jsx'))

const Loading = React.lazy(()=> import('./utils/Loader/Loading'))
const Signup = React.lazy(() => import('./views/AuthViews/SignupView/SignupPage'));

// import LoginPage from './views/AuthViews/LoginView/LoginPage';
// import Main from './views/Main/Main.jsx';
// import Signup from './components/forms/signup/Signup.jsx';

// routes 
import MainRoute from './Routes/MainRoute.jsx';
import LoginRoute from './Routes/LoginRoute.jsx';
function App() {
  const [query, setQuery] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  const [isSessionActive , setIsSessionActive] = useState(false)

  useEffect(() => {
    let isAuthenticated = localStorage.getItem("SessionId");
    setIsSessionActive(isAuthenticated);
  }, []);

    useEffect(() => {
    let isAuthenticated = localStorage.getItem("SessionId");
    setIsSessionActive(isAuthenticated);
  }, [isSessionActive]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<React.Suspense fallback={<Loading/>}> 
         <MainRoute isLoggedIn={isSessionActive} >
           <Main2/>
         </MainRoute>
          </React.Suspense>} />
          <Route path="/login"element={<React.Suspense fallback={<Loading/>}>
          <LoginRoute isLoggedIn={isSessionActive}>
             <Login setIsLoggedIn={setIsLoggedIn} />
          </LoginRoute>
            
              </React.Suspense>  } />
          <Route path="/signup" element={<React.Suspense fallback={<Loading/>}><Signup setIsLoggedIn={setIsLoggedIn} /></React.Suspense>} />
        </Routes>
      </div>
    </Router>
  )
}


export default App
