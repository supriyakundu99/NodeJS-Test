function doLogin(){
    console.log("DoLogin called....")
    $.ajax({
        type: "POST",
        url: "/account/login",
        data: {
            "userName": document.getElementById("userName").value,
            "password": document.getElementById("password").value
        },
        success: (res) => {
            console.log("success.....");
            console.log(res)
        },
        error: function (res) {
            console.log("Error...");
            console.log(res);
        }
    });
}
