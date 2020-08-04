const express = require('express')
const router = express.Router()
const {renderHomePage} = require('../Source/Home/homeOperations')

router.get('/', renderHomePage)

module.exports = router