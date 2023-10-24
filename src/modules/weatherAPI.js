import { format } from "date-fns";

export default async function getWeatherData(query) {
  const weatherObj = {};
  const url = `https://api.weatherapi.com/v1/forecast.json?key=ee9b377f54554d50bb130814231310&aqi=no&q=${query}`;
  const response = await fetch(url, { mode: "cors" });
  if (!response.ok) {
    if (response.status === 400) {
      throw new Error("Location not found.");
    } else {
      throw new Error("Unexpected error fetching weather data");
    }
  } else {
    const weatherData = await response.json();
    weatherObj.condition = weatherData.current.condition.text;
    weatherObj.area = weatherData.location.name;
    weatherObj.country = weatherData.location.country;
    weatherObj.localtime = weatherData.location.localtime;
    weatherObj.weatherIcon = weatherData.current.condition.icon;
    weatherObj.temp_C = weatherData.current.temp_c;
    weatherObj.temp_F = weatherData.current.temp_f;
    weatherObj.feelsLike_C = weatherData.current.feelslike_c;
    weatherObj.feelsLike_F = weatherData.current.feelslike_f;
    weatherObj.humidity = weatherData.current.humidity;
    weatherObj.cloud = weatherData.current.cloud;
    weatherObj.wind_kph = weatherData.current.wind_kph;
    weatherObj.wind_mph = weatherData.current.wind_mph;
    weatherObj.date = format(
      new Date(weatherObj.localtime),
      "iiii, do MMM ''yy",
    );
    weatherObj.time = format(new Date(weatherObj.localtime), "h:mm a");
    return weatherObj;
  }
}
