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
  $('#forgot-pass').click(function () {
    $('#login-content').addClass('show-content');
    $('#open-reset-pass').removeClass('show-content');
  });
  $('.back-sign_in').click(function () {
    $('#login-content').removeClass('show-content');
    $('#open-reset-pass').addClass('show-content');
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

function getUser(token) {
  $.ajax({
    url: 'http://ec2-35-158-84-70.eu-central-1.compute.amazonaws.com:3010/user/current',
    headers: {
      'Authorization': token,
    },
    type: 'get',
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      showHeaderContent(data.user);
    },
  });
};

window.addEventListener("load", function () {
  let token = localStorage.getItem('Token');
  if(token !== '') {
    token = `Bearer ${token}`;
    getUser(token);
  }else {
    $('#login-block').removeClass('show-content');

  }
});

$('#continue').click( function() {
  event.preventDefault();
  document.getElementById('name').value.length < 1 ? $('#name').addClass('validation-input') : $('#name').removeClass('validation-input');
  document.getElementById('s-name').value.length < 1 ? $('#s-name').addClass('validation-input') : $('#s-name').removeClass('validation-input');
  document.getElementById('email').value.length < 1 ? $('#email').addClass('validation-input') : $('#email').removeClass('validation-input');
  document.getElementById('country').value.length < 1 ? $('#country').addClass('validation-input') : $('#country').removeClass('validation-input');
  document.getElementById('city').value.length < 1 ? $('#city').addClass('validation-input') : $('#city').removeClass('validation-input');
  document.getElementById('phone').value.length < 1 ? $('#phone').addClass('validation-input') : $('#phone').removeClass('validation-input');
  document.getElementById('pass-sugn-up').value.length < 1 ? $('#pass-sugn-up').addClass('validation-input') : $('#pass-sugn-up').removeClass('validation-input');
  document.getElementById('passch').value.length < 1 ? $('#passch').addClass('validation-input') : $('#passch').removeClass('validation-input');


  $.ajax({
    url: 'http://ec2-35-158-84-70.eu-central-1.compute.amazonaws.com:3010/user/register',
    type: 'post',
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(fillFormSingUp()),
    success: function(data) {
    }
  });
});

$('#login-post').click(function () {
  event.preventDefault();
  $.ajax({
    url: 'http://ec2-35-158-84-70.eu-central-1.compute.amazonaws.com:3010/user/login',
    type: 'post',
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(fillFormLogIn()),
    success: function(data) {
      saveToken(data.token);
      showHeaderContent(data.user);
      location.reload();
    },
    error: function () {
      $('#error-login').html("<p class='pass not_match error-login'>Incorrect login or password</p>");
    }
  });
});

function fillFormSingUp(postData) {

  postData = {
    firstname: document.getElementById('name').value,
    lastname: document.getElementById('s-name').value,
    email: document.getElementById('email').value,
    country: document.getElementById('country').value,
    city: document.getElementById('city').value,
    phone: document.getElementById('phone').value,
    password: document.getElementById('pass-sugn-up').value,
  };
  return postData;
};

function fillFormLogIn(postData) {
  postData = {
    email: document.getElementById('email-login').value,
    password: document.getElementById('pass').value,
  };
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
        `<img class="img-fluid rounded-circle" src="${user.coverSource}" alt="profile photo"/>` +
        `</a>` +
        `<div class="dropdown-menu dropdown-menu-left" aria-labelledby="dropdownMenuButton">` +
        `<a class="dropdown-item" href="user_admin.html"` +
        `><i class="fa fa-user-circle"></i> My profile</a>` +
    `<a class="dropdown-item" href="#"` +
        `><i class="fa fa-envelope"></i> Message</a>` +
    `<a class="dropdown-item" href=""` +
        `><i class="fa fa-cog"></i> Another action</a>` +
    `<div class="dropdown-divider"></div>` +
        `<button id="logOut" class="dropdown-item"` +
        `><i class="fa fa-sign-out"></i> Logout</button>` +
    `</div>` +
    `<div class="d-md-none d-lg-inline-block d-none">` +
        `<p class="user-name">${user.firstname} ${user.lastname}</p>` +
    `</div>` +
    `</div>` +
    `</div>`;
  $('.sotial').after(userContent);
  $('#login-block').addClass('show-content');

  $('#logOut').click(function () {
    $('.user-content').remove();
    $('#login-block').removeClass('show-content');
    localStorage.setItem('Token', '');
    if($('form').is('#change-pass-form')) {
      window.location.href = "index.html";
      console.log('Work form');
    }
  });
};

