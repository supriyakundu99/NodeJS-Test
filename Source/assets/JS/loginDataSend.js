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
            console.log("success.....")
            console.log(res)
            if(res.loginSuccess){
                location.replace('/')
            }
            else{
                document.getElementById("failure").innerHTML = res.message
            }
        },
        error: function (res) {
            console.log("Error...")
            console.log(res);
        }
    });
}
