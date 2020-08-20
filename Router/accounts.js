const express = require('express')
const router = express.Router()
const { login, register, renderLoginPage, renderRegisterPage } = require('../Source/Auth/authOperations')


router.get('/login', renderLoginPage)
router.post('/login', login)

router.get('/register', renderRegisterPage)
router.post('/register', register)

module.exports = router
