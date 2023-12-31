function formatDate(date) {
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let hours = date.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  let currentDate = `${months[date.getMonth()]}, ${date.getDate()}. ${
    weekDays[date.getDay()]
  }, ${hours}:${minutes}`;
  return currentDate;
}

function updateTimeDate(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let dateElement = document.querySelector("#date-time");
  dateElement.innerHTML = formatDate(date);
}

function updateWeatherData(response) {
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = response.data.city;

  let countryName = document.querySelector("#country-name");
  countryName.innerHTML = response.data.country;

  updateTimeDate(response.data.time);

  let iconContainer = document.querySelector("#current-weather-icon");
  let icon = `<img src="${response.data.condition.icon_url}">`;
  iconContainer.innerHTML = icon;

  let currentTempElement = document.querySelector("#current-temp-value");
  let currentTempValue = Math.round(response.data.temperature.current);
  currentTempElement.innerHTML = currentTempValue;

  let feelsLikeElement = document.querySelector("#feels-like");
  let feelsLikeTemp = Math.round(response.data.temperature.feels_like);
  feelsLikeElement.innerHTML = `Feels like ${feelsLikeTemp}°`;

  let descriptionElement = document.querySelector(
    "#current-weather-description"
  );
  let description = response.data.condition.description;
  descriptionElement.innerHTML =
    description.charAt(0).toUpperCase() + description.slice(1);

  let humidityValueElement = document.querySelector("#humidity-value");
  humidityValueElement.innerHTML = response.data.temperature.humidity;

  let windValueElement = document.querySelector("#wind-value");
  windValueElement.innerHTML = `${response.data.wind.speed} m/s`;

  let pressureValueElement = document.querySelector("#pressure-value");
  pressureValueElement.innerHTML = response.data.temperature.pressure;

  getForecast(response.data.city);
}

function searchCity(cityName) {
  let apiKey = "od6b13a01c4ef9abd54c31t431434300";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeatherData);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

function getForecast(city) {
  let apiKey = "od6b13a01c4ef9abd54c31t431434300";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return weekDays[date.getDay()];
}

function displayForecast(response) {
  let weatherForecastElement = document.querySelector(
    "#weather-forecast-container"
  );
  let forecastData = response.data.daily;
  let forecastHtml = "";
  forecastData.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml += `<div class="forecast-day">
            <p class="weekday-name">${formatDay(day.time)}</p>
            <img
              class="forecast-day-icon"
              src=${day.condition.icon_url}
            />
            <span class="forecast-day-temp-max">${Math.round(
              day.temperature.maximum
            )}°</span>
            <span class="forecast-day-temp-min">${Math.round(
              day.temperature.minimum
            )}°</span>
          </div>`;
    }
  });
  weatherForecastElement.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);

searchCity("Dnipro");
displayForecast();
