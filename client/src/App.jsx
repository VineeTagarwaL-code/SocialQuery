import React , { useState , lazy , Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'




//components
const Login  =  React.lazy(()=> import('./views/AuthViews/LoginView/LoginPage'))
const Main2 = React.lazy(()=> import('./views/Main/Main2.jsx'))

const Loading = React.lazy(()=> import('./utils/Loader/Loading'))
const Signup = React.lazy(() => import('./views/AuthViews/SignupView/SignupPage'));




function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  



  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<React.Suspense fallback={<Loading/>}> 
   
    
           <Main2/>
      
          </React.Suspense>} />
          <Route path="/login"element={<React.Suspense fallback={<Loading/>}>

   
            <Login setIsLoggedIn={setIsLoggedIn}/>
     
      
   
            
              </React.Suspense>  } />
          <Route path="/signup" element={<React.Suspense fallback={<Loading/>}><Signup setIsLoggedIn={setIsLoggedIn} /></React.Suspense>} />
        </Routes>
      </div>
    </Router>
  )
}


export default App
