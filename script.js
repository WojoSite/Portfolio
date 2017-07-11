$(document).ready(function($) {
  console.log("jquery ready");
  function setHeight() {
    windowHeight = $(window).innerHeight();
    $('.container').css('height', windowHeight);
  };
  setHeight();
  $(window).resize(function() {
    setHeight();
  });
  $(document).scroll(function() {
    var y = $(this).scrollTop();
    if (y > 175) {
      $('#splash-item-container').fadeOut();
    } else {
      $('#splash-item-container').fadeIn();
    }
  });
});
