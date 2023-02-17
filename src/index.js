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

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
        <div class=weather-forecast-date>${formatDay(
          forecastDay.dt
        )}</div>               
        <img src="https://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" alt="cloud" width="42" />
         <div class="weather-forecast-temperature">
           <span class="weather-forecast-temp-max"> ${Math.round(
             forecastDay.temp.max
           )}°
             </span>
                 <span class="weather-forecast-temp-min">
                   ${Math.round(forecastDay.temp.min)}°
                   </span>
           </div>
    </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "c544cc0b1b14fc3f9a412974ee9cff4a";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

function searchCityButton(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city-input");
  searchCity(cityInput.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCityButton);

function searchCity(city) {
  let apiKey = "8628e1935308ab7a73f004d404aeot25";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

//location api

function showTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let iconElement = document.querySelector("#weatherIcon");
  let descriptionElement = document.querySelector("#description");
  let degreeTemperature = Math.round(response.data.temperature.current);

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = degreeTemperature;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.temperature.humidity}`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )}`;
  descriptionElement.innerHTML = response.data.condition.description;
  iconElement.setAttribute("src", response.data.condition.icon_url);
  iconElement.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates);
}

searchCity("manchester");
