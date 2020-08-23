const random = require('random')
const connection = require('../../Database/dbConnection')
const { authenticatedUser } = require('./authOperations')

module.exports = {
    deliverToken: function (req, res) {
        authenticatedUser(req).then((data) => {
            console.log(data)
            if (data.is_authenticated) {
                let qString = 'SELECT csrf_key FROM auth_users WHERE (user_name = ?)'
                connection.query(qString, [data.userName], (err, rows, fields) => {
                    if (!err) {
                        let start = random.int(0, 192)
                        let end = start + 64
                        let csrfToken = (rows[0].csrf_key).slice(start, end)
                        console.log(csrfToken, csrfToken.length)
                        res.json({ "csrfToken": csrfToken })
                    }
                    else {
                        console.log(err)
                        res.json({ "csrfToken": null })
                    }
                })
            }
            else {
                res.json({ "csrfToken": null })
            }
        })
    },

    validateCSRF: function (req) {
        console.log("CSRF Validation function called.....")
        return new Promise((resolve, reject) => {
            let csrf_validation_result = {
                "isCSRF_valid": false,
                "valid_user": null,
                "message": " "
            }
            if (req.body.csrfToken) {
                let csrfToken = req.body.csrfToken
                if (csrfToken.length == 64) {
                    authenticatedUser(req).then((data) => {
                        if (data.is_authenticated) {
                            csrf_validation_result.valid_user = data.userName
                            let qString = 'SELECT csrf_key FROM auth_users WHERE (user_name = ?)'
                            connection.query(qString, [data.userName], (err, rows, fields) => {
                                if (!err) {
                                    if (rows[0].csrf_key.includes(csrfToken)) {
                                        csrf_validation_result.isCSRF_valid = true
                                        csrf_validation_result.message = "CSRF Validation success....."
                                        let new_Temp_token = csrfToken[63] + csrfToken.slice(1, 63) + csrfToken[0]
                                        let new_csrf_key = rows[0].csrf_key.replace(csrfToken, new_Temp_token)
                                        console.log("-------------------------")
                                        console.log(csrfToken, csrfToken.length)
                                        console.log(new_Temp_token, new_Temp_token.length)
                                        console.log(rows[0].csrf_key === new_csrf_key)
                                        console.log(new_csrf_key, new_csrf_key.length)
                                        console.log("-------------------------")
                                        let tempQString = 'UPDATE `studentdb`.`auth_users` SET `csrf_key` = ? WHERE (`user_name` = ?);'
                                        connection.query(tempQString, [new_csrf_key, data.userName], (tmpErr, tmpRow, tmpFields) => {
                                            if (!tmpErr) {
                                                console.log("New CSRF Key updated")
                                            }
                                            else {
                                                console.log("CSRF Key can not be updated")
                                            }
                                        })
                                        resolve(csrf_validation_result)
                                    }
                                    else {
                                        csrf_validation_result.message = "CSRF token length is not matched..."
                                        resolve(csrf_validation_result)
                                    }
                                }
                                else {
                                    console.log(err)
                                    csrf_validation_result.message = "DB operation error...."
                                    resolve(csrf_validation_result)
                                }
                            })
                        }
                        else {
                            csrf_validation_result.message = "No auth user found..."
                            resolve(csrf_validation_result)
                        }
                    })
                }
                else {
                    csrf_validation_result.message = "CSRF token length is not matched..."
                    resolve(csrf_validation_result)
                }
            }
            else {
                csrf_validation_result.message = "No CSRF token in post request..."
                resolve(csrf_validation_result)
            }
        })
    }
}