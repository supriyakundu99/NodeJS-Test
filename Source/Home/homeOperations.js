const connection = require("../../Database/dbConnection");
const {authenticatedUser} = require('../Auth/authOperations')

module.exports = {
    "renderHomePage": function (req, res){
        res.send("Home Page") 
        authenticatedUser(req).then((data) => {
            console.log(data)
        })
    }
}