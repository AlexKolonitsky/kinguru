const idUrl = location.href.split('email=')[1];

function checkPasswordMatch() {
    var password = $("#newPassReset").val();
    var confirmPassword = $("#newConformPassReset").val();

    if (password === confirmPassword) {
        $("#newPassInfo").html("<p class='pass match newPassInfo'>Passwords match</p>");
        $('#login-post').attr('disabled', false);
    } else {
        $("#newPassInfo").html("<p class='pass not_match newPassInfo'>Passwords don't match</p>");
        $('#login-post').attr('disabled', true);
    }
}

$(document).ready(function () {
    $("#newPassReset, #newConformPassReset").keyup(checkPasswordMatch);
});

$('#login-post').click(function () {
    event.preventDefault();
    $.ajax({
        url: `${urlBack}/user/new-password/${idUrl}`,
        type: 'post',
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