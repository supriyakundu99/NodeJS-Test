const express = require('express')
const router = express.Router()
const {login} = require('../Source/Auth/authOperations')

router.get('/login', login)

module.exports = router