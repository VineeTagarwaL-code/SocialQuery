const express = require('express')
const router = express.Router()

const{like,addRemark} = require('../controllers/features')
router.route('/like').post(like)
router.route('/remark').post(addRemark)
module.exports = router  