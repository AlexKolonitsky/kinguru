(function($) {
  "use strict";
  $('#agree').click(function () {
    if($('#continue').is(':disabled')){
      $('#continue').prop('disabled',false);
      return;
    };
    $('#continue').prop('disabled',true);
  });

  $('#open-sing-up').click(function () {
    $('#login-content').addClass('show-content');
    $('#open-sign-up').removeClass('show-content');
  });
  $('#open-log-in').click(function () {
    $('#login-content').removeClass('show-content');
    $('#open-sign-up').addClass('show-content');
  });

  function checkPasswordMatch() {
    var password = $("#pass").val();
    var confirmPassword = $("#passch").val();

    if (password != confirmPassword)
      $("#divCheckPasswordMatch").html("<p class='pass match'>Passwords match</p>");
    else
      $("#divCheckPasswordMatch").html("<p class='pass not_match'>Passwords don't match</p>");
  };

  $(document).ready(function () {
    $("#pass, #passch").keyup(checkPasswordMatch);
  });
})(jQuery);

$('#continue').click( function() {
  event.preventDefault();
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

$('#login-post').click(function () {
  event.preventDefault();
  console.log('hello123');
  $.ajax({
    url: 'http://ec2-35-158-84-70.eu-central-1.compute.amazonaws.com:3010/user/login',
    type: 'post',
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(fillFormLogIn()),
    success: function(data) {
      saveToken(data.token);
      showHeaderContent(data.user);
      console.log(data.user);
    }
  });
});

function fillFormSingUp(postData) {
  postData = {
    username: document.getElementById('name').value,
    email: document.getElementById('email').value,
    country: document.getElementById('country').value,
    city: document.getElementById('city').value,
    phone: document.getElementById('phone').value,
    password: document.getElementById('pass').value,
  };
  return postData;
};

function fillFormLogIn(postData) {
  postData = {
    email: document.getElementById('email-login').value,
    password: document.getElementById('pass').value,
  };
  console.log(postData);
  return postData;
};

function saveToken(token) {
  $('#modal_close').click();
  localStorage.setItem('Token', token);
  console.log(localStorage.getItem('Token'));
};

function showHeaderContent(user) {
    const userContent =
        `<div class="col-lg-4 col-md-2 col-2 d-lg-inline-block d-none user-content">` +
        `<div class="dropdown">` +
        `<a href="#" class="dropdown-toggle" data-toggle="dropdown">` +
        `<img class="img-fluid rounded-circle" src="img/review-1.jpg" alt="profile photo"/>` +
        `</a>` +
        `<div class="dropdown-menu dropdown-menu-left" aria-labelledby="dropdownMenuButton">` +
        `<a class="dropdown-item" href="#"` +
        `><i class="fa fa-user-circle"></i> My profile</a>` +
    `<a class="dropdown-item" href="#"` +
        `><i class="fa fa-envelope"></i> Message</a>` +
    `<a class="dropdown-item" href="#"` +
        `><i class="fa fa-cog"></i> Another action</a>` +
    `<div class="dropdown-divider"></div>` +
        `<button id="logOut" class="dropdown-item"` +
        `><i class="fa fa-sign-out"></i> Logout</button>` +
    `</div>` +
    `<div class="d-md-none d-lg-inline-block d-none">` +
        `<p class="user-name">${user.username}</p>` +
    `</div>` +
    `</div>` +
    `</div>`;
  $('.sotial').after(userContent);
  $('#login-block').addClass('show-content');

  $('#logOut').click(function () {
    console.log('Clikc HEAR');
    $('.user-content').remove();
    $('#login-block').removeClass('show-content');
  });
};

