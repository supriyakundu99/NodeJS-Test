const random = require('random')
const connection = require('../../Database/dbConnection')
const { authenticatedUser } = require('./authOperations')

module.exports = {
    deliverToken: function (req, res) {
        authenticatedUser(req).then((data) => {
            console.log(data)
            if (data.is_authenticated) {
                qString = 'SELECT csrf_key FROM auth_users WHERE (user_name = ?)'
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
    }
}