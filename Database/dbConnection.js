const mysql = require('mysql')

const connection = mysql.createConnection({
    host: '192.168.0.3',
    port: 3307,
    user: 'Supriya',
    password: 'sk1234',
    database: 'StudentDB',

})

module.exports = connection