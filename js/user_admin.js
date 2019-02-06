(function($) {
  "use strict"; // Start of use strict

  // Tabs
  $(function(){
    $("#myTab a").click(function(e){
      e.preventDefault();
      $(this).tab('show');
    });
  });


  // Closes responsive menu and change burger icon when a scroll trigger link is clicked or click
  // outside
  $(".js-scroll-trigger").click(function() {
    $(".navbar-collapse").collapse("hide");
    $("#nav-icon1").toggleClass("open");
  });

  $(document).click(function(event) {
    if($("#navbarResponsive").hasClass("show")) $("#nav-icon1").toggleClass("open");
    if ($(event.target).closest(".js-scroll-trigger").length) return;
    $(".navbar-collapse").collapse("hide");
    event.stopPropagation();
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $("body").scrollspy({
    target: "#mainNav",
    offset: 110
  });

  $(document).ready(function() {
    $("#burger-menu-button").click(function() {
      $("#nav-icon1").toggleClass("open");
    });
  });

  $(document).ready(function(){
    $(".side").click(function(){
      $('.side').each(function () {
        $(this).removeClass('active');
      });
    $(this).addClass('active');
    });
  });

  $('textarea').autoResize();

})(jQuery); // End of use strict
