const connection = require("../../Database/dbConnection");
const uuid = require('uuid')
// const cryptoJS = require('crypto')

module.exports = {

    "login": function(req, res){
        console.log("Login called...")
        console.log("uuid: ",uuid.v4())
        qString = 'SELECT * FROM auth_users where (user_name = ?);'
        qUser = req.body.userName
        connection.query(qString, [qUser], (err, rows, fields) => {
            if(!err){
                if( rows.length  == 0){
                    console.log("Rows: "+ rows)
                    res.send("No user found")
                }
                else{
                    console.log("Rows: " + rows)
                    res.send(rows)
                }
            }
            else{
                console.log(err)
                res.send(err)
            }
        })
    }
}


// Table create
// CREATE TABLE `studentdb`.`auth_users` (
//     `users_id` INT NOT NULL AUTO_INCREMENT,
//     `user_name` VARCHAR(50) NULL,
//     `password` VARCHAR(36) NULL,
//     PRIMARY KEY (`users_id`),
//     UNIQUE INDEX `users_id_UNIQUE` (`users_id` ASC) VISIBLE,
//     UNIQUE INDEX `user_name_UNIQUE` (`user_name` ASC) VISIBLE);

// INSERT INTO `studentdb`.`auth_users` (`user_name`, `password`) VALUES ('supriya', '1234');