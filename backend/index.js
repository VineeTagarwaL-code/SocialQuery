
const express = require('express')
const cors = require('cors')


const mongoose = require('mongoose')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/myquery').then(() => console.log("connected")).catch((error) => {
    console.log(error)
})

const userSchema = new mongoose.Schema({

    name: {
        type: String,
    },    
    password: {
        type: String,
    },
    Role: {
        type: String
    }

})
const User = new mongoose.model("User", userSchema, "users")

app.post("/login", async (req, res) => {

    try {
       
      const { name, password } = req.body;
      const check = await User.findOne({ name, password: password });
      if(check ){
        return res.json({status:0 , response:check })
      }
      else{
        return res.json({status:1})
      }
    } catch (e) {
      console.log(e)
           return res.status(500).json({ status:5,response: "Internal Server Error" });
    }
 
  });



app.post("/signup", async (req, res) => {
   
    const {name , password } = req.body;

    const checkName = await User.findOne({name})
    if (checkName) {
      return res.status(409).json({ status:1,response: "Name Already Exists" });
    }
  
    try {
      const user = new User({
       
        password: password,
        name,
        role: "User",
      });
  
      await user.save();
  
      return res.json({ status:0,response: user });
    } catch (error) {
      console.error(error);
  
      return res.status(500).json({ status:5,response: "Internal Server Error" });
    }
  });
  
  app.listen(8000, () => {
    console.log("started")
})