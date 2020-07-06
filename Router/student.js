const express = require('express')
const router = express.Router()
const connection = require('../Database/dbConnection')
const student = require('../Source/Student/studentOperation')

router.get('/',  async(req, res) => await student.fetchAll(req,res))

router.get('/:id', async(req, res) => await student.fetchUsingID(req, res))

router.post('/', async(req,res) => await student.insertStudent(req,res))

router.post('/:id', async(req,res) => await student.updateStudent(req,res))

router.delete('/:id', async(req, res) => await student.deleteStudent(req, res))

module.exports = router