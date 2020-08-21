const connection = require("../../Database/dbConnection");
const path = require('path')

module.exports = {
    renderInfoPage: function (req, res) {
        res.sendFile('info.html', { root: path.join(__dirname, 'Page') })
    },

    // fetchAll: function (req, res) {
    //     connection.query("SELECT * FROM test;", (err, rows, fields) => {
    //         if (!err) res.send(rows);
    //         else res.send(err);
    //     });
    // },

    // fetchUsingID: function (req, res) {

    //     qstring = "SELECT * FROM test where (id = ?);";
    //     stuid = req.params.id;
    //     connection.query(qstring, [stuid], (err, rows, fields) => {
    //         if (!err) res.send(rows);
    //         else {
    //             console.log(err);
    //             res.send(err);
    //         }
    //     });
    // },

    // insertStudent: function (req, res) {
    //     qstring = "INSERT INTO test (`name`, `city`) VALUES (?,?);";
    //     student = req.body;
    //     connection.query(
    //         qstring,
    //         [student.name, student.city],
    //         (err, rows, fields) => {
    //             if (!err) res.send(rows);
    //             else {
    //                 console.log(err);
    //                 res.send(err);
    //             }
    //         }
    //     );
    // },

    // updateStudent: function (req, res) {
    //     qstring = "UPDATE test SET name = ? , city = ? WHERE (id = ?);";
    //     stuid = req.params.id;
    //     connection.query(
    //         qstring,
    //         [req.body.name, req.body.city, stuid],
    //         (err, rows, fields) => {
    //             if (!err) res.send(rows);
    //             else {
    //                 console.log(err);
    //                 res.send(err);
    //             }
    //         }
    //     );
    // },

    // deleteStudent: function (req, res) {
    //     qstring = "DELETE FROM test WHERE (id = ?);";
    //     stuid = req.params.id;
    //     connection.query(qstring, [stuid], (err, rows, fields) => {
    //         if (!err) res.send(rows);
    //         else {
    //             console.log(err);
    //             res.send(err);
    //         }
    //     });
    // },
};
