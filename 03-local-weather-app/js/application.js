$(document).ready(function () {

    // Google maps api key: AIzaSyAOK2k5ZyLU7F8WDw0hQD4IjjVRVYGEloc
    // OpenWeatherMAp api key: 3d2a6da43106ed28b1f9b6457a036b0b

    // OpenWeatherMap url
    // http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=3d2a6da43106ed28b1f9b6457a036b0b

    /*
    {
        "coord":{
        "lon":138.93,
        "lat":34.97
        },
        "weather":[
        {
            "id":804,
            "main":"Clouds",
            "description":"overcast clouds",
            "icon":"04n"
        }
        ],
        "base":"stations",
        "main":{
        "temp":291.885,
            "pressure":1022.03,
            "humidity":100,
            "temp_min":291.885,
            "temp_max":291.885,
            "sea_level":1031.25,
            "grnd_level":1022.03
    },
        "wind":{
        "speed":1.85,
            "deg":9.50519
    },
        "clouds":{
        "all":92
    },
        "dt":1477937700,
        "sys":{
        "message":0.0659,
            "country":"JP",
            "sunrise":1477861493,
            "sunset":1477900220
    },
        "id":1851632,
        "name":"Shuzenji",
        "cod":200
    }
    */


    var temp = "";
    var low = "";
    var high = "";
    var iconCode = "";
    var background = "";

    $(function () {

        fetchJsonString();

    });

    // OpenWeatherMap url
    // http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=3d2a6da43106ed28b1f9b6457a036b0b
    // download OpenWeather data given coords
    var fetchJsonString = function () {
        if (navigator.geolocation) {

            // navigator.geolocation.getCurrentPosition(function (position) {
            //
            //     var url = "http://api.openweathermap.org/data/2.5/weather?units=metric" +
            //         "&lat=" + position.coords.latitude +
            //         "&lon=" + position.coords.longitude +
            //         "&appid=3d2a6da43106ed28b1f9b6457a036b0b";
            //
            //     $.getJSON(url, function (result) {
            //         console.log("DATA: " + JSON.stringify(result)); // DEBUG
            //
            //         // retrieve the results & populate the html elements
            //         var description = result.weather[0].description;
            //         iconCode = result.weather[0].icon;
            //         temp = result.main.temp; // temp in celsius
            //         var pressure = result.main.pressure;
            //         var humidity = result.main.humidity;
            //         low = result.main.temp_min;
            //         high = result.main.temp_max;
            //         var winSpeed = result.wind.speed;
            //         var windDegs = result.wind.deg;
            //         var countryCode = result.sys.country;
            //
            //         $(".description").text(capitalizeFirstLetter(description));
            //         $(".current-location").text(countryCode);
            //         $(".temp-result").text(temp.toFixed(1));
            //         $(".low").text(low.toFixed(1));
            //         $(".high").text(high.toFixed(1));
            //         $(".pressure .reading").text(pressure.toFixed());
            //         $(".humidity .reading").text(humidity.toFixed());
            //         $(".wind-speed .reading").text(winSpeed.toFixed());
            //
            //         setWeatherIconAndBackground();
            //     })
            //
            // });


            navigator.geolocation.getCurrentPosition(function(success) {
                var url = "http://api.openweathermap.org/data/2.5/weather?units=metric" +
                    "&lat=" + success.coords.latitude +
                    "&lon=" + success.coords.longitude +
                    "&appid=3d2a6da43106ed28b1f9b6457a036b0b";

                $.getJSON(url, function (result) {
                    console.log("DATA: " + JSON.stringify(result)); // DEBUG

                    // retrieve the results & populate the html elements
                    var description = result.weather[0].description;
                    iconCode = result.weather[0].icon;
                    temp = result.main.temp; // temp in celsius
                    var pressure = result.main.pressure;
                    var humidity = result.main.humidity;
                    low = result.main.temp_min;
                    high = result.main.temp_max;
                    var winSpeed = result.wind.speed;
                    var windDegs = result.wind.deg;
                    var countryCode = result.sys.country;

                    $(".description").text(capitalizeFirstLetter(description));
                    $(".current-location").text(countryCode);
                    $(".temp-result").text(temp.toFixed(1));
                    $(".low").text(low.toFixed(1));
                    $(".high").text(high.toFixed(1));
                    $(".pressure .reading").text(pressure.toFixed());
                    $(".humidity .reading").text(humidity.toFixed());
                    $(".wind-speed .reading").text(winSpeed.toFixed());

                    setWeatherIconAndBackground();
                })

            }, function(failure) {
                if(failure.message.indexOf("Only secure origins are allowed") == 0) {
                    // Secure Origin issue.
                    alert("Your particular browser does not support obtaining location data from an un-secure origin, try Firefox instead");
                    background = backgrounds.cloudy;
                    $(".container").css("color", background);
                    $(".weather-icons .cloudy").removeClass("hide").addClass("active");
                }
            })

        }

    };





    // change temp units on switch toggle
    $(".mdl-js-switch").on("click", function() {
        if ($(this).hasClass("is-checked")) {
            // switch to fahrenheit
            $(".units.celsius").removeClass("active").addClass("hide");
            $(".units.fahrenheit").removeClass("hide").addClass("active");
            $(".temp-result").text(convertToF(temp).toFixed(1));
            $(".low").text(convertToF(low).toFixed(1));
            $(".high").text(convertToF(high).toFixed(1));
            //return $(this).children().first().attr("checked", true);
        } else {
            // switch to celsius
            $(".units.celsius").removeClass("hide").addClass("active");
            $(".units.fahrenheit").removeClass("active").addClass("hide");
            $(".temp-result").text(temp.toFixed(1));
            $(".low").text(low.toFixed(1));
            $(".high").text(high.toFixed(1));
            //return $(this).children().first().removeAttr("checked");
        }
    });

    // set weather icon and background
    function setWeatherIconAndBackground() {
        console.log("icon code: " + iconCode);

        // differentiate between night & day
        if ("n" === iconCode.charAt(iconCode.length - 1)) {
            background = backgrounds.night;
            switch (iconCode.substr(0, 2)) {
                case "09": case "10":
                    $(".weather-icons .rainy").removeClass("hide").addClass("active");
                    break;
                case "11":
                    $(".weather-icons .thunder-storm").removeClass("hide").addClass("active");
                    break;
                case "13":
                    $(".weather-icons .flurries").removeClass("hide").addClass("active");
                    break;
                case "01": case "02": case "03": case "04": case "50":

                default:
                    $(".weather-icons .cloudy").removeClass("hide").addClass("active");
            }

        } else {
            switch (iconCode.substr(0, 2)) {
                case "01":
                    background = backgrounds.sunny;
                    $(".weather-icons .sunny").removeClass("hide").addClass("active");
                    break;
                case "09":
                    background = backgrounds.rainy;
                    $(".weather-icons .rainy").removeClass("hide").addClass("active");
                    break;
                case "10":
                    background = backgrounds.sunShower;
                    $(".weather-icons .sun-shower").removeClass("hide").addClass("active");
                    break;
                case "11":
                    background = backgrounds.thunderstorm;
                    $(".weather-icons .thunder-storm").removeClass("hide").addClass("active");
                    break;
                case "13":
                    background = backgrounds.flurries;
                    $(".weather-icons .flurries").removeClass("hide").addClass("active");
                    break;
                case "02": case "03": case "04": case "50":

                default:
                    background = backgrounds.cloudy;
                    $(".weather-icons .cloudy").removeClass("hide").addClass("active");

            }
        }
        $(".container").css("color", background);

    }


    // Helper functions
    function capitalizeFirstLetter(word) {
        var str = word.slice(0, 1).toUpperCase();
        var remaining = word.slice(1);
        return str + remaining;
    }

    function convertToF(celsius) {
        return (celsius * 9)/5 + 32;
    }


    // return the current location object - NOT USED
    var currentLocation = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                // DEBUG
                console.log("lat: " + position.coords.latitude + ", lng: " + position.coords.longitude);
                return position
            })
        }
    };

    // set the current location - NOT USED
    var setLocation = function (position) {
        var geocoder = new google.maps.Geocoder;
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        var latlng = new google.maps.LatLng(lat, lng);
        geocoder.geocode({'latLng': latlng}, function (results, status) {
            // iterate through results
        })
    };



    // set color property on .container
    var backgrounds = {
        night: "#331133",
        sunShower: "#8868DA",
        thunderstorm: "#334433",
        cloudy: "#BDC1C4",
        flurries: "#A2BCE4",
        sunny: "#FFBE1E",
        rainy: "#1A7FED"
    };


});
