$(document).ready(function(){
  var FSS = {};
  FSS.body = $('body'),
  FSS.header = $('.header'),
  FSS.wrapper = $('.wrapper'),
  FSS.menu = $('#menubar'),
  FSS.menuBtn = $('.menu_btn'),
  FSS.menuWidth = FSS.menu.outerWidth();

  FSS.shade = $('<div></div>').attr('class', 'shade').on('touchend', hideMenu);
  FSS.menu.before(FSS.shade);
  function showMenu (event) {
    event.preventDefault();
    FSS.shade.fadeIn(1000);
    currentScroll = $(window).scrollTop();
    FSS.body.css({
      position: 'fixed',
      width: '100%',
      top: -1 * currentScroll
    });

    FSS.menu.animate({
      'right' : 0
    }, 400);
    FSS.wrapper.animate({
      'right' : FSS.menuWidth
    }, 800);
    FSS.header.animate({
      'right' : FSS.menuWidth
    }, 800);
    FSS.menu.find('.menu_gray').on('touchend', hideMenu);
  }

  function hideMenu (event) {
    event.preventDefault();
    FSS.shade.fadeOut(1000);
    FSS.body.attr('style', '');
    $('html, body ,a').prop({scrollTop: currentScroll});
    FSS.menu.prop({scrollTop: 0}).animate({
      'right' : -FSS.menuWidth
    }, 400);
    FSS.wrapper.animate({
      'right' : 0
    }, 800);
    FSS.header.animate({
      'right' : 0
    }, 800);
  }
  FSS.menuBtn.on('click touchend', showMenu);

  $(document).on('click touchend',"a",function() {
    var headerHight = 90;
    var speed = 400;
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top-headerHight;
    $('body,html').animate({scrollTop:position}, speed, 'swing');
    return false;
  });

  $(".list-text").hide();
  $(document).on('touchstart touchmove touchend', ".menu", function() {
    if ('touchstart' == event.type){
      $(this).attr('data-touchstarted', '');
      return;
    }

    if ('touchmove' == event.type){
      $(this).removeAttr('data-touchstarted');
      return;
    }

    if ('undefined' != typeof $(this).attr('data-touchstarted')){
      $(this).siblings("div.list-text").slideToggle('slow');
      var arrow = $(this).find(".left");
      if(arrow.hasClass('dropdown_toggle_on')){
        arrow.removeClass("dropdown_toggle_on");
        arrow.addClass("dropdown_toggle_off");
      } else {
        arrow.removeClass("dropdown_toggle_off");
        arrow.addClass("dropdown_toggle_on");
      }
      $(this).removeAttr('data-touchstarted');
    }

  });

  FSS.swiper = Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    visibilityFullFit:true,
    loop: true,
    centeredSlides: true,
    autoplay: 2500,
    autoplayDisableOnInteraction: false,
    effect: 'fade'
  });

  $(document).on('touchfirst', '.image-icon, .more', function () {
    $(this).find("img").css("opacity","0.7");
  });
});
