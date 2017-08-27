$(document).ready(function($) {
  function setHeight() {
    windowHeight = $(window).innerHeight();
    $('.container').css('height', windowHeight);
  };
  setHeight();
  $(window).resize(function() {
    setHeight();
  });

  // ScrollMagic controller init
  var controller = new ScrollMagic.Controller();

  // loop through .display-text items and add scene
  $('.display-text').each(function(){
    var myScene = new ScrollMagic.Scene({
      triggerElement: this,
      triggerHook: 0.8
    })
    .setClassToggle(this, "fade-in")
    .addTo(controller);
  });
});
