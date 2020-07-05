const express = require('express')
const rootRouter = require('./Router/root')

const app = express()
app.use(express.json())

app.use('/',rootRouter)

app.listen(8000, () => {
    console.log("Server started.....")
})