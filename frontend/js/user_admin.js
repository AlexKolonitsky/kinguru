(function ($) {
  "use strict";

  $(document).ready(function () {
    $(".side").click(function () {
      $('.side').each(function () {
        $(this).removeClass('active');
      });
      $(this).addClass('active');
    });
  });

  $(document).ready(function () {
    $("#spy").on("click", "a", function (event) {
      event.preventDefault();
      var id = $(this).attr('href'),
        top = $(id).offset().top;
      $('body,html').animate({scrollTop: top}, 1500);
    });
  });
  $(document).ready(function () {
    $("#new-pass, #confirm-pass").keyup(checkPasswordMatch);
  });

  function checkPasswordMatch() {
    var password = $("#new-pass").val();
    var confirmPassword = $("#confirm-pass").val();

    if (password == confirmPassword)
      $("#CheckPasswordMatch").html("<p class='pass match confirm-pass'>Passwords match</p>");
    else
      $("#CheckPasswordMatch").html("<p class='pass not_match confirm-pass'>Passwords don't match</p>");
  };


})(jQuery);

let token = localStorage.getItem('Token');
token = `Bearer ${token}`;

$.ajax({
  url: `${urlBack}/user/current`,
  headers: {
    'Authorization': token,
  },
  type: 'get',
  dataType: 'json',
  contentType: "application/json; charset=utf-8",
  success: function (data) {
     userInformation(data.user);
  },
});

$('.change-pass').click(function () {
  event.preventDefault();
  $.ajax({
    url: `${urlBack}/user/change/password`,
    headers: {
      'Authorization': token,
    },
    type: 'post',
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(changePass()),
    success: function (data) {
      successChgangePass();
    },
    error: function () {
      $('#old-pass-error').html("<p class='pass not_match error-old-pass'>Old password don't match</p>");
    },
  });
});



function userInformation(information) {
  if (!information.location) {
    information.location = {
      country: '',
      city: '',
      address: '',
      zipCode: '',
    }
  }

  let date = new Date(information.birthday);
  let year = date.getFullYear();
  let month = date.getMonth()+1;
  let dt = date.getDate();

  if (dt < 10) {
    dt = '0' + dt;
  }
  if (month < 10) {
    month = '0' + month;
  }

  const personalInfo =
    `    <div class="col-md-9 well" id="user-info-content">` +
    `    <legend id="pers_info" class="">Personal information</legend>` +
    `  <input name="myFile" type="file" id="file" class="input_file">` +
    `    <label class="load_file" for="file"><img src="${information.coverSource}" id="image" class="img-fluid rounded-circle mx-auto"></label>` +
    `    <div class="row">` +
    ` <div class="checkbox-label col-lg-8 col-12">`+
    `  <p class="">I want to be a speaker</p>` +
    ` <input class="input-switch input_field" id="switch2" type="checkbox" checked="checked"/>` +
    ` <label class="switch2" for="switch2">`+
    ` <span class="switch-label off">No</span>`+
    ` <span class="switch-label on">Yes</span>`+
    ` <span class="grip"></span>`+
    ` </label>`+
    ` </div>`+
    ` <div class="checkbox-label col-lg-8 col-12">`+
    `  <p class="">I want to create meetup</p>` +
    ` <input class="input-switch input_field" id="switch3" type="checkbox" checked="checked"/>` +
    ` <label class="switch2" for="switch3">`+
    ` <span class="switch-label off">No</span>`+
    ` <span class="switch-label on">Yes</span>`+
    ` <span class="grip"></span>`+
    ` </label>`+
    ` </div>`+
    `    <p type="Gender" class="col-lg-8 col-12">` +
    `    <select id="gender-user" class="select_field">` +
    `    <option hidden selected value>${information.gender}</option>` +
    `  <option value="Male">Male</option>` +
    `    <option value="Female">Female</option>` +
    `    </select>` +
    `    </p>` +
    `    <p class="col-lg-4 col-0">` +
    `    </p>` +
    `    </div>` +
    `    <div class="row">` +
    `    <p type="First name*" class="col-lg-8 col-12">` +
    `    <input id="first-name" class="input_field" name="fname" type="text" value="${information.firstname}" required/>` +
    `  </p>` +
    `  <p class="col-lg-4 col-0">` +
    `    </p>` +
    `    </div>` +
    `    <div class="row">` +
    `    <p type="Last name*" class="col-lg-8 col-12">` +
    `    <input id="last-name" class="input_field" name="lname" type="text" value="${information.lastname}" required/>` +
    `  </p>` +
    `  <p class="col-lg-4 col-0">` +
    `    </p>` +
    `    </div>` +
    `    <div class="row">` +
    `    <p type="Country" class="col-lg-8 col-12">` +
    `    <input id="country-user" class="input_field" name='country' type="text" value="${information.location.country || ''}" required/>` +
    `  </p>` +
    `  <p type="City" class="col-lg-4 col-12">` +
    `    <input class="input_field" name='city' type="text" value="${information.location.city || ''}"/>` +
    `    </p>` +
    `    </div>` +
    `    <div class="row">` +
    `    <p type="Address" class="col-lg-8 col-12">` +
    `    <input class="input_field" name='address' type="text" value="${information.location.address || ''}"/>` +
    `    </p>` +
    `    <p type="Zip code" class="col-lg-4 col-12">` +
    `    <input class="input_field" name='z-code' type="number" value="${information.location.zipCode || ''}"/>` +
    `    </p>` +
    `    </div>` +
    `    <div class="row">` +
    `    <p type="Birthday" class="col-lg-8 col-12">` +
    `    <input class="input_field" name="expertise" id="birthday-user" type="date" value="${year+'-' + month + '-'+dt}"/>` +
    `    </p>` +
    `    <p class="col-lg-4 col-0">` +
    `    </p>` +
    `    </div>` +
    `    <div class="row">` +
    `    <p type="Phone number*" class="col-lg-8 col-12">` +
    `    <input id="phone-user" name="phone" class="input_field" type="number" value="${information.phone || ''}" required/>` +
    `  </p>` +
    `  <p class="col-lg-4 col-0">` +
    `    </p>` +
    `    </div>` +
    `    <div class="row">` +
    `    <p type="Email*" class="col-lg-8 col-12">` +
    `    <input id="email-user" name="email" class="input_field" type="email" value="${information.email || ''}" disabled/>` +
    `  </p>` +
    `  <p class="col-lg-4 col-0">` +
    `    </p>` +
    `    </div>` +
    `  <div class="row">`+
    `  <p type="Cost per hour" class="col-12"></p>`+
    `  <div class="col-8 row">`+
    `  <label class="cost-from_to-set" for="cost_from">from</label>`+
    `  <input class="input_field cost-from_to-set" id="cost_from" type="text" name="mySpeaker">`+
    `  <label class="cost-from_to-set" for="cost_to">to</label>`+
    `  <input class="input_field cost-from_to-set" id="cost_to" type="text" name="mySpeaker">`+
    ` <p class="cost-from_to">$</p>`+
    ` </div>`+
    `    </div>` +
    ` <div class="row">`+
    ` <p type="Language" class="col-12"></p>`+
    ` <div class="col-8 row check-toolbar-1">`+
    `   <div class="my-auto speaker-lang">`+
    `     <input type="checkbox" id="check1" name="radios-forth" value="all" checked/>`+
    `     <label for="check1" class="text-center pointer">En</label>`+
    `   </div>`+
    `   <div class="my-auto speaker-lang">`+
    `     <input type="checkbox" id="check2" name="radios-forth" value="all"/>`+
    `     <label for="check2" class="text-center pointer">Rus</label>`+
    `   </div>`+
    `   <div class="my-auto speaker-lang">`+
    `    <input type="checkbox" id="check3" name="radios-forth" value="all"/>`+
    `    <label for="check3" class="text-center pointer">Bel</label>`+
    ` </div>`+
    ` </div>`+
    ` </div>`+
    `    <div class="row">` +
    `    <p type="About me*" class="col-12">` +
    `    <textarea placeholder="About me" rows="5" wrap="off">${information.description || ''}</textarea>` +
    `    </p>` +
    `    </div>` +
    `    </div>` +
    `    <div class="col-md-9 well">` +
    `    <legend id="pers_interest" class="">Competenies and interests</legend>` +
    `  <div class="row">` +
    `    <p type="Industry*" class="col-lg-8 col-12">` +
    `    <input class="input_field" name="occupation" type="text"/>` +
    `    </p>` +
    `    <p class="col-lg-4 col-0">` +
    `    </p>` +
    `    </div>` +
    `    <div class="row">` +
    `    <p type="Company" class="col-lg-8 col-12">` +
    `    <input class="input_field" name="company" type="text" value="${information.company || ''}"/>` +
    `    </p>` +
    `    <p class="col-lg-4 col-0">` +
    `    </p>` +
    `    </div>` +
    `    <div class="row">` +
    `    <p type="Job title*" class="col-lg-8 col-12">` +
    `    <input class="input_field" name="jobTitle" type="text" value=""/>` +
    `    </p>` +
    `    <p class="col-lg-4 col-0">` +
    `    </p>` +
    `    </div>` +
    `    <div class="row">` +
    `    <p type="Expertise" class="col-lg-8 col-12">` +
    `    <input class="input_field" name="expertise" type="search"/>` +
    `    </p>` +
    `    <p class="col-lg-4 col-0">` +
    `    </p>` +
    `    </div>` +
    `    <div class="row">` +
    `    <p type="Interest" class="col-lg-8 col-12">` +
    `    <input class="input_field" name="interest" type="search"/>` +
    `    </p>` +
    `    <p class="col-lg-4 col-0">` +
    `    </p>` +
    `    </div>` +
    `    </div>` +
    `    <div class="col-md-9 well">` +
    `    <legend id="pers_connection" class="">Social connection</legend>` +
    `  <div class="row">` +
    `    <p type="Linked in" class="col-lg-8 col-12">` +
    `    <input class="input_field" name="linked" type="text"/>` +
    `    </p>` +
    `    <p class="col-lg-4 col-0">` +
    `    </p>` +
    `    </div>` +
    `    <div class="row">` +
    `    <p type="Facebook" class="col-lg-8 col-12">` +
    `    <input class="input_field" name="facebook" type="text" value="${information.facebookLink || ''}"/>` +
    `    </p>` +
    `    <p class="col-lg-4 col-0">` +
    `    </p>` +
    `    </div>` +
    `    <div class="row">` +
    `    <p type="Instagram" class="col-lg-8 col-12">` +
    `    <input class="input_field" name="insta" type="text" value="${information.instagramLink || ''}"/>` +
    `    </p>` +
    `    <p class="col-lg-4 col-0">` +
    `    </p>` +
    `    </div>` +
    `    <div class="row">` +
    `    <p type="Website" class="col-lg-8 col-12">` +
    `    <input class="input_field" name="website" type="text" value="${information.website || ''}"/>` +
    `    </p>` +
    `    <p class="col-lg-4 col-0">` +
    `    </p>` +
    `    </div>` +
    `    </div>`;

  $('#personal-info').append(personalInfo);

  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $('#image').attr('src', e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
  $("#file").change(function(){
    readURL(this);
  });
};

function changePass(data) {
  data = {
    old: document.getElementById('past-pass').value,
    new: document.getElementById('new-pass').value,
    confirm: document.getElementById('confirm-pass').value,
  };
  return data;
};

function successChgangePass() {
  $("#change-pass-form")[0].reset();
  $('.confirm-pass').remove();
  $('.error-old-pass').remove();
  $('#success-change').html("<p class='pass match'>Change password success</p>");
};

$('#update-account').click(function () {
  let fd = new FormData();

  fd.append( 'image', $('#file')[0].files[0]);
  fd.append( 'firstname', document.getElementById('first-name').value);
  fd.append( 'gender', $('#gender-user option:selected').text());
  fd.append( 'lastname', document.getElementById('last-name').value);
  fd.append( 'country', document.getElementById('country-user').value);
  fd.append( 'birthday', document.getElementById('birthday-user').value);
  fd.append( 'phone', document.getElementById('phone-user').value);
  fd.append('email', document.getElementById('email-user').value);


  $.ajax({
    url: `${urlBack}/user/update`,
    data: fd,
    headers: {
      'Authorization': token,
    },
    processData: false,
    contentType: false,
    type: 'POST',
    success: function(data){
      $('#personal-info').empty();
      userInformation(data.user);
      $("#success-save-user").html("<p class='pass match'>Save success</p>");
    }
  });
});
