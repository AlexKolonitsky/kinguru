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

$.ajax({
  url: 'http://ec2-35-158-84-70.eu-central-1.compute.amazonaws.com:3010/filter/meetup',
  method: 'GET',
  dataType: "json",
  contentType: "application/json; charset=utf-8",
  success: function (jsondata) {
    allTags(jsondata.Tags);
    $('#tags').multiSelect();
  }
});

function allTags(recentTags) {
  let tagsListContent = ``;
  recentTags.forEach(tag => {
    let tagsContent =
      `<option value="${tag.id}">${tag.name}</option>`;
    tagsListContent += tagsContent;
  });
  $('.tags-content').append(tagsListContent);
};

