let lat;
let long;
const apiKey = "1783226d35b4f6a4d4631e7bba3d563b";
let box = document.getElementById("weather");

window.onload = function () {
  if (navigator.geolocation) {
    //console.log("navigator działa")
    navigator.geolocation.getCurrentPosition((positon) => {
      lat = positon.coords.latitude;
      long = positon.coords.longitude;

      const url =
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
        lat +
        "&lon=" +
        long +
        "&units=metric&appid=" +
        apiKey;
      console.log(url);
      getWeatcher(url);
    });
  }
};

function getWeatcher(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => updateWeather(data));
}

function updateWeather(data) {
  console.log(data);
  //let icon = data.weather[0].icon;
  let imgUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  document.getElementById("weather-img").setAttribute("src", imgUrl);

  document.getElementById("city-name").innerHTML = data.name;
  document.getElementById(
    "city-name"
  ).href = `https://www.google.com/maps/place/${data.name}/`;
  //document.getElementById("city-name").style.color = "rgb(15, 238, 15)";

  document.getElementById("temp").innerHTML = data.main.temp + " °C";
  document.getElementById("temp-rel").innerHTML = data.main.feels_like + " °C";
  document.getElementById("hum").innerHTML = data.main.humidity + " %";
  document.getElementById("pressure").innerHTML = data.main.pressure + " hPa";
  document.getElementById("wind-speed").innerHTML = data.wind.speed + " m/s";

  let date = new Date(data.sys.sunrise * 1000);
  document.getElementById("sunrise").innerHTML = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  date = new Date(data.sys.sunset * 1000);
  document.getElementById("sunset").innerHTML = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  document.getElementById("wDescription").innerHTML =
    data.weather[0].description;
}
