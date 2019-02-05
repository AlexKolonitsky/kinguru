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

  // zoom-in photo
  $(document).ready(function(){
    $(".image").click(function(){
      var img = $(this);
      var src= img.attr('src');
      $("body").append("<div class='popup'>" +
                      "<div class='popup_bg'>" +
                      "<img src ='"+src+"' class='popup_img' />" +
                      "</div>");
      $(".popup").fadeIn(200);
      $(".popup_bg").click(function(){
        $(".popup").fadeOut(200);
        setTimeout(function(){
          $(".popup").remove();
        }, 200);
      });
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

  $("#comment-carousel").owlCarousel({
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

  $("#photo-gallery").owlCarousel({
    loop: true,
    nav: false,
    dots: false,
    responsive: {
      0: {
        items: 1
      },
      480: {
        items: 3
      },
      768: {
        items: 5
      },
      992: {
        items: 6
      },
      1200: {
        items: 9
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

  // hide nav arrows or dots and remove Add guest button of #guests-carousel, #people-carousel and
  // #comment-carousel according to resolution
  if ($(window).width() < 745) {
    guestsCarousel
      .trigger("remove.owl.carousel", [4])
      .trigger("refresh.owl.carousel");
    $("#guests-carousel .owl-next").hide();
    $("#guests-carousel .owl-prev").hide();
    $("#people-carousel .owl-next").hide();
    $("#people-carousel .owl-prev").hide();
    $("#comment-carousel .owl-next").hide();
    $("#comment-carousel .owl-prev").hide();
  } else {
    $("#guests .button.add-guest-btn-wrapper").hide();
    $("#guests-carousel .owl-dots").hide();
    $("#people-carousel .owl-dots").hide();
    $("#comment-carousel .owl-dots").hide();
  }

  function update() {
    var pos = $(window).scrollTop();
    $("#people").css(
      "backgroundPosition",
      "50% " + Math.round(($("#people").height() - pos / 4 + 100) * 3) + "px"
    );
    $("#comment").css(
      "backgroundPosition",
      "50% " + Math.round(($("#comment").height() - pos / 4 + 100) * 3) + "px"
    );
    $("#guests").css(
      "backgroundPosition",
      "50% " + Math.round(($("#guests").height() - pos / 3 + 300) * 2) + "px"
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

  //form styles------------------------------------------------------------------------------
  let current_fs, next_fs, previous_fs; //fieldsets
  let left, opacity, scale; //fieldset properties which we will animate
  let animating; //flag to prevent quick multi-click glitches

  $(".next").click(function(){
    if(animating) return false;
    animating = true;

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    //activate next step on progressbar using the index of next_fs
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate({opacity: 0}, {
      step: function(now, mx) {
        //as the opacity of current_fs reduces to 0 - stored in "now"
        //1. scale current_fs down to 80%
        scale = 1 - (1 - now) * 0.2;
        //2. bring next_fs from the right(50%)
        left = (now * 50)+"%";
        //3. increase opacity of next_fs to 1 as it moves in
        opacity = 1 - now;
        current_fs.css({
          'transform': 'scale('+scale+')',
          'position': 'absolute'
        });
        next_fs.css({'left': left, 'opacity': opacity});
      },
      duration: 800,
      complete: function(){
        current_fs.hide();
        animating = false;
      },
      //this comes from the custom easing plugin
      easing: 'easeInOutBack'
    });
  });

  $(".previous").click(function(){
    if(animating) return false;
    animating = true;

    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

    //de-activate current step on progressbar
    $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

    //show the previous fieldset
    previous_fs.show();
    //hide the current fieldset with style
    current_fs.animate({opacity: 0}, {
      step: function(now, mx) {
        //as the opacity of current_fs reduces to 0 - stored in "now"
        //1. scale previous_fs from 80% to 100%
        scale = 0.8 + (1 - now) * 0.2;
        //2. take current_fs to the right(50%) - from 0%
        left = ((1-now) * 50)+"%";
        //3. increase opacity of previous_fs to 1 as it moves in
        opacity = 1 - now;
        current_fs.css({'left': left});
        previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
      },
      duration: 800,
      complete: function(){
        current_fs.hide();
        animating = false;
      },
      //this comes from the custom easing plugin
      easing: 'easeInOutBack'
    });
  });

  $(".submit").click(function(){
    return false;
  });

    $(document).ready(function() {
        $('#open-rating').click( function(event){
            event.preventDefault();
            $('#overlay').fadeIn(400,
                function(){
                    $('#modal_form')
                        .css('display', 'block')
                        .animate({opacity: 1, top: '50%'}, 200);
                });
        });
        $('#modal_close, #overlay').click( function(){
            $('#modal_form')
                .animate({opacity: 0, top: '45%'}, 200,
                    function(){
                        $(this).css('display', 'none');
                        $('#overlay').fadeOut(400);
                    }
                );
        });
    });

    $(function(){
        $("#includedContent").load('rating.html');
    });

})(jQuery); // End of use strict
