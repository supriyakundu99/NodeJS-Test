const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const app = express()

var connection = mysql.createConnection({
    host: '192.168.0.3',
    port: 3307,
    user: 'Supriya',
    password: 'sk1234',
    database: 'StudentDB',

})

connection.connect((err) => {
    if(!!err){
        console.log("Database is not connected..."+err)
    }
    else{
        console.log("Database Connected...")
    }
})

app.use(express.json())

app.get('/students', (req, res) => {
    connection.query('SELECT * FROM test;', (err, rows, fields) => {
        if(!err) res.send(rows)
        else{
            console.log(err)
            res.send(err)
        }
    })
})

app.post('/students', (req,res) => {
    qstring = 'INSERT INTO test (`name`, `city`) VALUES (?,?);'
    student = req.body
    connection.query(qstring, [student.name, student.city], (err,rows,fields) => {
        if(!err) res.send(rows)
        else{
            console.log(err)
            res.send(err)
        }
    })
})


app.listen(8000, () => {
    console.log("Server started.....")
})