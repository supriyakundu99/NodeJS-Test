const express = require('express')
const router = express.Router()
const {renderHomePage, fetchUserDetails} = require('../Source/Home/homeOperations')

router.get('/', renderHomePage)
router.get('/fetchUserDetails', fetchUserDetails)

module.exports = router