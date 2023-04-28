const { v4: uuidv4 } = require('uuid');
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
    role: {
        type: String,
        
    }

})

const CategorySchema = new mongoose.Schema({
  Cat_name: {
      type: String,
      required: true,
  }

})

const Category = new mongoose.model("Category", CategorySchema, "Categories")
const User = new mongoose.model("User", userSchema, "users")

app.post("/login", async (req, res) => {

    try {
       
      const { name, password } = req.body;
      
      const check = await User.findOne({ name, password: password });
      if(check ){
        const session = uuidv4();
        return res.json({status:0 , response:check , session : session  })
      }
      else{
        return res.json({status:1 ,response:"Incorect User / Password"})
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
      return res.json({ status:1,response: "Name Already Exists" });
    }
  
    try {
      const user = new User({
       
        password: password,
        name,
        role: "User",
      });
  
      await user.save();
      const session = uuidv4();
      return res.json({ status:0,response: user,session : session  });
    } catch (error) {
      console.error(error);
  
      return res.status(500).json({ status:5,response: "Internal Server Error" });
    }
  });
  

  app.get("/getCategory", async (req, res) => {

 
        try {
            const data = await Category.find()
            if (data) {
               return res.json({ status:  0 , response:data })
            } else {
               return  res.json({ status : 1  })
            }

        } catch (e) {
            console.log(e)
        }

})
  app.listen(8000, () => {
    console.log("started")
})