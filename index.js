const express = require('express')
const mongoose = require('mongoose')
const dbURL = "mongodb://localhost/StudentDB"

const app = express()

mongoose.connect(dbURL,{useNewUrlParser: true})
const newConnection = mongoose.connection

newConnection.on('open', () => {
    console.log("Database Conected......")
})
app.use(express.json())

const studentRouter = require('./routers/students')
app.use('/student', studentRouter)

app.listen(8000, () => {
    console.log("Server started.....")
})