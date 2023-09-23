const express = require('express')
const router = express.Router()

const { getCategory,  addCategory} = require("../controllers/Category")

router.route('/category').get(getCategory).post(addCategory)
module.exports = router