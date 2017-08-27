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

  // Tweens
  var studyStacksTween = new TweenMax.to('#study-stacks-font', 1, {
    opacity: 1
  });
  var wheelOfLuckTween = new TweenMax.to('#wheel-of-luck-font', 1, {
    opacity: 1
  });
  var weatherAppTween = new TweenMax.to('#weather-app-font', 1, {
    opacity: 1
  });
  var aboutTween = new TweenMax.to('.about-text', 1, {
    opacity: 1
  });
  var contactTween = new TweenMax.to('#contact-text', 1, {
    opacity: 1
  });

  // Scenes
  var studyStacksScene = new ScrollMagic.Scene({
    triggerElement: "#study-stacks-font",
    offset: -200
  })
  .setTween(studyStacksTween)
  // .addIndicators({
  //     name: "Study Stacks"
  // })
  .addTo(controller);
  var wheelOfLuckScene = new ScrollMagic.Scene({
    triggerElement: "#wheel-of-luck-font",
    offset: -200
  })
  .setTween(wheelOfLuckTween)
  // .addIndicators({
  //   name: "Wheel of Luck"
  // })
  .addTo(controller);
  var weatherAppScene = new ScrollMagic.Scene({
    triggerElement: "#weather-app-font",
    offset: -200
  })
  .setTween(weatherAppTween)
  // .addIndicators({
  //   name: "Weather App"
  // })
  .addTo(controller);
  var contactScene = new ScrollMagic.Scene({
    triggerElement: "#contact-text",
    offset: -200
  })
  .setTween(contactTween)
  // .addIndicators({
  //     name: "Contact"
  // })
  .addTo(controller);
  var aboutScene = new ScrollMagic.Scene({
    triggerElement: ".about-text",
    offset: -200
  })
  .setTween(aboutTween)
  // .addIndicators({
  //     name: "About"
  // })
  .addTo(controller);
});
