function fetchUser() {
    console.log("Fetch User called......")
    $.ajax({
        type: "GET",
        url: "/fetchUserDetails",
        success: (res) => {
            console.log("success.....");
            console.log(res)
            if(res.is_authenticated) {
                document.getElementById("user").innerHTML = res.userName
            }
        },
        error: function (res) {
            console.log("Error...");
            console.log(res);
        }
    });
}