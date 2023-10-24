import getWeatherData from "./weatherAPI";

function handleUnitButtons(weatherData) {
  const weatherTempBtn = document.querySelector(".weather-temp-button");
  weatherTempBtn.temp_C = weatherData.temp_C;
  weatherTempBtn.temp_F = weatherData.temp_F;
  const weatherFeelBtn = document.querySelector(".weather-feel-button");
  weatherFeelBtn.feelsLike_C = weatherData.feelsLike_C;
  weatherFeelBtn.feelsLike_F = weatherData.feelsLike_F;
  const weatherWindBtn = document.querySelector(".weather-wind-button");
  weatherWindBtn.wind_kph = weatherData.wind_kph;
  weatherWindBtn.wind_mph = weatherData.wind_mph;
}

function showData(weatherData) {
  const errorDiv = document.querySelector(".error");
  errorDiv.textContent = "";
  const weatherCondition = document.querySelector(".weather-condition");
  const weatherIcon = document.querySelector(".weather-condition-icon");
  const weatherArea = document.querySelector(".weather-area");
  const weatherCountry = document.querySelector(".weather-country");
  const weatherDate = document.querySelector(".weather-date");
  const weatherTime = document.querySelector(".weather-time");
  const weatherTemp = document.querySelector(".weather-temp");
  const weatherFeel = document.querySelector(".weather-feel-value");
  const weatherHumidity = document.querySelector(".weather-humidity-value");
  const weatherCloud = document.querySelector(".weather-cloud-value");
  const weatherWind = document.querySelector(".weather-wind-value");
  weatherCondition.textContent = weatherData.condition;
  weatherIcon.src = weatherData.weatherIcon;
  weatherArea.textContent = `${weatherData.area} ,`;
  weatherCountry.textContent = weatherData.country;
  weatherDate.textContent = weatherData.date;
  weatherTime.textContent = weatherData.time;
  weatherTemp.textContent = `${weatherData.temp_C} °C`;
  weatherFeel.textContent = `${weatherData.feelsLike_C} °C`;
  weatherHumidity.textContent = `${weatherData.humidity} %`;
  weatherCloud.textContent = `${weatherData.cloud} %`;
  weatherWind.textContent = `${weatherData.wind_kph} Km/h`;

  handleUnitButtons(weatherData);
}

async function handleSearch() {
  const searchQuery = document.querySelector("#search-box-input").value;
  const errorDiv = document.querySelector(".error");

  if (searchQuery) {
    try {
      const weatherData = await getWeatherData(searchQuery);
      showData(weatherData);
    } catch (error) {
      errorDiv.textContent = error.message;
    }
  }
}

function handleTempUnit() {
  const weatherTemp = document.querySelector(".weather-temp");
  if (this.textContent === "°F") {
    this.textContent = "°C";
    weatherTemp.textContent = `${this.temp_F} °F`;
  } else {
    this.textContent = "°F";
    weatherTemp.textContent = `${this.temp_C} °C`;
  }
}
function handleFeelUnit() {
  const weatherFeel = document.querySelector(".weather-feel-value");
  if (this.textContent === "°F") {
    this.textContent = "°C";
    weatherFeel.textContent = `${this.feelsLike_F} °F`;
  } else {
    this.textContent = "°F";
    weatherFeel.textContent = `${this.feelsLike_C} °C`;
  }
}
function handleWindUnit() {
  const weatherWind = document.querySelector(".weather-wind-value");
  if (this.textContent === "M/h") {
    this.textContent = "Km/h";
    weatherWind.textContent = `${this.wind_mph} M/h`;
  } else {
    this.textContent = "M/h";
    weatherWind.textContent = `${this.wind_kph} Km/h`;
  }
}

export default async function loadPage() {
  const searchButton = document.querySelector("#search-box-button");
  const weatherTempBtn = document.querySelector(".weather-temp-button");
  const weatherFeelBtn = document.querySelector(".weather-feel-button");
  const weatherWindBtn = document.querySelector(".weather-wind-button");
  searchButton.addEventListener("click", handleSearch);
  document.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  });
  weatherTempBtn.addEventListener("click", handleTempUnit);
  weatherFeelBtn.addEventListener("click", handleFeelUnit);
  weatherWindBtn.addEventListener("click", handleWindUnit);
  showData(await getWeatherData("Krishnanagar"));
}
