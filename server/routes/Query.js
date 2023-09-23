const express = require('express')
const router = express.Router()

const{addQuery,getQueries} = require('../controllers/Query')
router.route('/query').get(getQueries).post(addQuery)
module.exports = router