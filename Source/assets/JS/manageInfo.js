function manageStudentInfo() {
    console.log("Manage function info called....")
    $.ajax({
        type: "POST",
        url: '/student/info',
        data: {
            "csrfToken": document.getElementById("csrfToken").value,
            "stuName": document.getElementById("stuName").value,
            "class": document.getElementById("class").value,
            "stream": document.getElementById("stream").value,
        },
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