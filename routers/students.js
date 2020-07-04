const express = require('express')
const router = express.Router()
const Student = require('../models/studentDB')

router.get('/', async(req,res) => {
    try{
        students = await Student.find()
        res.json(students)
    }catch(err){
        res.send("Error in get : "+err)
    }
})

router.post('/', async(req,res) => {
    const student = new Student({
        name: req.body.name,
        city: req.body.city
    })
    try{
        await student.save()
        res.send("Data saved")
    }catch(err){
        res.send("Error in post : "+err)
    }
})

module.exports = router