const express = require('express')
const cors = require('cors')

const rootRouter = require('./Router/root')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser())
app.use('/staticFiles', express.static(__dirname + '/Source/assets'))

app.use('/', rootRouter)

app.listen(8000, () => {
    console.log("Server started.....")
    console.log("Server URL: http://localhost:8000")
})