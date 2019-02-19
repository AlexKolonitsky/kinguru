(function($) {
  "use strict";

  $(document).ready(function(){
    $(".side").click(function(){
      $('.side').each(function () {
        $(this).removeClass('active');
      });
    $(this).addClass('active');
    });
  });

  $(document).ready(function(){
    $('textarea').autoResize();
  });

  $(document).ready(function(){
    $("#spy").on("click","a", function (event) {
      event.preventDefault();
      var id  = $(this).attr('href'),
        top = $(id).offset().top;
      $('body,html').animate({scrollTop: top}, 1500);
    });
  });

})(jQuery);

