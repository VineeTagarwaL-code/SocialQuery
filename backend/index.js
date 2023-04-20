
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
    email: {
        type: String,
    }
    ,
    password: {
        type: String,
    },
    Role: {
        type: String
    }

})
const User = new mongoose.model("User", userSchema, "users")

app.post("/login", async (req, res) => {
    console.log("in");
    try {
       
      const { name, password } = req.body;
      const check = await User.findOne({ name, password: password });
      console.log(check)
      res.json(check.name);
    } catch (e) {
      res.json(e);
    }
  });

  app.listen(8000, () => {
    console.log("started")
})