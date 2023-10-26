//packages

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

//server setup
const app = express()
app.use(express.json())
app.use(express.static('./public'))
app.use(express.urlencoded({ extended: true }))

const corsOptions = {
  origin: 'https://social-query-api.vercel.app/', // Replace with the origin you want to allow
  methods: 'GET,POST', // Define the HTTP methods you want to allow
  allowedHeaders: 'Content-Type,Authorization', // Define the allowed headers
};
app.use(cors(corsOptions));
//importing important modules and using dotenv package
const connect=require('./DataBase/connect.js');
const authRouter = require('./routes/auth.js');
const catRouter = require('./routes/Category.js')
const QueryRouter = require('./routes/Query.js')
const featureRouter = require('./routes/features.js')
require('dotenv').config()

app.use("/api/v1",authRouter,QueryRouter , featureRouter,catRouter)


const startServer = async()=>{
  try{
     await connect()
     app.listen(process.env.PORT, () => {
      console.log(`App Started at port ${process.env.PORT}`)
    })
  }catch(error)
  {
   console.log("Server booting error" , error)
  }
}

startServer()
























//will modify the above code 


