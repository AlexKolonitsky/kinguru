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

  // Closes responsive menu when a scroll trigger link is clicked
  $(".js-scroll-trigger").click(function() {
    $(".navbar-collapse").collapse("hide");
  });

  $(document).click(function(event) {
    if ($(event.target).closest(".js-scroll-trigger").length) return;
    $(".navbar-collapse").collapse("hide");
    event.stopPropagation();
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $("body").scrollspy({
    target: "#mainNav",
    offset: 110
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  $(document).ready(function(){
    $('#nav-icon1').click(function(){
      $(this).toggleClass('open');
    });
  });

  // Scroll reveal calls
  window.sr = ScrollReveal();
  sr.reveal(
    ".sr-icons",
    {
      duration: 600,
      scale: 0.3,
      distance: "0px"
    },
    200
  );
  sr.reveal(".sr-button", {
    duration: 1000,
    delay: 200
  });
  sr.reveal(
    ".sr-contact",
    {
      duration: 600,
      scale: 0.3,
      distance: "0px"
    },
    300
  );

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
    // $('#guests .button.add-guest-btn-wrapper').toggle();
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

  //Bootstrap tabs
  $("#btn-speakers").tab("show");

  var mh = 0;
  $(".task-box").each(function() {
    var h_block = $(this).height();
    if (h_block > mh) {
      mh = h_block;
      console.log(mh);
    }
  });

  $(".collapse").on("show.bs.collapse", function() {
    let boxes = $(".task-box").not($(this).parents(".task-box"));
    let parentBox = $(this).parents(".task-box");
    //console.log(boxes,parentBox);
    parentBox.attr("aria-expanded", "true").css("height", "auto");
    boxes.each(function() {
      var $this = $(this);
      if ($this.attr("aria-expanded") !== "true") {
        $this.height(mh);
        //$this.css("max-height","100%");
      }
    });
  });
  $(".collapse").on("hide.bs.collapse", function() {
    let parentBox = $(this).parents(".task-box");
    parentBox.attr("aria-expanded", "false").height(mh);
    let boxes = $(".task-box").not($(this).parents(".task-box"));
    //console.log(boxes,parentBox);
    boxes.each(function() {
      if ($(this).height() > mh) {
        $(this).css("height", "auto");
      } else {
        $(this).height(mh);
      }
    });
  });

  $(".navbar-toggler").click(function() {
    $("#mainNav")
      .not(".navbar-shrink")
      .toggleClass("darkness");
  });

  function update() {
    var pos = $(window).scrollTop();
    $("#task").css(
      "backgroundPosition",
      "50% " + Math.round(($("#task").height() - pos) * 0.5) + "px"
    );
    $("#people").css(
      "backgroundPosition",
      "50% " + Math.round(($("#people").height() - pos / 4 + 100) * 3) + "px"
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

  $("#form_id").submit(function() {
    var th = $(this);
    $.ajax({
      type: "POST",
      url: "contact.php", //Change
      data: th.serialize()
    }).done(function() {
      // код после успешной отправки формы
      $.fancybox.open({
        src: "#hidden-content",
        type: "inline",
        opts: {
          afterShow: function(instance, current) {
            $("#hidden-content")
              .fadeIn()
              .delay(2000)
              .fadeOut();
            $.fancybox.close();
          }
        }
      });
    });
    return false;
  });
})(jQuery); // End of use strict
