(function ($) {
  "use strict";

  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
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

  $(".js-scroll-trigger").click(function () {
    $(".navbar-collapse").collapse("hide");
    $("#nav-icon1").toggleClass("open");
  });

  $(document).click(function (event) {
    if ($("#navbarResponsive").hasClass("show")) $("#nav-icon1").toggleClass("open");
    if ($(event.target).closest(".js-scroll-trigger").length) return;
    $(".navbar-collapse").collapse("hide");
    event.stopPropagation();
  });

  // $("body").scrollspy({
  //   target: "#mainNav",
  //   offset: 110
  // });

  $(document).ready(function () {
    $("#burger-menu-button").click(function () {
      $("#nav-icon1").toggleClass("open");
    });
  });

  $(document).ready(function () {
    $(".hide").hide();
    $(".show").click(function () {
      $(".hide").show();
      $(".show").hide();
    });
    $(".hide").click(function () {
      $(".hide").hide();
      $(".show").show();
    });
  });

  $(document).ready(function() {
    var showChar = 200;
    var ellipsestext = "...";
    var moretext = "MORE";
    var lesstext = "LESS";


    $('.more').each(function() {
      var content = $(this).html();

      if(content.length > showChar) {

        var c = content.substr(0, showChar);
        var h = content.substr(showChar, content.length - showChar);

        var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';

        $(this).html(html);
      }

    });

    $(".morelink").click(function(){
      if($(this).hasClass("less")) {
        $(this).removeClass("less");
        $(this).html(moretext);
      } else {
        $(this).addClass("less");
        $(this).html(lesstext);
      }
      $(this).parent().prev().toggle();
      $(this).prev().toggle();
      return false;
    });
  });

  $(document).ready(function () {
    $(".image").click(function () {
      var img = $(this);
      var src = img.attr('src');
      $("body").append("<div class='popup'>" +
        "<div class='popup_bg'>" +
        "<div class='sl_ctr'>" +
        "<div class='sldr'>" +
        "<img src ='" + src + "' class='popup_img' />" +
        "</div>" +
        "<div class='prv_b'>" +
        "<i class='fa fa-angle-left' aria-hidden='true'>" + "</i>" +
        "</div>" +
        "<div class='nxt_b'>" +
        "<i class='fa fa-angle-right' aria-hidden='true'>" + "</i>" +
        "</div>" +
        "</div>" +
        "</div>");
      $(".popup").fadeIn(200);
      $(".popup_bg").click(function () {
        $(".popup").fadeOut(200);
        setTimeout(function () {
          $(".popup").remove();
        }, 200);
      });
    });
  });

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
        items: 7
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

  let current_fs, next_fs, previous_fs;
  let left, opacity, scale;
  let animating;

  $(".next").click(function () {
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

    next_fs.show();
    current_fs.animate({opacity: 0}, {
      step: function (now, mx) {
        scale = 1 - (1 - now) * 0.2;
        left = (now * 50) + "%";
        opacity = 1 - now;
        current_fs.css({
          'transform': 'scale(' + scale + ')',
          'position': 'absolute'
        });
        next_fs.css({'left': left, 'opacity': opacity});
      },
      duration: 800,
      complete: function () {
        current_fs.hide();
        animating = false;
      },
      easing: 'easeInOutBack'
    });
  });

  $(".previous").click(function () {
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

    $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

    previous_fs.show();
    current_fs.animate({opacity: 0}, {
      step: function (now, mx) {
        scale = 0.8 + (1 - now) * 0.2;
        left = ((1 - now) * 50) + "%";
        opacity = 1 - now;
        current_fs.css({'left': left});
        previous_fs.css({'transform': 'scale(' + scale + ')', 'opacity': opacity});
      },
      duration: 800,
      complete: function () {
        current_fs.hide();
        animating = false;
      },
      easing: 'easeInOutBack'
    });
  });

  $(".submit").click(function () {
    return false;
  });

  $(document).ready(function () {
    $('#open-rating').click(function (event) {
      event.preventDefault();
      $('#overlay').fadeIn(400,
        function () {
          $('#modal_form')
            .css('display', 'block')
            .animate({opacity: 1, top: '50%'}, 200);
        });
    });
    $('#modal_close, #overlay').click(function () {
      $('#modal_form')
        .animate({opacity: 0, top: '45%'}, 200,
          function () {
            $(this).css('display', 'none');
            $('#overlay').fadeOut(400);
          }
        );
    });
  });

  $(document).ready(function () {
    $('#login-btn').click(function (event) {
      event.preventDefault();
      $('#overlay-login').fadeIn(400,
        function () {
          $('#login-form')
            .css('display', 'block')
            .animate({opacity: 1, top: '50%'}, 200);
        });
    });
    $('#modal_close, #overlay-login').click(function () {
      $('#login-form')
        .animate({opacity: 0, top: '45%'}, 200,
          function () {
            $(this).css('display', 'none');
            $('#overlay-login').fadeOut(400);
          }
        );
    });
  });

  $(function () {
    $("#includedContent").load('rating.html');
    $('#login-content').load('login.html');
    $('#open-reset-pass').load('reset_pass.html')
    $('#open-sign-up').load('sign_up.html');
    $('#footer').load('footer.html');
    $('#change-pass').load('change_pass.html');
  });


  $(function () {
    $('#myTab a').click(function (e) {
      e.preventDefault()
      $(this).tab('show')
    });
  });

  $(document).ready(function () {
    setTimeout(function () {
      $('.onload-click').click();
    },);
  });


  //
  // function helloBro() {
  //   $('.your-class').slick({
  //     dots: true,
  //     infinite: true,
  //     speed: 300,
  //     slidesToShow: 1,
  //     slidesToScroll: 1
  //   });
  // }
  // $(document).ready(function () {
  //   setTimeout(helloBro, 1000);
  //
  // });

})(jQuery);

var like = function (element) {
  if (element.classList.contains('unlike')) {
    element.classList.remove('unlike');
    element.classList.add('like');
  } else {
    element.classList.remove('like');
    element.classList.add('unlike');
  }
};
