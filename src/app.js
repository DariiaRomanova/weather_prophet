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
  updateTimeDate(response.data.time);
  let currentTempElement = document.querySelector("#current-temp-value");
  let cityName = document.querySelector("#city-name");
  let countryName = document.querySelector("#country-name");
  let feelsLikeElement = document.querySelector("#feels-like");
  let descriptionElement = document.querySelector(
    "#current-weather-description"
  );
  let humidityValueElement = document.querySelector("#humidity-value");
  let windValueElement = document.querySelector("#wind-value");
  let pressureValueElement = document.querySelector("#pressure-value");

  cityName.innerHTML = response.data.city;
  countryName.innerHTML = response.data.country;

  let currentTempValue = Math.round(response.data.temperature.current);
  currentTempElement.innerHTML = currentTempValue;

  let feelsLikeTemp = Math.round(response.data.temperature.feels_like);
  feelsLikeElement.innerHTML = `Feels like ${feelsLikeTemp}°`;

  let description = response.data.condition.description;
  descriptionElement.innerHTML =
    description.charAt(0).toUpperCase() + description.slice(1);
  humidityValueElement.innerHTML = response.data.temperature.humidity;
  windValueElement.innerHTML = `${response.data.wind.speed} m/s`;
  pressureValueElement.innerHTML = response.data.temperature.pressure;
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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);

searchCity("Dnipro");
