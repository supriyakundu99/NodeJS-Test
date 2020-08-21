function getCSRF_Token() {
    console.log("Get CSRF token called..")
    $.ajax({
        type: "GET",
        url: "/account/getCSRFToken",
        success: (res) => {
            console.log("success.....");
            console.log(res)
        },
        error: (res) => {
            console.log("Error...");
            console.log(res);
        }
    })
}