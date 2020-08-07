const connection = require("../../Database/dbConnection");
const {authenticatedUser} = require('../Auth/authOperations')
const path = require('path')

module.exports = {
    renderHomePage: function (req, res){
        res.sendFile('home.html', {root: path.join(__dirname,'Page')})
    },

    fetchUserDetails: function (req, res) {
        authenticatedUser(req).then((data) => {
            console.log(data)
            if(data.is_authenticated){
                res.json(data)
            }
            else{
                res.json(data) 
            }
        })
    }
}