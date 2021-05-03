const express = require('express')
const cors = require('cors')
require('dotenv').config()

const rootRouter = require('./Router/root')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const app = express()

app.use(cors({
    credentials: true,
    origin: true,
    exposedHeaders: ['session_id']
}))

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser())
app.use('/staticFiles', express.static(__dirname + '/Source/assets'))

app.use('/', rootRouter)

app.listen(process.env.SERVER_PORT, process.env.SERVER_URL, () => {
    console.log("Server started.....")
    console.log("Server URL: http://" + process.env.SERVER_URL + ":" + process.env.SERVER_PORT)
})