import React, { useState } from "react";

import "./App.css";
import { MONTHS, DAYS, WEATHER_BG_CLASS } from "./constants";
import { API_DETAILS } from "./config";

import Toast from "./widgets/toast/toast";
import { WiThermometer, WiRaindrops, WiStrongWind, WiBarometer } from "weather-icons-react";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [iconUrl, setIconUrl] = useState("");
  const [toastOptions, setToastOptions] = useState({
    message: "",
    status: false,
  });

  const dateBuilder = (d) => {
    let day = DAYS[d.getDay()];
    let date = d.getDate();
    let month = MONTHS[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(
        `${API_DETAILS.baseUrl}weather?q=${query}&units=metric&appid=${API_DETAILS.key}`
      )
        .then((res) => res.json())
        .then((result) => {
          if (result.cod === 200) {
            const imgurl = result.weather
              ? `http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`
              : "";
            setWeather(result);
            setIconUrl(imgurl);
            setQuery("");
          } else {
            let options = { message: result.message, status: true };
            setToastOptions(options);
            setTimeout(() => {
              setToastOptions({ message: "", status: false });
            }, 3000);
          }
        });
    }
  };

  const getBgImage = () => {
    let bgImgClass = "";
    if (weather.weather) {
      bgImgClass = WEATHER_BG_CLASS[weather.weather[0].main];
    }
    return bgImgClass;
  };

  return (
    <div className={`App ${getBgImage()}`}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {weather.main ? (
          <>
            <div className="location-box">
              <div className="location">{`${weather.name}, ${weather.sys.country}`}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                <img src={iconUrl} alt="icon" /> {Math.round(weather.main.temp)}
                &#176;c
              </div>
              <div className="weather">{weather.weather[0].main}</div>
              <div className="weather-details">
                <div className="detail-container">
                  <div><WiThermometer size={64} color='#FFF' /></div>
                  <div className="detail-description">Feels Like</div>
                  <div className="detail-value">{weather.main.feels_like}&#176;</div>
                </div>
                <div className="detail-container">
                <div><WiStrongWind size={64} color='#FFF' /></div>
                  <div className="detail-description">Wind</div>
                  <div className="detail-value">{weather.wind.speed} km/h</div>
                </div>
                <div className="detail-container">
                <div><WiRaindrops size={64} color='#FFF' /></div>
                  <div className="detail-description">Humidity</div>
                  <div className="detail-value">{weather.main.humidity} %</div>
                </div>
                <div className="detail-container">
                <div><WiBarometer size={64} color='#FFF' /></div>
                  <div className="detail-description">Pressure</div>
                  <div className="detail-value">{weather.main.pressure} hpa</div>
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </main>
      {toastOptions.status && <Toast message={toastOptions.message} />}
    </div>
  );
}

export default App;
