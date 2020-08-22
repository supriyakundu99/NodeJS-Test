const express = require('express')
const router = express.Router()
const connection = require('../Database/dbConnection')
// const { fetchAll, fetchUsingID, insertStudent, updateStudent, deleteStudent } = require('../Source/Student/studentOperation')
const { renderInfoPage, manageInfo } = require('../Source/Student/studentOperation')



// router.get('/', fetchAll)

// router.get('/:id', fetchUsingID)

// router.post('/', insertStudent)

// router.put('/:id', updateStudent)

// router.delete('/:id', deleteStudent)

router.get('/info', renderInfoPage)
router.post('/info', manageInfo)

module.exports = router
