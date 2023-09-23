//packages

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

//server setup
const app = express()
app.use(express.json())
app.use(express.static('./public'))
app.use(express.urlencoded({ extended: true }))
app.use(cors())

//importing important modules and using dotenv package
const connect=require('./DataBase/connect.js');
const authRouter = require('./routes/auth.js');
const catRouter = require('./routes/Category.js')
const QueryRouter = require('./routes/Query.js')
require('dotenv').config()

app.use("/api/v1",catRouter)
app.use("/api/v1",authRouter)
app.use("/api/v1", QueryRouter)
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
















app.get("/getQuestion", async (req, res) => {
  try {

    Questions.find().then((response) => {
      res.json({ response: response })

    }).catch((e) => [
      res.json({ response: "NA" })
    ])


  } catch (e) {
    console.log(e);
  }



});


app.get("/getQuery", async (req, res) => {
  try {
    const { query } = req.query;
    const searchWord = query;
    const searchRegex = new RegExp(searchWord, 'i');
    Questions.find({ Question: searchRegex }).then((response) => {
      res.json({ response: response })

    }).catch((e) => [
      res.json({ response: "NA" })
    ])


  } catch (e) {
    console.log(e);
  }
});


app.get("/CatReqQuery", async (req, res) => {
  try {
    const { catName } = req.query;

    Questions.find({ Category: catName }).then((response) => {
      res.json({ response: response })
    }).catch((e) => {
      res.json({ response: "NA" })
    })
  } catch (e) {
    console.log(e);
  }
})


//will modify the above code 


app.post("/api/v1/like", async (req, res) => {
  try {
    const { id, user } = req.body;
  console.log(user)

    const question = await Questions.findOne({ _id: id }); // Use findOne to retrieve a single question by its _id

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }


    const userExistsInLikedBy = question.likedby.some((likedUser) => likedUser.username === user);
    console.log(userExistsInLikedBy)
    if(userExistsInLikedBy){
      return res.json({status:2 , message:"Already Liked"})
    }else{


      const result = await Questions.updateOne(
        { _id: id },
        { $inc: { like: 1 } },
       
  
      );
      // Perform any actions related to 'question' here
    
      question.likedby.push({username:user})
      question.save()
      if (result.nModified === 0) {
        return res.status(404).json({ message: "Question not found" });
      }
  
      res.status(200).json({ message: "Like processed successfully" });



    }
    // Now you can work with the 'question' object
   
  } catch (e) {

    res.status(500).json({ error: "Internal app error" });
  }
});
