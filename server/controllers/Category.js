const mongoose = require('mongoose')
const asyncWrap = require('../middleware/async')
const Category = require('../Models/Category')

const getCategory = asyncWrap( async (req, res) => {

      const data = await Category.find()
      if (data) {
        return res.status(201).json({ status: "successfull", response: data })
      } else {
        return res.status(404).json({ status: "un-successfull"  })
      }
     })

const addCategory = asyncWrap(async (req, res) => {
  
      const { AddCat } = req.body
      const check = await Category.findOne({ Cat_name: AddCat })
      if (check) {
        res.status(302).json({ status: "successfull", response: "Category already Exists" })
      } else {
        // const result = Math.random().toString(36).substring(2,7);
        const newC = new Category({
          Cat_name: AddCat
        })
        newC.save().then(() => {
          res.status(201).json({ status:  "successfull", response: "Created" })
        })
      }
  })


  module.exports = {
    getCategory,
    addCategory
  }