const connection = require("../../Database/dbConnection");
const {authenticatedUser} = require('../Auth/authOperations')
const path = require('path')

module.exports = {
    "renderHomePage": function (req, res){
        authenticatedUser(req).then((data) => {
            console.log(data)
            if(data.is_authenticated){
                res.sendFile('home.html', {root: path.join(__dirname,'Page')})
                // res.send("Home Page <br>Wellcome "+data.userName)
            }
            else{
                res.send("Home Page") 
            }
        })
    }
}