import React from "react";

import "./weather-box.css";
import WeatherDetail from "../weather-detail/weather-detail";

function WeatherBox({ weather, iconUrl }) {
  return (
    <div className="weather-box">
      <div className="temp">
        <img src={iconUrl} alt="icon" /> {Math.round(weather.main.temp)}
        &#176;c
      </div>
      <div className="weather">{weather.weather[0].main}</div>
      <WeatherDetail weather={weather} />
    </div>
  );
}

export default WeatherBox;
