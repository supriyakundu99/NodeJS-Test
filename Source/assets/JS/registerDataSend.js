function doRegister(){
    console.log("DoRegister called....")
    let msgEle = document.getElementById("msg")
    
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
                msgEle.setAttribute("style", "color: green;")
                msgEle.innerHTML = res.message
                location.replace('/account/login')
            }
            else{
                msgEle.setAttribute("style", "color: red;")
                msgEle.innerHTML = res.message
            }
        },
        error: function (res) {
            console.log("Error...");
            console.log(res);
        }
    });
}
