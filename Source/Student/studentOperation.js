const connection = require("../../Database/dbConnection");
const path = require('path')
const { authenticatedUser } = require("../Auth/authOperations")
const { validateCSRF } = require('../Auth/securityOperations')

module.exports = {
    renderInfoPage: function (req, res) {
        res.sendFile('info.html', { root: path.join(__dirname, 'Page') })
    },

    manageInfo: function (req, res) {
        let csrfval = true
        let resobj = {
            "infoInsert": false,
            "csrf_validation": false,
            "message": " "
        }
        validateCSRF(req).then((data) => {
            console.log(data);
            if (data.isCSRF_valid) {
                resobj.csrf_validation = true
                if (data.valid_user) {
                    let qString = 'SELECT count(user_name) AS user_count FROM student_info where (user_name = ?);'
                    let qUser = data.valid_user
                    connection.query(qString, [qUser], (errCnt, rowsCnt, fieldsCnt) => {
                        if (!errCnt) {
                            if (rowsCnt[0].user_count == 0) {
                                qString = 'INSERT INTO `studentdb`.`student_info` (`user_name`, `name`, `class`, `stream`) VALUES (?,?,?,?);'
                                connection.query(qString, [qUser, req.body.stuName, req.body.class, req.body.stream], (err, rows, fields) => {
                                    if (!err) {
                                        resobj.infoInsert = true
                                        resobj.message = "Info insertion success..."
                                        res.status(200).json(resobj)
                                    }
                                    else {
                                        console.log(err)
                                        resobj.message("Info insertion error...")
                                        res.status(500).json(resobj)
                                    }
                                })
                            }
                            else {
                                qString = 'UPDATE `studentdb`.`student_info` SET `name` = ?, `class` = ?, `stream` = ? WHERE (`user_name` = ?);'
                                connection.query(qString, [req.body.stuName, req.body.class, req.body.stream, qUser], (err, rows, fields) => {
                                    if (!err) {
                                        resobj.infoInsert = true
                                        resobj.message = "Info updation success..."
                                        res.status(200).json(resobj)
                                    }
                                    else {
                                        console.log(err)
                                        resobj.message("Info updation error...")
                                        res.status(500).json(resobj)
                                    }
                                })
                            }
                        }
                        else {
                            resobj.message("Error in row count...")
                            res.status(500).json(resobj)
                        }
                    })
                }
                else {
                    resobj.message("User not found....")
                    res.status(400).json(resobj)
                }
            }
            else {
                resobj.message = "CSRF validation error..."
                res.status(400).json(resobj)
            }
        })
    }

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
