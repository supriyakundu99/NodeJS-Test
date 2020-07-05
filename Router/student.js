const express = require('express')
const router = express.Router()
const connection = require('../Database/dbConnection')

router.get('/',  async(req, res) => {
    connection.query('SELECT * FROM test;', (err, rows, fields) => {
        if(!err) res.send(rows)
        else{
            console.log(err)
            res.send(err)
        }
    })
})

router.get('/:id', async(req, res) => {
    qstring = 'SELECT * FROM test where (id = ?);'
    stuid = req.params.id
    connection.query(qstring, [stuid], (err, rows, fields) => {
        if(!err) res.send(rows)
        else{
            console.log(err)
            res.send(err);
        }
    })
})

router.post('/', async(req,res) => {
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

router.post('/:id', async(req,res) => {
    qstring = 'UPDATE test SET name = ? , city = ? WHERE (id = ?);'
    stuid = req.params.id;
    connection.query(qstring, [req.body.name, req.body.city, stuid], (err, rows, fields) => {
        if(!err) res.send(rows)
        else{
            console.log(err)
            res.send(err)
        }
    })
})

router.delete('/:id', async(req, res) =>{
    qstring = 'DELETE FROM test WHERE (id = ?);'
    stuid = req.params.id
    connection.query(qstring, [stuid], (err, rows, fields) => {
        if(!err) res.send(rows)
        else{
            console.log(err)
            res.send(err);
        }
    })
})

module.exports = router