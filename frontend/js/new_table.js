const tagSelector = 'tugsMeetup';
const speakerSelector = 'speakerMeetup';
const jobTitleSelector = 'speakerJobTitle';
const industrySelector = 'speakerIndustry';
const expertiseSelector = 'speakerExpertise';

$.ajax({
  url: 'http://ec2-35-158-84-70.eu-central-1.compute.amazonaws.com:3010/job/titles',
  method: 'GET',
  dataType: "json",
  contentType: "application/json; charset=utf-8",
  success: function (jsondata) {
    speakerJobTitle(jsondata);
  }
});

$.ajax({
  url: 'http://ec2-35-158-84-70.eu-central-1.compute.amazonaws.com:3010/filter/meetup',
  method: 'GET',
  dataType: "json",
  contentType: "application/json; charset=utf-8",
  success: function (jsondata) {
    tagsMeetup(jsondata.tags);
  }
});

$.ajax({
  url: 'http://ec2-35-158-84-70.eu-central-1.compute.amazonaws.com:3010/industries',
  method: 'GET',
  dataType: "json",
  contentType: "application/json; charset=utf-8",
  success: function (jsondata) {
    industrySpeaker(jsondata);
  }
});

$.ajax({
  url: 'http://ec2-35-158-84-70.eu-central-1.compute.amazonaws.com:3010/wordkeys',
  method: 'GET',
  dataType: "json",
  contentType: "application/json; charset=utf-8",
  success: function (jsondata) {
    expertiseSpeaker(jsondata);
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

function getAllSpeakers(object) {
  $.ajax({
    url: `http://ec2-35-158-84-70.eu-central-1.compute.amazonaws.com:3010/speakers`,
    method: 'post',
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(object),
    success: function (jsondata) {
      allSpeakers(jsondata);

    }
  });
}

$.ajax({
  url: `http://ec2-35-158-84-70.eu-central-1.compute.amazonaws.com:3010/speakers`,
  method: 'post',
  dataType: "json",
  contentType: "application/json; charset=utf-8",
  success: function (jsondata) {
    allSpeakers(jsondata);
  }
});


$('#searchSpeakers').click(function () {
  const languages = [1, 2, 3, 4];

  // let speaker = $('#speakerMeetup').val();
  // let chooseSpeaker = speaker.map(function (x) {
  //   return parseInt(x, 10);
  // });
  //
  // console.log(chooseSpeaker);

  const filter = {
    // gender: $('#radio7').is(":checked")? $('#radio7').val(): '',
    languages: languages.filter(languageId => {
      return $(`#languageSpeakers${languageId}`).is(":checked");
    }),
  };
  if (document.getElementById('cost_from').value) {
    filter.costFrom = document.getElementById('cost_from').value
  };
  if (document.getElementById('cost_to').value) {
    filter.costTo = document.getElementById('cost_to').value
  }
  if (document.getElementById('speakerCity').value) {
    filter.city = document.getElementById('speakerCity').value
  };
  if (document.getElementById('years-slider_speaker').value.split(',')[0]) {
    filter.ageFrom = document.getElementById('years-slider_speaker').value.split(',')[0]
  };
  if (document.getElementById('years-slider_speaker').value.split(',')[1]) {
    filter.ageTo = document.getElementById('years-slider_speaker').value.split(',')[1]
  };
  if ($(`#${expertiseSelector}`).val()) {
    filter.expertises = $(`#${expertiseSelector}`).val().map(function (x) {
      return parseInt(x.split('speakerExpertise')[1], 10);
    });
  };
  if ($(`#${industrySelector}`).val()) {
    filter.industries = $(`#${industrySelector}`).val().map(function (x) {
      return parseInt(x.split('speakerIndustry')[1], 10);
    });
  }


  getAllSpeakers(filter);
});

window.addEventListener("load", function () {
  let language = function (jsondata) {allLanguages(jsondata);};
  let tags = function (jsondata) {tagsMeetup(jsondata.tags);};
  let jobTitle = function (jsondata) {speakerJobTitle(jsondata);};
  filterGet(`languages`, language);
});

function filterGet (url, success) {
  $.ajax({
    url: `http://ec2-35-158-84-70.eu-central-1.compute.amazonaws.com:3010/${url}`,
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
      ` <input type="checkbox" id="languageSpeakers${lang.id}" name="radios-forth" value="${lang.id}"/>` +
      ` <label for="languageSpeakers${lang.id}" class="text-center pointer">${lang.name}</label>` +
      ` </div>`;
    langName += langList;
  });

  $('#languageSpeakers').append(langName);
}

function allSpeakers(speakers = []) {
  let speakersName = ``;
  speakers.forEach(speaker => {
    let speakerList = `<option value="${speaker.id}">${speaker.lastname} ${speaker.firstname}</option>`
    speakersName += speakerList;
  });

  $(`#${speakerSelector}`).append(speakersName);
}

function speakerJobTitle(titles = []) {
  let jobTitle = ``;
  titles.forEach(title => {
    let titleList = `<option value="${title.id}">${title.name}</option>`
    jobTitle += titleList;
  });

  $(`#${jobTitleSelector}`).append(jobTitle);
}

function tagsMeetup(allTagsFilter = []) {
  let tagsList = ``;
  allTagsFilter.forEach(tag => {
    let countFilter =
      `<option value="${tag.id}">${tag.name}</option>`;
    tagsList += countFilter;
  });
  $(`#${tagSelector}`).append(tagsList);
};

function industrySpeaker(industrys = []) {
  let industryList = ``;
  industrys.forEach(industry => {
    let countFilter =
      `<option value="${industrySelector}${industry.id}">${industry.name}</option>`;
    industryList += countFilter;
  });
  $(`#${industrySelector}`).append(industryList);
};
function expertiseSpeaker(expertises = []) {
  let expertiseList = ``;
  expertises.forEach(expertise => {
    let countFilter =
      `<option value="${expertiseSelector}${expertise.id}">${expertise.name}</option>`;
    expertiseList += countFilter;
  });
  $(`#${expertiseSelector}`).append(expertiseList);
};

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