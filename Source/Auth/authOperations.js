const connection = require("../../Database/dbConnection");
const uuid = require('uuid')
const crypto = require('crypto')

module.exports = {

    "login": function (req, res) {
        console.log("Login called...")
        let qString = 'SELECT * FROM auth_users where (user_name = ?);'
        let qUser = req.body.userName
        // let qUser = 'supriya'
        connection.query(qString, [qUser], (err, rows, fields) => {
            if (!err) {
                if (rows.length == 0) {
                    console.log("Rows: ",rows)
                    res.send("No user found")
                }
                else {
                    console.log("Rows: " + rows)
                    let encrpPassword = crypto.createHash('sha1').update(req.body.password).digest('hex')
                    // let encrpPassword = crypto.createHash('sha1').update("1234").digest('hex')
                    if (encrpPassword === rows[0].password) {
                        // Removing old session
                        oldCookie = req.cookies.sessionID
                        if(oldCookie != undefined) {
                            let qString = 'DELETE FROM session WHERE (session_value = ?);'
                            connection.query(qString, [oldCookie], (del_err, del_rows, del_fields) => {
                                if(!del_err) {
                                    console.log("Old cookie deleted..")
                                    console.log(del_rows)
                                }
                                else{
                                    console.log(del_err)
                                }
                            })
                        }  

                        // Creating new session
                        let qString = 'INSERT INTO session (`user_name`, `session_value`) VALUES (?, ?)'
                        newSessionID = uuid.v4()
                        connection.query(qString, [qUser, newSessionID], (session_err, session_rows, session_fields) => {
                            if (!session_err) {
                                res.cookie('sessionID', newSessionID, { maxAge: 10 * 24 * 3600 * 1000 })
                                res.send({
                                    "auth_user": rows[0],
                                    "session": session_rows
                                })
                            }
                            else {
                                console.log(session_err)
                                res.send(session_err)
                            }
                        })
                    }
                    else {
                        console.log("Password not matched..")
                        res.send("Password not matched..")
                    }
                }
            }
            else {
                console.log(err)
                res.send(err)
            }
        })
    },

    "register": function (req, res) {
        console.log("Register called....")
        let qString = 'SELECT count(user_name) AS user_count FROM auth_users where (user_name = ?);'
        let qUser = req.body.userName
        connection.query(qString, [qUser], (err, rows, fields) => {
            if (!err) {
                if (rows[0].user_count == 0) {
                    let qString = 'INSERT INTO auth_users (`user_name`, `password`) VALUES (?, ?)'
                    let encrpPassword = crypto.createHash('sha1').update(req.body.password).digest('hex')
                    connection.query(qString, [qUser, encrpPassword], (err, rows, fields) => {
                        if (!err) {
                            console.log("User registered...")
                            res.send(rows)
                        }
                        else {
                            console.log(err)
                            res.send(err)
                        }
                    })
                }
                else {
                    console.log("User already exits..")
                    res.send("User already exits..")
                }
            }
            else {
                console.log(err)
                res.send(err)
            }
        })
    }
}


// Table create
// CREATE TABLE studentdb.auth_users (
//     users_id INT NOT NULL AUTO_INCREMENT,
//     user_name VARCHAR(50) NULL,
//     password VARCHAR(36) NULL,
//     PRIMARY KEY (users_id),
//     UNIQUE INDEX users_id_UNIQUE (users_id ASC) VISIBLE,
//     UNIQUE INDEX user_name_UNIQUE (user_name ASC) VISIBLE);
