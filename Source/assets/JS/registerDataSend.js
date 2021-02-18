function doRegister() {
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
            msgEle.setAttribute("style", "color: green;")
            msgEle.innerHTML = res.message
            location.replace('/account/login')

        },
        error: function (res) {
            console.error(res.responseJSON);
            msgEle.setAttribute("style", "color: red;")
            msgEle.innerHTML = res.responseJSON.message
        }
    });
}
