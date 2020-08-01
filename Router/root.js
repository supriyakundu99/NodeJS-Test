const express = require('express')
const router = express.Router()
const studentRouter = require('./student')
const accountsRouter = require('./accounts')

router.get('/', (req, res) =>{
    res.send("Home Page")  
})

router.use('/students', studentRouter)
router.use('/account', accountsRouter)

module.exports = router