const idUrl = location.href.split('email=')[1];

$('#login-post').click(function () {
    $.ajax({
        url: `${urlBack}/${idUrl}`,
        type: 'get',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(
            {
                password: $('#newPassReset').val(),
            }),
        success: function () {
            window.location.href = "index.html";
        }
    });
});