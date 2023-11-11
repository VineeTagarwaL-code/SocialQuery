const mongoose = require('mongoose')

require('dotenv').config()

async function  connect(){
    mongoose.connect("mongodb://0.0.0.0:27017/socialQuery").then(()=>
    console.log("Mongodb Connected")
    ).catch((error)=>{
        console.log(error)
    })
}

module.exports = connect