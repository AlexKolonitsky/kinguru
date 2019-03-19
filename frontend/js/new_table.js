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

function methodGet (url, state) {
$.ajax({
  url: url,
  method: 'GET',
  dataType: "json",
  contentType: "application/json; charset=utf-8",
  success: state,
});
};

window.addEventListener("load", function () {
  let tags = isStateSuccess(true);
  let speakers = isStateSuccess(false);
  let urlTags = 'http://ec2-35-158-84-70.eu-central-1.compute.amazonaws.com:3010/filter/meetup';
  let urlSpeakers = 'http://ec2-35-158-84-70.eu-central-1.compute.amazonaws.com:3010/speakers';
  methodGet(urlTags, tags);
  methodGet(urlSpeakers, speakers);

});

var speakers = [];

function isStateSuccess (isState) {
  if (isState == true) {
    let a = function (jsondata) {
      allTags(jsondata.Tags);
      $('#tags').multiSelect();
    };
    return a;
  } else {
    let b = function (jsondata) {
      speakers = jsondata;
      autocomplete(document.getElementById("myInput"), speakers);
      console.log(speakers);
    };
    return b;
  }
}

function allTags(recentTags) {
  let tagsListContent = ``;
  recentTags.forEach(tag => {
    let tagsContent =
      `<option value="${tag.id}">${tag.name}</option>`;
    tagsListContent += tagsContent;
  });
  $('.tags-content').append(tagsListContent);
};

$(document).ready(function () {
  $('.duration-slider').bootstrapSlider();
});

