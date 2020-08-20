function doLogin() {
    console.log("DoLogin called....")
    let msgEle = document.getElementById("msg")

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
            if (res.loginSuccess) {
                msgEle.setAttribute("style", "color: green;")
                msgEle.innerHTML = res.message
                location.replace('/')
            }
            else {
                msgEle.setAttribute("style", "color: red;")
                msgEle.innerHTML = res.message
            }
        },
        error: function (res) {
            console.log("Error...")
            console.log(res);
        }
    });
}
