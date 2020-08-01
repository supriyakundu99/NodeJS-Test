module.exports = {

    "login": function(req, res){
        console.log("Login called...")
        res.send(req.body);
    }

}