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

  $('textarea').autoResize();

})(jQuery);

