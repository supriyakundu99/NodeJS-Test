const express = require('express')
const rootRouter = require('./Router/root')
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/',rootRouter)

app.listen(8000, () => {
    console.log("Server started.....")
})