const connection = require("../../Database/dbConnection");
const uuid = require('uuid')
const crypto = require('crypto');
const path = require('path')
// const { resolve } = require("path");
// const { rejects } = require("assert");

module.exports = {

    renderLoginPage: function(req, res) {
        res.sendFile('login.html', {root: path.join(__dirname,'Page')})
    },

    login: function (req, res) {
        console.log("Login called...")
        let resData = {
            "loginSuccess": false,
            "message": ""
        }
        let qString = 'SELECT * FROM auth_users where (user_name = ?);'
        let qUser = req.body.userName
        // let qUser = 'supriya'
        connection.query(qString, [qUser], (err, rows, fields) => {
            if (!err) {
                if (rows.length == 0) {
                    console.log("Rows: ",rows)
                    resData.message = "No user found...."
                    res.json(resData)
                }
                else {
                    console.log("Rows: " + rows)
                    let encrpPassword = crypto.createHash('sha1').update(req.body.password).digest('hex')
                    // let encrpPassword = crypto.createHash('sha1').update("1234").digest('hex')
                    if (encrpPassword === rows[0].password) {
                        // Removing old session
                        let oldCookie = req.cookies.sessionID
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
                                resData.loginSuccess = true
                                resData.message = "Login successfully done...."
                                res.json(resData)
                            }
                            else {
                                console.log(session_err)
                                resData.message = session_err
                                res.json(resData)
                            }
                        })
                    }
                    else {
                        console.log("Password not matched..")
                        resData.message = "Password not matched..."
                        res.json(resData)
                    }
                }
            }
            else {
                console.log(err)
                resData.message = err
                res.json(resData)
            }
        })
    },

    renderRegisterPage: function(req, res) {
        res.sendFile('register.html', {root: path.join(__dirname,'Page')})
    },

    register: function (req, res) {
        console.log("Register called....")
        let resData = {
            "registerSuccess": false,
            "message": ""
        }
        if(req.body.password === req.body.cnfPassword){
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
                                resData.registerSuccess = true
                                resData.message = "User registered..."
                                res.json(resData)
                            }
                            else {
                                console.log(err)
                                resData.message = err
                                res.json(resData)
                            }
                        })
                    }
                    else {
                        console.log("User already exits..")
                        resData.message = "User already exists.."
                        res.json(resData)
                    }
                }
                else {
                    console.log(err)
                    resData.message = err
                    res.json(resData)
                }
            })
        }
        else{
            resData.message = "Two passwords are not same.."
            res.json(resData)
        }
    },

    authenticatedUser: function(req) {
        console.log("is_authenticated called..")
        return new Promise((resolve, reject) => {
            let resultObj = {
                "is_authenticated": false,
                "userName": null
            }
            let sessionID = req.cookies.sessionID
            if(sessionID != undefined){
                resultObj.is_authenticated = true
                console.log(sessionID)
                let qString = 'SELECT user_name FROM session WHERE (session_value = ?);'
                connection.query(qString, [sessionID], (err, rows, fields) => {
                    resultObj.userName = rows[0].user_name
                    resolve(resultObj)
                })
            }
            else{
                resolve(resultObj)
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
