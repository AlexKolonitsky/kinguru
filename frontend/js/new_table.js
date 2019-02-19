$(function() {
  $('.bike').click(function(){
    $('.bike-open').stop().fadeToggle();
  });
});

$(function() {
  $('.boat').click(function(){
    $('.boat-open').stop().fadeToggle();
  });
});

$(function() {
  $('.switch1').click(function(){
    $('.price-open').stop().fadeToggle();
  });
});



$(document).ready(function() {
  $('.switch2').click(function(){
    var isDisabled = $('.speakers').is(':disabled');
    if (isDisabled) {
      $('.label-speaker').removeClass('disable-radio');
      $('.speakers').prop('disabled', false);
      console.log('ne');
      return;
    }
    $('.label-speaker').addClass('disable-radio');
    $('.speakers').prop('disabled', true);
    console.log('da');

  });

  $(document).ready(function() {
    $(":radio").on("click", function() {
      var dataClass = $(this).data("class");
      $(".guest-number").each(function() {
        this.disabled = !$(this).hasClass(dataClass);
      });
    });
  });

});
