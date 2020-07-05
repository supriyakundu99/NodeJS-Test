const connection = require('../Database/dbConnection')

module.exports = {
    "fetchAll": function(req,res){
        connection.query('SELECT * FROM test;', (err, rows, fields) => {
            if(!err) res.send(rows)
            else res.send(err)
        })
    }
}