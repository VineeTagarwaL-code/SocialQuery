 
const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    Cat_name: {
      type: String,
      required: true,
    }
  
  })

module.exports  = mongoose.model('Category',CategorySchema)