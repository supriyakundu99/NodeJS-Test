const mongoose = require('mongoose')


const studentSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    city: {
        type:String,
    }

})

module.exports = mongoose.model('Student', studentSchema)