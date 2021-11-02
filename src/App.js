import React, { useState } from "react";

import "./App.css";
import { WEATHER_BG_CLASS } from "./constants";

import Toast from "./components/toast/toast";
import SearchBox from "./components/searchbox/searchbox";
import LocationBox from "./components/location-box/location-box";
import WeatherBox from "./components/weather-box/weather-box";

function App() {
  const [weather, setWeather] = useState({});
  const [iconUrl, setIconUrl] = useState("");
  const [toastOptions, setToastOptions] = useState({
    message: "",
    status: false,
  });

  const searchHandler = (result) => {
    if (result.cod === 200) {
      const imgurl = result.weather
        ? `http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`
        : "";
      setWeather(result);
      setIconUrl(imgurl);
    } else {
      let options = { message: result.message, status: true };
      setToastOptions(options);
      setTimeout(() => {
        setToastOptions({ message: "", status: false });
      }, 3000);
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
        <SearchBox searchHandler={searchHandler} />
        {weather.main ? (
          <>
            <LocationBox weather={weather} />
            <WeatherBox weather={weather} iconUrl={iconUrl}/>
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
