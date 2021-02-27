const mysql = require('mysql')

const connection = mysql.createConnection({
    host: '192.168.0.3',
    port: 3306,
    user: 'Supriya',
    password: 'sk1234',
    database: 'studentdb',

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