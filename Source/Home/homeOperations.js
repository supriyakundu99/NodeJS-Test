const connection = require("../../Database/dbConnection");
const {authenticatedUser} = require('../Auth/authOperations')

module.exports = {
    "renderHomePage": function (req, res){
        authenticatedUser(req).then((data) => {
            console.log(data)
            if(data.is_authenticated){
                res.send("Home Page <br>Wellcome "+data.userName)
            }
            else{
                res.send("Home Page") 
            }
        })
    }
}