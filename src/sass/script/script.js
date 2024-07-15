$(document).ready(function () {
  $(".carousel__inner").slick({
    speed: 1200,
    autoplay: true,
    adaptiveHeight: true,
    nextArrow:
      '<button type="button" class="slick-next"><img src="../../img/ce082e4eab493e9e77ff046d2d27ba69.png"></button>',
    prevArrow:
      '<button type="button" class="slick-prev"><img src="../img/chevron-left-solid.png"></button>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          arrows: false,
          dots: true,
        },
      },
    ],
  });
  $("ul.catalog__tabs").on(
    "click",
    "li:not(.catalog__tab_active)",
    function () {
      $(this)
        .addClass("catalog__tab_active")
        .siblings()
        .removeClass("catalog__tab_active")
        .closest("div.container")
        .find("div.catalog__content")
        .removeClass("catalog__content_active")
        .eq($(this).index())
        .addClass("catalog__content_active");
    }
  );

  $(".catalog-item__link").each(function (i) {
    $(this).on("click", function (e) {
      e.preventDefault();
      $(".catalog-item__content")
        .eq(i)
        .toggleClass("catalog-item__content_active");
      $(".catalog-item__list").eq(i).toggleClass("catalog-item__list_active");
    });
  }),
    $("[data-modal=consultation]").on("click", function () {
      $(".overlay, #consultation").fadeIn("slow");
    });
  $(".modal__close").on("click", function () {
    $(".overlay, #consultation, #thanks, #order").fadeOut("slow");
  });
  $(".catalog-item__btn").on("click", function () {
    $(".overlay, #order").fadeIn("slow");
  });

  $(".catalog-item__btn").each(function (i) {
    $(this).on("click", function () {
      $("#order .modal__descr").text($(".catalog-item__subtitle").eq(i).text());
      $(".overlay, #order").fadeIn("slow");
    });
  });
  $("#consultation-form").validate();
  $("#consultation form").validate({
    rules: {
      name: "required",
      phone: "required",
      email: {
        required: true,
        email: true,
      },
    },
    messages: {
      name: {
        required: "Please specify your name",
        minLength: jQuery.validator.format("At least {0} characters required!"),
      },
      phone: "Please leave your phone number",

      email: {
        required: "We need your email address to contact you",
        email: "Your email address must be in the format of name@domain.com",
      },
    },
  });
  $("#order form").validate();

  $("input[name=phone]").mask("+7 (999) 999-99-99");

  $("form").submit(function (e) {
    e.preventDefault();
    if (!$(this).valid()) {
      return;
    }
    $.ajax({
      type: "POST",
      url: "sass/script/mailer/mailer/smart.php",
      data: $(this).serialize(),
    }).done(function () {
      $(this).find("input").val("");
      $("#consultation, #order").fadeOut();
      $(".overlay, #thanks").fadeIn("slow");
      $("form").trigger("reset");
    });

    console.log("FETCH WORKED");
    return false;
  });

  $(window).scroll(function(){
    if($(this).scrollTop() > 1600){
      $('pageup').fadeIn();
    }
    else{
      $('.pageup').fadeOut();
    }
  });

  $("a[href^='#']").click(function(){
    var _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
  });
});
