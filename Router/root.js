const express = require('express')
const router = express.Router()
const homeRouter = require('./home')
const studentRouter = require('./student')
const accountsRouter = require('./accounts')

router.use('/', homeRouter)
router.use('/student', studentRouter)
router.use('/account', accountsRouter)

module.exports = router