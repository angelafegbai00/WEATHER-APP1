function formDateValue() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  //Displays the current date and time when app is run
  let recentTime = new Date();

  let dateNow = recentTime.getDate();
  let day = days[recentTime.getDay()];
  let hour = recentTime.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = recentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let nowDate = document.querySelector("#now-Date");
  nowDate.innerHTML = `${dateNow}, ${day} ${hour}:${minutes}`;
}
formDateValue();

function searchCityButton(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city-input");
  searchCity(cityInput.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCityButton);

function searchCity(city) {
  let apiKey = "5d95fd50506eedab42e7a378d353b99a";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

//location api

function showTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let iconElement = document.querySelector("#weatherIcon");
  let descriptionElement = document.querySelector("#description");
  degreeTemperature = Math.round(response.data.main.temp);

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = degreeTemperature;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )}`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

//Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.

function searchLocation(position) {
  let apiKey = "5d95fd50506eedab42e7a378d353b99a";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
