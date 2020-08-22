const express = require('express')
const router = express.Router()
const { login, register, renderLoginPage, renderRegisterPage } = require('../Source/Auth/authOperations')
const { deliverToken } = require('../Source/Auth/securityOperations')

router.get('/login', renderLoginPage)
router.post('/login', login)

router.get('/register', renderRegisterPage)
router.post('/register', register)

router.get('/getCSRFToken', deliverToken)

module.exports = router
