(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top - 105
          },
          1000,
          "easeInOutExpo"
        );
        return false;
      }
    }
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

  // hide/show bnt
  $(document).ready(function(){
    $(".hide").hide();
    $(".show").click(function(){
      $(".hide").show();
      $(".show").hide();
    });
    $(".hide").click(function(){
      $(".hide").hide();
      $(".show").show();
    });
  });

  // Owl carousel calls
  $("#people-carousel").owlCarousel({
    loop: true,
    dots: true,
    nav: true,
    navText: [
      '<i class="fa fa-angle-left" aria-hidden="true"></i>',
      '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ],
    responsive: {
      0: {
        items: 1
      },
      480: {
        items: 1
      },
      768: {
        items: 1
      },
      992: {
        items: 2
      },
      1200: {
        items: 2
      }
    }
  });

  $("#place-carousel").owlCarousel({
    loop: true,
    items: 1,
    nav: false,
    dots: true
  });

  var guestsCarousel = $("#guests-carousel").owlCarousel({
    nav: true,
    dots: true,
    margin: 20,
    navText: [
      '<i class="fa fa-angle-left" aria-hidden="true"></i>',
      '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ],
    responsive: {
      0: {
        items: 2
      },
      480: {
        items: 2
      },
      768: {
        items: 3
      },
      992: {
        items: 5
      },
      1200: {
        items: 5
      }
    }
  });

  // hide nav arrows or dots and remove Add guest button of #guests-carousel and #people-carousel
  // according to resolution
  if ($(window).width() < 745) {
    guestsCarousel
      .trigger("remove.owl.carousel", [4])
      .trigger("refresh.owl.carousel");
    $("#guests-carousel .owl-next").hide();
    $("#guests-carousel .owl-prev").hide();
    $("#people-carousel .owl-next").hide();
    $("#people-carousel .owl-prev").hide();
  } else {
    $("#guests .button.add-guest-btn-wrapper").hide();
    $("#guests-carousel .owl-dots").hide();
    $("#people-carousel .owl-dots").hide();
  }

  function update() {
    var pos = $(window).scrollTop();
    $("#guests").css(
      "backgroundPosition",
      "50% " + Math.round(($("#guests").height() - pos) * 0.5) + "px"
    );
    $("#people").css(
      "backgroundPosition",
      "50% " + Math.round(($("#people").height() - pos / 4 + 100) * 3) + "px"
    );
    $("#place").css(
      "backgroundPosition",
      "50% " + Math.round(($("#place").height() - pos / 6 + 300) * 0.5) + "px"
    );
  }

  function windowSize() {
    if ($(window).width() >= "1200") {
      $(window).bind("scroll", update);
    }
  }

  $(window).on("load resize", windowSize);

})(jQuery); // End of use strict
