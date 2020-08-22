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
                    csrf_validation_result.message = "CSRF token is not matched..."
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