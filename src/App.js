import React, { useState } from "react";

import "./App.css";
import { API_DETAILS } from "./config";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [iconUrl, setIconUrl] = useState('');

  const rainyKeys = ["Drizzle", "Rain"];

  const dateBuilder = (d) => {
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
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${API_DETAILS.baseUrl}weather?q=${query}&units=metric&appid=${API_DETAILS.key}`)
        .then((res) => res.json())
        .then((result) => {
          const imgurl = result.weather ? `http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png` : '';
          setWeather(result);
          setIconUrl(imgurl);
          setQuery("");
        });
    }
  };

  const getBgImage = () => {
    let bgImgClass = "App";
    if(weather.weather && rainyKeys.includes(weather.weather[0].main)) {
      bgImgClass = "App rain";
    }else if(weather.main) {
      bgImgClass = ((weather.main.temp > 16) ? "App warm" : "App");
    }
    return bgImgClass;
  }

  return (
    <div className={getBgImage()}>
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
                <img
                  src={iconUrl}
                  alt="icon"
                />{" "}
                {Math.round(weather.main.temp)}&#176;c
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
