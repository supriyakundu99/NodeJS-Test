function doRegister(){
    console.log("DoRegister called....")
    $.ajax({
        type: "POST",
        url: "/account/register",
        data: {
            "userName": document.getElementById("userName").value,
            "password": document.getElementById("password").value,
            "cnfPassword": document.getElementById("cnfPassword").value
        },
        success: (res) => {
            console.log("success.....");
            console.log(res)
            if(res.registerSuccess){
                document.getElementById("success").innerHTML = res.message
                location.replace('/account/login')
            }
            else{
                document.getElementById("failure").innerHTML = res.message
            }
        },
        error: function (res) {
            console.log("Error...");
            console.log(res);
        }
    });
}
