const mysql = require('mysql')
require('dotenv').config()

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERMANE,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

connection.connect((err) => {
    if (!!err) {
        console.log("Database is not connected..." + err)
    }
    else {
        console.log("Database Connected...")
    }
})

module.exports = connection