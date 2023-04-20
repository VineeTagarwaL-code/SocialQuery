  import React from 'react'
  import './App.css'


  import { BrowserRouter as Router , Routes , Route , Link } from 'react-router-dom';

  //components

  import MainPage from './views/MainPage/MainPage'
  import LoginPage from './views/LoginView/LoginPage'
import Background from './components/layout/background/Background';
import SignupPage from './views/SignupView/SignupPAGE';






  function App() {
  

    

    return (
      <Router>
      <div className="App">
        <Background/>
        <Routes>
        <Route path="/" element={<MainPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
        </Routes>
      </div>
      </Router>
    )
  }

  export default App
