$(document).ready(function($) {

  // WELCOME TO WeatherApp! //
  var WeatherApp = {
    // Store the currently observed zip/location object
    currentZip: {},
    init: function(){
      WeatherApp.startEventListeners();
    },
    // Event listener on initial submit button
    startEventListeners: function(){
      $('#submit-button').on("click", WeatherApp.getWeatherInfo);
    },
    // ajax call to obtain zip
    getWeatherInfo: function(){
      var zipCode = $('#zip-input').val();
      if (zipCode.length !== 5){
        alert("Please enter a 5-digit zip code");
      }
      $.ajax({
        url : "http://api.wunderground.com/api/82242faa6af37556/geolookup/conditions/q/"+zipCode+".json",
        dataType : "jsonp",
        success : function(parsed_json) {
          // console.log(parsed_json);
          WeatherApp.currentZip = parsed_json;
          WeatherApp.displayResults();
        }
      });
    },
    // Display results of api call
    displayResults: function(){
      var zip = WeatherApp.currentZip;

      // Pre-load zip value into display input
      $('#display-zip-input').val(zip.location.zip);
      if ($('#display-zip-input').val() == zip.location.zip) {
        $('#display-submit-button').html("Refresh");
      }
      $('#display-zip-input').click(function(){
        $('#display-submit-button').html("Submit");
      })

      // Core display info
      $('#location-display').html(zip.location.city);
      $('#state-display').html(zip.current_observation.display_location.state_name);
      $('#temp-display').html(zip.current_observation.temp_f + "&#176;");

      // Current weather display
      $('#current-status-display').html(zip.current_observation.weather);
      $('#status-image').attr('src', zip.current_observation.icon_url);
      $('.input-item').slideUp();
      $('#display-info-container').animate({height: "275px"}, 500).css('border', '1px solid black');
      $('#display-input-container').fadeIn(1000);
      $('#result-container').fadeIn(1000);

      // New listener updated display
      $('#display-submit-button').on("click", WeatherApp.refreshWeatherInfo);
    },
    // ajax call for updated display input/submit
    refreshWeatherInfo: function(){
      var zipCode = $('#display-zip-input').val();
      if (zipCode.length !== 5){
        alert("Please enter a 5-digit zip code");
      }
      $.ajax({
        url : "http://api.wunderground.com/api/82242faa6af37556/geolookup/conditions/q/"+zipCode+".json",
        dataType : "jsonp",
        success : function(parsed_json) {
          // console.log(parsed_json);
          WeatherApp.currentZip = parsed_json;
          WeatherApp.displayResults();
        }
      });
    },
  }
  // initialize WeatherApp
  WeatherApp.init();
});


// input animation after submit
// implement image rotation based on weather (party cloudy, rain, etc)
//add wunderground credit items
