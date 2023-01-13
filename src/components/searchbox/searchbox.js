import React, { useState, useEffect } from "react";

import "./searchbox.css";

function SearchBox({ searchHandler }) {
    const [query, setQuery] = useState("chennai");
    const getWeatherData = () => {
      fetch(
        `${process.env.REACT_APP_WEATHER_API_BASEURL}weather?q=${query}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      )
        .then((res) => res.json())
        .then((result) => {
          searchHandler(result);
        });
    };

    useEffect(() => {
      getWeatherData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const search = (evt) => {
        if (evt.key === "Enter") {
          getWeatherData();
        }
    };

  return (
    <div className="search-box">
      <input
        type="text"
        className="search-bar"
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        onKeyDown={search}
      />
    </div>
  );
}

export default SearchBox;
