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
    console.log('speaker', jsondata);
    allSpeakers(jsondata);
  }
});

$('#searchSpeakers').click(function () {
    let object =
      {
        costFrom: document.getElementById('cost_from').value,
        costTo: document.getElementById('cost_to').value,
        ageFrom: document.getElementById('years-slider_speaker').value.split(',')[0],
        ageTo: document.getElementById('years-slider_speaker').value.split(',')[1],

      };
  getAllSpeakers(object);
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

function allSpeakers(speakers) {
    let speakersName = ``;
  speakers.forEach(speaker => {
      let speakerList = `<option value="${speaker.id}">${speaker.lastname} ${speaker.firstname}</option>`
    speakersName += speakerList;
  });

  $('#speakerMeetup').append(speakersName);
}

function tagsMeetup(allTagsFilter) {
  let tagsList = ``;
  allTagsFilter.forEach(tag => {
    let countFilter =
      `<option value="${tag.id}">${tag.name}</option>`;
    tagsList += countFilter;
  });
  $('#tugsMeetup').append(tagsList);
};