const express = require('express')
const router = express.Router()
const studentRouter = require('./student')

router.get('/', (req, res) =>{
    res.send("Home Page")  
})

router.use('/students',studentRouter)

module.exports = router