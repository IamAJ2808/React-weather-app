import React from "react";

import "./weather-detail.css";
import {
  WiThermometer,
  WiRaindrops,
  WiStrongWind,
  WiBarometer,
} from "weather-icons-react";

function WeatherDetail({ weather }) {
  const details = [
    {
      name: "Feels Like",
      component: WiThermometer,
      value: `${weather.main.feels_like}${String.fromCharCode(176)}`,
    },
    {
      name: "Wind",
      component: WiStrongWind,
      value: `${weather.wind.speed} km/h`,
    },
    {
      name: "Humidity",
      component: WiRaindrops,
      value: `${weather.main.humidity} %`,
    },
    {
      name: "Pressure",
      component: WiBarometer,
      value: `${weather.main.pressure} hpa`,
    },
  ];

  const _renderWeatherDetail = (detail) => {
    const Icon = detail.component;
    return (
      <div className="detail-container" key={detail.name}>
        <div>
          <Icon size={64} color="#FFF" />
        </div>
        <div className="detail-description">{detail.name}</div>
        <div className="detail-value">{detail.value}</div>
      </div>
    );
  };

  return (
    <div className="weather-details">
      {details.map((detail) => _renderWeatherDetail(detail))}
    </div>
  );
}

export default WeatherDetail;
