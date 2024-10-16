function getWeather() {
  let temperature = document.getElementById("temperature");
  let description = document.getElementById("description");
  let location = document.getElementById("location");

  let api = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "2da1e54d97209acb6696623d0a65fa9e";

  location.innerHTML = "Locating...";

  navigator.geolocation.getCurrentPosition(success, error);

  function success(position) {
    //get exact coordinates
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    let url =
      api +
      "?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid=" +
      apiKey +
      //set to metric
      "&units=metric";
    if (temperature.name === "Clouds"){
      $("#img").attr("src","/img/170-1709571_cartoon-clip-art-cartoon-white-clouds-png-transparent.png");
    } 
    else if (temperature.name === "Lightning"){
       $("#img").attr("src","/img/R.png");
    } 
    fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    let temp = data.main.temp;
    let latitude = data.coord.lat;
    let longitude = data.coord.lon;

    temperature.innerHTML = `<span style="color: rgb(10,10,10); font-size: 24px;">${temp}° C</span>`;

    location.innerHTML = `<span style="font-weight: bold;">${data.name}</span> 
      <span>(${latitude}°, ${longitude}°)</span>`;

    description.innerHTML = `<span style="font-family: cursive;">${data.weather[0].main}</span>`;
  });

  }

  function error() {
    location.innerHTML = "Error when retrieving your location";
  }
}

getWeather();
