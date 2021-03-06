var x;
var y;
var locationArray = [];

$("document").ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      x = position.coords.latitude;
      y = position.coords.longitude;
    

      getJSONData();

      getLocationName();
    }); // end of geolocation.getCurrentPosition function
  } // end of if (navigator.gelocation) function
}); // End of document.ready function



// main JSON API call for weather and icon data.
function getJSONData() {
  var fccWxApi =
    "https://fcc-weather-api.glitch.me/api/current?" + "lat=" + x + "&lon=" + y;
  $.getJSON(fccWxApi, function(data) {
    var forecastOb = "";
    forecastOb = data;

    var tempC = forecastOb.main.temp;
    tempC = Math.round(tempC);
    var tempF = forecastOb.main.temp * 9 / 5 + 32;
    tempF = Math.round(tempF);
    var humidity = forecastOb.main.humidity;
    var windSpeed = forecastOb.wind.speed;
    windSpeed = Math.round(windSpeed);
    var wxDesc = forecastOb.weather[0].description;
    var locale = forecastOb.main.name;
    var wxIcon = forecastOb.weather[0].icon;

    // jQuery to place weather data into <div> items in HTML
    $("#tempF").prepend(
      "Temperature: <br>" + "<font-size='10'>" + tempF + "</font>"
    );
    $("#tempC").prepend("Temperature: <br>" + tempC);
    $("#forecast").append("Humidity: " + humidity + "%" + "<br>");
    $("#forecast").append("Wind Speed: " + windSpeed + "mph" + "<br>");
    $("#forecast").append("Conditions: " + wxDesc + "<br>");
    $("#forecast").append(locale);
    $("#wxIcon").append(
      "<br>" + "<img src=" + wxIcon + "width = 90 height = 90" + ">"
    );

    //  Button code to switch between F and C scale
    $("#buttonBox").click(function() {
      $("#tempF").toggle();
      $("#tempC").toggle();
    });
  });
}

function successFn(result) {
  console.log("Setting result");
}

function errorFn(xhr, status, strErr) {
  console.log("There was an error!");
}

// CHANGE COORDINDATES TO LOCATION NAME 

function getLocationName() {
  googleLocAPI =
    "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + x + "," + y;
  $.getJSON(googleLocAPI, function(data) {
    $("#forecast").prepend(
      data.results[0].address_components[3].long_name + "<br>"
    );
    $("#forecast").prepend(
      data.results[0].address_components[2].long_name +
        ", " +
        data.results[0].address_components[4].short_name +
        "<br>"
    );
  });
}
