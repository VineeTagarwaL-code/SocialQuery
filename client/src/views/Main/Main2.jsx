import React,{useState} from 'react'
import Navbar from '../../components/layout/navigation/Nav/Navbar'
import Main from './Main'
function Main2() {

    const [query, setQuery] = useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <>
          <Navbar setQuery={setQuery} /> 
           <Main query={query}/>
    </>
  )
}

export default Main2