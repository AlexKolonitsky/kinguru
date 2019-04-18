(function ($) {
  "use strict";
  $('#agree').click(function () {
    if ($('#continue').is(':disabled')) {
      $('#continue').prop('disabled', false);
      return;
    }
    ;
    $('#continue').prop('disabled', true);
  });

  $('#open-sing-up').click(function () {
    event.preventDefault();
    $('#login-content').addClass('hide-content');
    $('#open-sign-up').removeClass('hide-content');
  });
  $('#open-log-in').click(function () {
    event.preventDefault();
    $('#login-content').removeClass('hide-content');
    $('#open-sign-up').addClass('hide-content');
  });
  $('#forgot-pass').click(function () {
    event.preventDefault();
    $('#login-content').addClass('hide-content');
    $('#open-reset-pass').removeClass('hide-content');
  });
  $('.back-sign_in').click(function () {
    event.preventDefault();
    $('#login-content').removeClass('hide-content');
    $('#open-reset-pass').addClass('hide-content');
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

  $('#modal_close').click(function () {
    event.preventDefault();
    $('#error-login').empty();
    $('#email-login').val('');
    $('#passw-login').val('');
  });
})(jQuery);

let userId = '';

function getUser(token) {
  $.ajax({
    url: `${urlBack}/user/current`,
    headers: {
      'Authorization': token,
    },
    type: 'get',
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      showHeaderContent(data.user);
        userId = data.user.id;
    },
    error: function () {
      localStorage.setItem('Token', '');
      $('#login-block').removeClass('hide-content');
    }
  });
};

$( document ).ready(function() {
  window.addEventListener("load", function () {
    let token = localStorage.getItem('Token');
    console.log(token);
    if (token) {
      console.log('work');
      token = `Bearer ${token}`;
      getUser(token);
    } else {
      $('#login-block').removeClass('hide-content');
      $('#notAuthorization').html("<p class='pass not_match'>For create event you can <a href='#' id='create-event_authorization'>authorize</a></p>");
    }
  });
});



$('#continue').click(function () {
  event.preventDefault();
  $("#error-sugn-up").empty();
  elementsValidation = ['email', 's-name', 'name', 'pass-sugn-up', 'passch', 'birthday-sign-up'];
  elementsValidation.forEach(component => {
    document.getElementById(`${component}`).value.length < 1 ? $(`#${component}`).addClass('validation-input') : $(`#${component}`).removeClass('validation-input');
  });
  $.ajax({
    url: `${urlBack}/user/register`,
    type: 'post',
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(fillFormSingUp()),
    success: function (text) {
      if (text.status === 200) {
        $('#modal_close').click();
      }
    },
    error: function (jqXHR) {
      if (jqXHR.status === 401) {
        $("#error-sugn-up").html("<p class='pass not_match'>The user with email has already been registered</p>");
      } else if (jqXHR.status === 400) {
        $("#error-sugn-up").html("<p class='pass not_match'>Fill all field</p>");
      } else if (jqXHR.status === 200) {
        $('#modal_close').click();
      }
    }

  });
});

$('#login-post').click(function () {
  event.preventDefault();
  $.ajax({
    url: `${urlBack}/user/login`,
    type: 'post',
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(fillFormLogIn()),
    success: function (data) {
      saveToken(data.token);
      showHeaderContent(data.user);
      $('#login-block').addClass('hide-content');
      $('#createMeetup').attr('disabled', false);
      $('#notAuthorization').empty();
    },
    error: function (jqXHR) {
      if (jqXHR.status === 401) {
        $('#error-login').empty();
        $('#error-login').html("<p class='pass not_match error-login'>Please confirm your email to login</p>");
      } else if (jqXHR.status === 400) {
        $('#error-login').empty();
        $('#error-login').html("<p class='pass not_match error-login'>Incorrect email or password</p>");
      }
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
    birthday: document.getElementById('birthday-sign-up').value,
    link: location.hostname === 'localhost' ? `${location.origin}/kinguru/frontend/build/confirmation.html`: `${location.origin}/confirmation.html`,
  };
  return postData;
};

function fillFormLogIn(postData) {
  postData = {
    email: document.getElementById('email-login').value,
    password: document.getElementById('passw-login').value,
  };
  return postData;
};

function saveToken(token) {
  $('#modal_close').click();
  localStorage.setItem('Token', token);
};

function showHeaderContent(user) {
  const userContent =
    `<div class="col-lg-4 col-md-2 col-2 d-lg-inline-block d-none user-content">` +
    `<div class="dropdown">` +
    `<a href="#" class="dropdown-toggle" data-toggle="dropdown">` +
    `<img class="img-fluid rounded-circle" src="${user.coverSource ? user.coverSource : 'img/default-user-image.png'}" alt="profile photo"/>` +
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
  $('#login-block').after(userContent);
  // $('#login-block').addClass('hide-content');


  $('#logOut').click(function () {
    $('.user-content').remove();
    $('#login-block').removeClass('hide-content');
    $('#createMeetup').attr('disabled', true);
    $('#notAuthorization').html("<p class='pass not_match'>To create an event you have to be authorized</p>");
    localStorage.setItem('Token', '');
    if ($('form').is('#change-pass-form')) {
      window.location.href = "index.html";
    }
  });
};

$('#reset').click(function () {
  event.preventDefault();
  $('.infoMessage').empty();
  $.ajax({
    url: `${urlBack}/user/reset-password`,
    type: 'post',
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(
        {
            email: $('#emailReset').val(),
          link: location.hostname === 'localhost' ? `${location.origin}/kinguru/frontend/build/newPass.html`: `${location.origin}/newPass.html`,
        }),
    success: function () {
      $('#modal_close').click();
    },
    error: function (jqXHR) {
      if (jqXHR.status === 404) {
        $("#resetInfo").html("<p class='pass not_match infoMessage'>`${jqXHR.responseText}`</p>");
      } else if (jqXHR.status === 400) {
        $("#resetInfo").html("<p class='pass not_match infoMessage'>Please fill your email</p>");
      } else if(jqXHR === 200) {
        $('#modal_close').click();

      }
    }

  });
})
