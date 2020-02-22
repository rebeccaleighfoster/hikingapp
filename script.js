"use strict"

const apiKey = "0dc9cdf552792774dc8d044acd03d90f"

const searchURL = "https://api.openweathermap.org/data/2.5/weather?zip="


function displayIDResults(responseJson) {
   $("#js-search-results").empty();
   $(".js-error-message").empty();
   var answer;
   //targets weather ID in JSON data returned from API, IDs are noted as 'case' in the switch statement
 switch(responseJson["weather"][0]["id"]) {
   case 200: case 201: case 202: case 210: case 211: case 212: case 221: case 230: case 231: case 232:
      answer = "<p>It is thunderstoming! Bring a rainjacket and stay off the water. Be ready to get into lightening position if needed.</p>";
      break;
   case 300: case 301: case 302: case 310: case 311: case 312: case 313: case 314: case 321: 
      answer = "<p>It is expected to drizzle! Pack a rainjacket.</p>";
      break;
    case 500: case 501: case 502: case 503: case 504: case 511: case 520: case 521: case 522: case 531:
      answer = "<p>It is going to rain! Bring a rainjacket and rain pants.</p>";
      break;
    case 600: case 601: case 602: case 611: case 612: case 613: case 615: case 616: case 620: case 621: case 622:
      answer = "<p>It is going to snow! Yikes! bundle up with a jackets, snowpants, and maybe even some snowshoes!</p>";
      break;
    case 781:
      answer = "<p>Aaah! There is a tornado! Stay inside!</p>";
      break;
    case 800:
      answer = "<p>There are no clouds in the sky! Enjoy, but remember to bring sunscreen, sunglasses and a hat.</p>";
      break;
    case 801: case 802:
      answer = "<p> There are very few clouds in the sky! Enjoy, but remember to bring sunscreen, sunglasses and a hat. </p>";
      break;
    case 803: case 804:
      answer ="<p> It is pretty cloudy, so no need to worry about a hat or sunglasses, but it is always a good idea to wear sunscreen!</p>";
      break;
  }
  console.log(answer)
  $("#js-search-results").html(answer);
  $('.results').removeClass('hidden');
 
}

function getData(zipCode){
  const url = searchURL + zipCode + ",us&appid=" + apiKey;
  console.log(url)
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
   .then(responseJson => {
     if (responseJson.total == "0"){
        $('#js-error-message').text(`We couldn't find you any current weather info. Try typing something else`);
      }
      else {displayIDResults(responseJson)};
    })
    .catch(err => {
      $(".results").addClass('hidden');
      $('.js-error-message').text(`Something went wrong: ${err.message}`);
    });
   }
   
function watchForm() {
  $('form').submit(event => {
    console.log('watchForm Is Working');
    event.preventDefault();
    const zipCode = $('#js-zipCode').val();
    if (zipCode.trim() === "") {
      alert("Please enter a zip code!");
  }
    getData(zipCode);
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});