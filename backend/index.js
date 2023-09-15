const { v4: uuidv4 } = require('uuid');
const express = require('express')
const cors = require('cors')


const mongoose = require('mongoose')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())



mongoose.connect('mongodb://127.0.0.1:27017/YourQuery').then(() => console.log("Mongodb connected")).catch((error) => {
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


const QuestionSchema = new mongoose.Schema({
  Question: {
      type: String,
      required: true,
  },
  Category: {
      type: String,
      required: true,
  },
  CreatedBy: {
      type: String,
      required: true
  },
  approved: {
      type: Boolean,
  },

})
const Questions = new mongoose.model("Question", QuestionSchema, "Questions")
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


app.post("/addQuestion", async (req, res) => {
  

      try {
          const { question , cat , approve , user } = req.body
          
          const check = await Questions.findOne({ Question: question, Category: cat })
          if (check) {
              res.json({ status :  1, response : "Question Exists" })
          } else {


              // const result = Math.random().toString(36).substring(2,7);

              const newQ = new Questions({
                  Question: question,
                  CreatedBy: user,
                  Category: cat,
                  approved: approve,
                  
              })

              newQ.save().then(() => {
                 
                  res.json({ status :  0 , response : "Created" })
              })
          }
      } catch (e) { 
        console.error(e)
      }

})


app.post("/addCategory", async (req, res) => {
  

  try {
      const { AddCat } = req.body
      
      const check = await Category.findOne({Cat_name : AddCat})
      if (check) {
          res.json({ status :  1, response : "Category already Exists" })
      } else {


          // const result = Math.random().toString(36).substring(2,7);

          const newC = new Category({
            Cat_name:AddCat
              
          })

          newC.save().then(() => {
             
              res.json({ status :  0 , response : "Created" })
          })
      }
  } catch (e) { 
    console.error(e)
  }

})




app.get("/getQuestion", async (req, res) => {
  try {
    
      Questions.find().then((response) => {
          res.json({response:response})
       
      }).catch((e)=>[
          res.json({response:"NA"})
      ])
    
     
  } catch (e) {
      console.log(e);
  }



});


app.get("/getQuery", async (req, res) => {
  try {
      const { query } = req.query;
      const searchWord = query;
      const searchRegex = new RegExp(searchWord, 'i') ;
      Questions.find({ Question: searchRegex }).then((response) => {
          res.json({response:response})
       
      }).catch((e)=>[
          res.json({response:"NA"})
      ])
    
     
  } catch (e) {
      console.log(e);
  }
});


app.get("/CatReqQuery" , async(req , res)=>{
  try{
    const{catName} = req.query;
    
    Questions.find({Category:catName}).then((response)=>{
      res.json({response:response})
    }).catch((e)=>{
      res.json({response : "NA"})
    })
  }catch (e) {
    console.log(e);
}
})

  app.listen(8000, () => {
    console.log("Server Started at port 8000")
})