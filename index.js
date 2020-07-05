const express = require('express')
const studentRouter = require('./Router/student')

const app = express()
app.use(express.json())

app.use('/students',studentRouter)

app.listen(8000, () => {
    console.log("Server started.....")
})