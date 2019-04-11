const tagSelector = 'tugsMeetup';
const speakerSelector = 'speakerMeetup';
const jobTitleSelector = 'speakerJobTitle';
const industrySelector = 'speakerIndustry';
const expertiseSelector = 'speakerExpertise';
let token = localStorage.getItem('Token');
token = `Bearer ${token}`;

$.ajax({
  url: `${urlBack}/job/titles`,
  method: 'GET',
  dataType: "json",
  contentType: "application/json; charset=utf-8",
  success: function (jsondata) {
    speakerJobTitle(jsondata);
    guestJobTitle(jsondata);
  }
});

$.ajax({
  url: `${urlBack}/filter/meetup`,
  method: 'GET',
  dataType: "json",
  contentType: "application/json; charset=utf-8",
  success: function (jsondata) {
    tagsMeetup(jsondata.tags);
  }
});

$.ajax({
  url: `${urlBack}/industries`,
  method: 'GET',
  dataType: "json",
  contentType: "application/json; charset=utf-8",
  success: function (jsondata) {
    industrySpeaker(jsondata);
    industryGuest(jsondata);
  }
});

$.ajax({
  url: `${urlBack}/wordkeys`,
  method: 'GET',
  dataType: "json",
  contentType: "application/json; charset=utf-8",
  success: function (jsondata) {
    expertiseSpeaker(jsondata);
    expertiseGuest(jsondata);
  }
});

$(function () {
  $('.bike').click(function () {
    $('.bike-open').stop().fadeToggle();
  });

  $('.boat').click(function () {
    $('.boat-open').stop().fadeToggle();
  });

  $('.switch1').click(function () {
    $('.price-open').stop().fadeToggle();
  });

  $('.city-speaker').click(function () {
    $('.city-speaker-open').stop().fadeToggle();
  });

  $('.industry-speaker').click(function () {
    $('.industry-speaker-open').stop().fadeToggle();
  });

  $('.job-speaker').click(function () {
    $('.job-speaker-open').stop().fadeToggle();
  });

  $('.rate-speaker').click(function () {
    $('.rate-speaker-open').stop().fadeToggle();
  });

  $('.cost-speaker').click(function () {
    $('.cost-speaker-open').stop().fadeToggle();
  });

  $('.expertise-speaker').click(function () {
    $('.expertise-speaker-open').stop().fadeToggle();
  });

  $('.age-speaker').click(function () {
    $('.age-speaker-open').stop().fadeToggle();
  });

  $('.gender-speaker').click(function () {
    $('.gender-speaker-open').stop().fadeToggle();
  });

  $('.lang-speaker').click(function () {
    $('.lang-speaker-open').stop().fadeToggle();
  });

  $('.invited-by').click(function () {
    $('.invited-by-open').stop().fadeToggle();
  });

  $('.job-guest').click(function () {
    $('.job-guest-open').stop().fadeToggle();
  });

  $('.interest-guest').click(function () {
    $('.interest-guest-open').stop().fadeToggle();
  });

  $('.age-guest').click(function () {
    $('.age-guest-open').stop().fadeToggle();
  });

  $('.gender-guest').click(function () {
    $('.gender-guest-open').stop().fadeToggle();
  });

  $('.expertise-guest').click(function () {
    $('.expertise-guest-open').stop().fadeToggle();
  });

  $('.city-guest').click(function () {
    $('.city-guest-open').stop().fadeToggle();
  });

  $('.switch2').click(function () {
    var isDisabled = $('.speakers').is(':disabled');
    if (isDisabled) {
      $('.label-speaker').removeClass('disable-radio');
      $('.speakers').prop('disabled', false);
      return;
    }
    $('.label-speaker').addClass('disable-radio');
    $('.speakers').prop('disabled', true);
  });

  $(":radio").on("click", function () {
    var dataClass = $(this).data("class");
    $(".guest-number").each(function () {
      this.disabled = !$(this).hasClass(dataClass);
    });
  });

});

$(document).ready(function () {
  const range = $('#years-slider_speaker');
  range.slider({
    tooltip: 'always'
  });
  range.change(function() {
    $('#years-start_speaker').text(range[0].value.split(',')[0]);
    $('#years-end_speaker').text(range[0].value.split(',')[1]);
  });
});

$(document).ready(function () {
  const range = $('#years-slider_guest');
  range.slider({
    tooltip: 'always'
  });
  range.change(function() {
    $('#years-start_guest').text(range[0].value.split(',')[0]);
    $('#years-end_guest').text(range[0].value.split(',')[1]);
  });
});

function getAllSpeakers(object) {
  $.ajax({
    url: `${urlBack}/speakers`,
    method: 'post',
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(object),
    success: function (jsondata) {
      viewSpeakerFilter(jsondata);
      $('.speaker_filtered').removeClass('hide-content');

    }
  });
}
function getAllguest() {
  $.ajax({
    url: `${urlBack}/guests`,
    method: 'post',
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(),
    success: function (jsondata) {
      viewGuestsFilter(jsondata);

    }
  });
}

$.ajax({
  url: `${urlBack}/speakers`,
  method: 'post',
  dataType: "json",
  contentType: "application/json; charset=utf-8",
  success: function (jsondata) {
    allSpeakers(jsondata);
  }
});


$('#searchSpeakers').click(function () {
  let languages = [];
  $("input[name='radios-forth[]']:checked").each(function () {
    languages.push($(this).val());
    languages = languages.map(Number);
  });

  const filter = {
    languages: languages,
  };
  if (document.getElementById('cost_from').value) {
    filter.costFrom = document.getElementById('cost_from').value
  }
  if (document.getElementById('cost_to').value) {
    filter.costTo = document.getElementById('cost_to').value
  }
  if (document.getElementById('speakerCity').value) {
    filter.city = document.getElementById('speakerCity').value
  }
  if (document.getElementById('years-slider_speaker').value.split(',')[0]) {
    filter.ageFrom = document.getElementById('years-slider_speaker').value.split(',')[0]
  }
  if (document.getElementById('years-slider_speaker').value.split(',')[1]) {
    filter.ageTo = document.getElementById('years-slider_speaker').value.split(',')[1]
  }
  if ($(`#${expertiseSelector}`).val()) {
    filter.expertises = $(`#${expertiseSelector}`).val().map(function (x) {
      return parseInt(x.split(`${expertiseSelector}`)[1], 10);
    });
  }
  if ($(`#${industrySelector}`).val()) {
    filter.industries = $(`#${industrySelector}`).val().map(function (x) {
      return parseInt(x.split(`${industrySelector}`)[1], 10);
    });
  }
  if ($(`#${jobTitleSelector}`).val()) {
    filter.jobTitles = $(`#${jobTitleSelector}`).val().map(function (x) {
      return parseInt(x.split(`${jobTitleSelector}`)[1], 10);
    });
  }
  if($('#radio7').is(":checked")) {
    filter.gender = $('#radio7').val();
  }
  if($('#radio8').is(":checked")) {
    filter.gender = $('#radio8').val();
  }
  if($('#radio7').is(":checked") && $('#radio8').is(":checked")) {
    filter.gender = `${$('#radio7').val()}, ${$('#radio8').val()}`;
  }

  getAllSpeakers(filter);
});

$('#searchGuests').click(function () {
  event.preventDefault();
  $('#guestListFilter').empty();
  $('#guestCountSearch').empty();

  const filter = {};
  if ($(`#guestJobTitle`).val()) {
    filter.jobTitles = $(`#guestJobTitle`).val().map(function (x) {
      return parseInt(x.split(`guestJobTitle`)[1], 10);
    });
  }
  if ($(`#guestExpertise`).val()) {
    filter.expertises = $(`#guestExpertise`).val().map(function (x) {
      return parseInt(x.split(`guestExpertise`)[1], 10);
    });
  }
  if ($(`#guestInterest`).val()) {
    filter.industries = $(`#guestInterest`).val().map(function (x) {
      return parseInt(x.split(`guestInterest`)[1], 10);
    });
  }
  if (document.getElementById('years-slider_guest').value.split(',')[0]) {
    filter.ageFrom = document.getElementById('years-slider_guest').value.split(',')[0]
  }
  if (document.getElementById('years-slider_guest').value.split(',')[1]) {
    filter.ageTo = document.getElementById('years-slider_guest').value.split(',')[1]
  }

  if($('#radio10').is(":checked")) {
    filter.gender = $('#radio10').val();
  }
  if($('#radio11').is(":checked")) {
    filter.gender = $('#radio11').val();
  }
  if($('#radio10').is(":checked") && $('#radio11').is(":checked")) {
    filter.gender = `${$('#radio10').val()}, ${$('#radio11').val()}`;
  }

  // let guest = [];
  // $("input[name='guestName[]']:checked").each(function () {
  //   guest.push($(this).val().split('speaker')[1]);
  //   guest = guest.map(Number);
  // });

  $.ajax({
    url: `${urlBack}/guests`,
    method: 'post',
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(filter),
    success: function (jsondata) {
      viewGuestsFilter(jsondata);
    }
  });
});

window.addEventListener("load", function () {
  let language = function (jsondata) {allLanguages(jsondata);};
  let token = localStorage.getItem('Token');
  filterGet(`languages`, language);
  getAllguest();
  if(token){
    $('#createMeetup').removeAttr('disabled');
  }
});

function filterGet (url, success) {
  $.ajax({
    url: `${urlBack}/${url}`,
    method: 'GET',
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: success,
  });
}

function allLanguages(langs = []) {
  let langName = ``;
  langs.forEach(lang => {
    let langList =
      ` <div class="my-auto">` +
      ` <input type="checkbox" id="languageSpeakers${lang.id}" name="radios-forth[]" value="${lang.id}"/>` +
      ` <label for="languageSpeakers${lang.id}" class="text-center pointer">${lang.name}</label>` +
      ` </div>`;
    langName += langList;
  });

  $('#languageSpeakers').append(langName);
}

function allSpeakers(speakers = []) {
  let speakersName = ``;
  speakers.forEach(speaker => {
    let speakerList = `<option value="${speakerSelector}${speaker.id}">${speaker.lastname} ${speaker.firstname}</option>`
    speakersName += speakerList;
  });

  $(`#${speakerSelector}`).append(speakersName);
}

function speakerJobTitle(titles = []) {
  let jobTitle = ``;
  titles.forEach(title => {
    let titleList = `<option value="${jobTitleSelector}${title.id}">${title.name}</option>`
    jobTitle += titleList;
  });

  $(`#${jobTitleSelector}`).append(jobTitle);
}
function guestJobTitle(titles = []) {
  let jobTitle = ``;
  titles.forEach(title => {
    let titleList = `<option value="#guestJobTitle${title.id}">${title.name}</option>`
    jobTitle += titleList;
  });
  $('#guestJobTitle').append(jobTitle);
}


function tagsMeetup(allTagsFilter = []) {
  let tagsList = ``;
  allTagsFilter.forEach(tag => {
    let countFilter =
      `<option value="${tagSelector}${tag.id}">${tag.name}</option>`;
    tagsList += countFilter;
  });
  $(`#${tagSelector}`).append(tagsList);
}

function industrySpeaker(industrys = []) {
  let industryList = ``;
  industrys.forEach(industry => {
    let countFilter =
      `<option value="${industrySelector}${industry.id}">${industry.name}</option>`;
    industryList += countFilter;
  });
  $(`#${industrySelector}`).append(industryList);
}
function industryGuest(guests = []) {
  let industryList = ``;
  guests.forEach(industry => {
    let countFilter =
      `<option value="#guestInterest${industry.id}">${industry.name}</option>`;
    industryList += countFilter;
  });
  $('#guestInterest').append(industryList);
}

function expertiseSpeaker(expertises = []) {
  let expertiseList = ``;
  expertises.forEach(expertise => {
    let countFilter =
      `<option value="${expertiseSelector}${expertise.id}">${expertise.name}</option>`;
    expertiseList += countFilter;
  });
  $(`#${expertiseSelector}`).append(expertiseList);
};

function expertiseGuest(guests = []) {
  let expertiseList = ``;
  guests.forEach(guest => {
    let countFilter =
      `<option value="#guestExpertise${guest.id}">${guest.name}</option>`;
    expertiseList += countFilter;
  });
  $('#guestExpertise').append(expertiseList);
}


function viewSpeakerFilter(speakers) {
  $('#speakersListFilter').empty();
  $('#speakerCountSearch').empty();
  let speakerList = ``;
  speakers.forEach(speaker => {
    let speakerContent =
      `<div class="speaker_checked my-auto">` +
      `<input class="speakers" type="checkbox" id="speaker${speaker.id}">` +
      `<label class="label-speaker_checked row" for="speaker${speaker.id}">` +
      `<div class="speaker_checked-photo">` +
      `<img class="speaker_checked-photo rounded-circle" alt="" src="${speaker.coverSource ? speaker.coverSource : 'img/default-user-image.png'}">` +
      `</div>` +
      `<p class="speaker_checked-name">${speaker.firstname} ${speaker.lastname}</p>` +
      `</label>` +
      `</div>`;
    speakerList += speakerContent;
  });
  let speakerCount = `${speakers.length}`;
  $('#speakersListFilter').append(speakerList);
  $('#speakerCountSearch').append(speakerCount);

  $(".speaker_checked").change(function(){
    $('#speakerCountChecked').text($('#speakersListFilter input:checked').length);
  });
}

function viewGuestsFilter(guests) {
  $('#guestListFilter').empty();
  $('#guestCountSearch').empty();
  let guestList = ``;
  guests.forEach(guest => {
    let guestContent =
      `<div class="speaker_checked my-auto">` +
      `<input name="guestName[]" class="speakers" type="checkbox" id="speaker${guest.id}" value="speaker${guest.id}">` +
      `<label class="label-speaker_checked row" for="speaker${guest.id}">` +
      `<div class="speaker_checked-photo">` +
      `<img class="speaker_checked-photo_load rounded-circle" alt="" src="${guest.coverSource ? guest.coverSource : 'img/default-user-image.png'}">` +
      `</div>` +
      `<p class="speaker_checked-name">${guest.firstname} ${guest.lastname}</p>` +
      `</label>` +
      `</div>`;
    guestList += guestContent;
  });
  let guestCount = `${guests.length}`;
  $('#guestListFilter').append(guestList);
  $('#guestCountSearch').append(guestCount);

  $(".speaker_checked").change(function(){
    $('#guestCountChecked').text($('#guestListFilter input:checked').length);
  });
}


function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('#image').attr('src', e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
    console.log(reader);
  }
}
$("#file").change(function(){
  readURL(this);
});
$('#startHour').click(function () {
  console.log(document.getElementById('startHour').value);
});
$('#createMeetup').click(function () {
  event.preventDefault();
  console.log(userId);
  let fd = new FormData();
  let guests = [];
  let speakerShearch = $(`#${speakerSelector}`).val().map(function (x) {
    return parseInt(x.split(`${speakerSelector}`)[1], 10);});
  let speakerId = $(`#vehicle2`).is(":checked")? userId: '';
  let speakerEvent = [];
  if (speakerShearch) {
    speakerEvent.push(speakerShearch)
  }
  if (speakerId) {
    speakerEvent.push(speakerId)
  }
  console.log(speakerEvent);
  $("input[name='guestName[]']:checked").each(function () {
    guests.push($(this).val().split('speaker')[1]);
    guests = guests.map(Number);
  });
  $('#radio6').val($('#guestValNumber').val());

  fd.append( 'image', $('#file')[0].files[0]);
  fd.append( 'title', document.getElementById('titleMeetup').value);
  fd.append( 'description', document.getElementById('descriptionMeetup').value);
  fd.append('tags',  $(`#${tagSelector}`).val().map(function (x) {
    return parseInt(x.split(`${tagSelector}`)[1], 10);}));
  fd.append( 'startDate', `${document.getElementById('dateMeetup').value}T${document.getElementById('startHour').value}:25.000Z`);
  fd.append( 'endDate', `${document.getElementById('dateMeetup').value}T${document.getElementById('endHour').value}:25.000Z`);
  fd.append( 'country', document.getElementById('countryMeetup').value);
  fd.append('city', document.getElementById('cityMeetup').value);
  fd.append('place', document.getElementById('placeMeetup').value);
  fd.append('socialLink', document.getElementById('urlEvent').value);
  fd.append('speakers', ``);
  fd.append('isOpen', $('input[name=radios-one]:checked').val());
  fd.append('guests', guests);
  fd.append('maxGuestsCount', $('input[name=radios-two]:checked').val());
  fd.append('cost', $('#costMeetup').val());

  $.ajax({
    url: `${urlBack}/new/meetup`,
    data: fd,
    headers: {
      'Authorization': token,
    },
    processData: false,
    contentType: false,
    type: 'POST',
    success: function(data){
    }
  });
});
$('#startHour').timepicker({
  timeFormat: 'H:mm',
  interval: 30,
  dynamic: false,
  dropdown: true,
  scrollbar: true
});
$('#endHour').timepicker({
  timeFormat: 'H:mm',
  interval: 30,
  dynamic: false,
  dropdown: true,
  scrollbar: true
});
