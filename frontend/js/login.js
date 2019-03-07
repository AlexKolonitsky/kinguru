(function($) {
  "use strict";
  $(document).ready(function(){
    $('#continue').prop('disabled', true);
    $('#agree').change(function() {
      $('#continue').prop('disabled', function(i, val) {
        return !val;
      })
    });
  })

  $('#open-sing-up').click(function () {
    $('#login-content').addClass('show-content');
    $('#open-sign-up').removeClass('show-content');
  });

  function checkPasswordMatch() {
    var password = $("#pass").val();
    var confirmPassword = $("#passch").val();

    if (password != confirmPassword)
      $("#divCheckPasswordMatch").html("<p class='pass not_match'>Passwords do not match</p>");
    else
      $("#divCheckPasswordMatch").html("<p class='pass match'>Passwords match</p>");
  }

  $(document).ready(function () {
    $("#pass, #passch").keyup(checkPasswordMatch);
  });
})(jQuery);

$('#continue').click( function() {
  event.preventDefault();
  console.log('hello');
  $.ajax({
    url: 'http://ec2-35-158-84-70.eu-central-1.compute.amazonaws.com:3010/user/register',
    type: 'post',
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(fillFormSingUp()),
    success: function(data) {
      console.log(data);
    }
  });
});

function fillFormSingUp(postData) {
  postData ={
    username: document.getElementById('name').value,
    email: document.getElementById('email').value,
    country: document.getElementById('country').value,
    city: document.getElementById('city').value,
    phone: document.getElementById('phone').value,
    password: document.getElementById('pass').value,
  };
  console.log(postData);
  return postData;
}