function updateWeatherData(response) {
  let currentTempElement = document.querySelector("#current-temp-value");
  let currentTempValue = Math.round(response.data.temperature.current);
  currentTempElement.innerHTML = currentTempValue;
}

function searchCity(cityName) {
  let apiKey = "od6b13a01c4ef9abd54c31t431434300";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeatherData);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);
