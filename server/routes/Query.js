const express = require('express')
const router = express.Router()

const{addQuery,getQueries, regExQuery, catQuery} = require('../controllers/Query')
router.route('/query').get(getQueries).post(addQuery)
router.route('/regEx').get(regExQuery)
router.route('/catQuery').get(catQuery)
module.exports = router  