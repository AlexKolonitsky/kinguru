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
  url: 'http://ec2-35-158-84-70.eu-central-1.compute.amazonaws.com:3010/user/current',
  headers: {
    'Authorization': token,
  },
  type: 'get',
  dataType: 'json',
  contentType: "application/json; charset=utf-8",
  success: function (data) {
    console.log(data, 'user');
    userInformation(data.user);
  },
});

$('.change-pass').click(function () {
  event.preventDefault();
  $.ajax({
    url: 'http://ec2-35-158-84-70.eu-central-1.compute.amazonaws.com:3010/user/change/password',
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
})

function userInformation(information) {
  const personalInfo =
    `    <div class="col-md-9 well">` +
    `    <legend id="pers_info" class="">Personal information</legend>` +
    `  <input name="myFile" type="file" id="file" class="input_file">` +
    `    <label class="load_file" for="file"><img src="${information.coverSource}" class="img-fluid rounded-circle mx-auto"></label>` +
    `    <div class="row">` +
    `    <p type="Title*" class="col-lg-8 col-12">` +
    `    <select class="select_field">` +
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
    `    <input class="input_field" name="fname" type="text" value="${information.firstname}" required/>` +
    `  </p>` +
    `  <p class="col-lg-4 col-0">` +
    `    </p>` +
    `    </div>` +
    `    <div class="row">` +
    `    <p type="Last name*" class="col-lg-8 col-12">` +
    `    <input class="input_field" name="lname" type="text" value="${information.lastname}" required/>` +
    `  </p>` +
    `  <p class="col-lg-4 col-0">` +
    `    </p>` +
    `    </div>` +
    `    <div class="row">` +
    `    <p type="Country*" class="col-lg-8 col-12">` +
    `    <input class="input_field" name='country' type="text" value="${information.location.country}" required/>` +
    `  </p>` +
    `  <p type="City" class="col-lg-4 col-12">` +
    `    <input class="input_field" name='city' type="text" value="${information.location.city}"/>` +
    `    </p>` +
    `    </div>` +
    `    <div class="row">` +
    `    <p type="Address" class="col-lg-8 col-12">` +
    `    <input class="input_field" name='address' type="text" value="${information.location.address}"/>` +
    `    </p>` +
    `    <p type="Zip code" class="col-lg-4 col-12">` +
    `    <input class="input_field" name='z-code' type="number" value="${information.location.zipCode}"/>` +
    `    </p>` +
    `    </div>` +
    `    <div class="row">` +
    `    <p type="Birthday*" class="col-lg-8 col-12">` +
    `    <div class="fallbackDatePicker row">` +
    `    <div class="col-3">` +
    `    <select id="day" class="select_field" name="day" >` +
    `    </select>` +
    `    </div>` +
    `    <div class="col-5">` +
    `    <select id="month" class="select_field" name="month">` +
    `    <option selected>January</option>` +
    `  <option>February</option>` +
    `  <option>March</option>` +
    `  <option>April</option>` +
    `  <option>May</option>` +
    `  <option>June</option>` +
    `  <option>July</option>` +
    `  <option>August</option>` +
    `  <option>September</option>` +
    `  <option>October</option>` +
    `  <option>November</option>` +
    `  <option>December</option>` +
    `  </select>` +
    `  </div>` +
    `  <div class="col-4">` +
    `    <select id="year" class="select_field" name="year" >` +
    `    </select>` +
    `    </div>` +
    `    </div>` +
    `    </p>` +
    `    <p class="col-lg-4 col-0">` +
    `    </p>` +
    `    </div>` +
    `    <div class="row">` +
    `    <p type="Phone number*" class="col-lg-8 col-12">` +
    `    <input name="phone" class="input_field" type="number" value="" required/>` +
    `  </p>` +
    `  <p class="col-lg-4 col-0">` +
    `    </p>` +
    `    </div>` +
    `    <div class="row">` +
    `    <p type="Email*" class="col-lg-8 col-12">` +
    `    <input name="email" class="input_field" type="email" value="${information.email || ''}" required/>` +
    `  </p>` +
    `  <p class="col-lg-4 col-0">` +
    `    </p>` +
    `    </div>` +
    `    <div class="row">` +
    `    <p type="About me" class="col-12">` +
    `    <textarea placeholder="About me" rows="5" wrap="off">${information.description || ''}</textarea>` +
    `    </p>` +
    `    </div>` +
    `    </div>` +
    `    <div class="col-md-9 well">` +
    `    <legend id="pers_interest" class="">Competenies and interests</legend>` +
    `  <div class="row">` +
    `    <p type="Occupation" class="col-lg-8 col-12">` +
    `    <input class="input_field" name="occupation" type="text"/>` +
    `    </p>` +
    `    <p class="col-lg-4 col-0">` +
    `    </p>` +
    `    </div>` +
    `    <div class="row">` +
    `    <p type="Company" class="col-lg-8 col-12">` +
    `    <input class="input_field" name="company" type="text" value="${information.company}"/>` +
    `    </p>` +
    `    <p class="col-lg-4 col-0">` +
    `    </p>` +
    `    </div>` +
    `    <div class="row">` +
    `    <p type="Job title" class="col-lg-8 col-12">` +
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
    `    </div>` +
    `    <div class="col-md-9 well">` +
    `    <legend id="pers_news" class="">Newsletters preference</legend>` +
    `  <p>Recommendations sent straight to your inbox. Don't worry, we won't send spam!</p>` +
    `  <div class="row">` +
    `    <p type="Your email" class="col-lg-7 col-12">` +
    `    <input class="input_field" name="email" type="email"/>` +
    `    </p>` +
    `    <div class="col-lg-5 col-12 event-join right-btn">` +
    `    <button href="#" class="mt-lg-5 mt-0 butt sett-btn">Subscribe</button>` +
    `    </div>` +
    `    </div>` +
    `    </div>`;

  $('.personal-info').append(personalInfo);
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
  console.log('pass ok');
  $("#change-pass-form")[0].reset();
  $('.confirm-pass').remove();
  $('.error-old-pass').remove();
  $('#success-change').html("<p class='pass match'>Change password success</p>");
};