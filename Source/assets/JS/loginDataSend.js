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
            console.log(res)
            msgEle.setAttribute("style", "color: green;")
            msgEle.innerHTML = res.message
            location.replace('/')
        },
        error: function (res) {
            console.error(res.responseJSON);
            msgEle.setAttribute("style", "color: red;")
            msgEle.innerHTML = res.responseJSON.message
        }
    });
}
