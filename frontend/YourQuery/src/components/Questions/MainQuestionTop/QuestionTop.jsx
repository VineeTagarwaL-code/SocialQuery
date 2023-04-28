import React , {useEffect , useState} from 'react'
import axios from 'axios'
import './QuestionTop.css'
export default function QuestionTop() {
    
    const [categories , setCategories] = useState([])


    const getCategories=async ()=>{
   try{
    await axios.get("http://localhost:8000/getCategory" ) .then((res)=>{
         const responseData = res.data.response
         console.log(responseData)
         setCategories(responseData)
    })
   } catch(e){
    console.error(e)
   }
    }
    useEffect (()=>{
       getCategories()
    },[])
    return (
        <div className='container top d-flex flex-column justify-content-evenly p-4'>
            <div className='headers d-flex justify-content-between align-items-center'>
                <h2 className='headerQ'>Questions</h2>
                <button className='AddQ'>Add Question</button>
            </div>
            <div className='filter'>
                <h4 className='filter px-2'>Filter By :</h4>
                <input type='text' placeholder='Text'  className='inputFilter'/>
                <div className='categoriesList d-flex flex-start mt-4 flex-wrap align-items-center'>
              {
                 categories.map((item)=>{
                    return (
                    <button className='categories' key={item.id}>{item.Cat_name}</button>
                    )
                 })
              }
                
                </div>
            </div>
        </div>
    )
}
