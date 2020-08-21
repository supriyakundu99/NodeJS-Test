const randomString = require('randomstring')
const random = require('random')
const crypto = require('crypto')
const { authenticatedUser } = require('../Auth/authOperations')

module.exports = {

    generateCSRF: function (userName) {
        let randStr = randomString.generate(216)
        let encrpUser = crypto.createHash('sha1').update(userName).digest('hex')
        let randArr = []
        for (i = 0; i < 3; i++) {
            randArr.push(random.int(10, 210))
        }
        randArr.sort((a, b) => a - b)
        let csrf_key = (
            randStr.slice(0, randArr[0]) + encrpUser.slice(0, 10)
            + randStr.slice(randArr[0], randArr[1]) + encrpUser.slice(10, 20)
            + randStr.slice(randArr[1], randArr[2]) + encrpUser.slice(20, 30)
            + randStr.slice(randArr[2], 216) + encrpUser.slice(30, 40)
        )
        return csrf_key
    },

    deliverToken: function (req, res) {
        authenticatedUser(req).then((data) => {
            console.log(data)
            if (data.is_authenticated) {
                res.json(data)
            }
            else {
                res.json({ "csrfToken": null })
            }
        })
    }
}
