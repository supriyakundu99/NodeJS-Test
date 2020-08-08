function doRegister(){
    console.log("DoRegister called....")
    $.ajax({
        type: "POST",
        url: "/account/register",
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
