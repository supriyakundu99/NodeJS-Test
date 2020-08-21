const randomString = require('randomstring')
const random = require('random')
const crypto = require('crypto')

let randStr = randomString.generate(216)
console.log(randStr, randStr.length)

let encrpUser = crypto.createHash('sha1').update("sdsdsdds234reqwrqwe v").digest('hex')
console.log(encrpUser, encrpUser.length)



let string = "ioswfiowf"
if (string.includes("ioswfiowf")) {
    console.log("Yes")
} else {
    console.log("No")
}

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

console.log("--------CSRF")
console.log(csrf_key, csrf_key.length)
