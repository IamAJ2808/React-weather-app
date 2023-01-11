import React, { useState, useEffect } from "react";

import "./searchbox.css";

const getWeatherData = (query) => {
  return fetch(
    `${process.env.REACT_APP_WEATHER_API_BASEURL}weather?q=${query}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
  )
    .then((res) => res.json())
    .then((result) => result);
};

function SearchBox({ searchHandler }) {
    const [query, setQuery] = useState("chennai");

    // const getWeatherData = () => {
    //   fetch(
    //     `${process.env.REACT_APP_WEATHER_API_BASEURL}weather?q=${query}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
    //   )
    //     .then((res) => res.json())
    //     .then((result) => {
    //         searchHandler(result);
    //         setQuery("");
    //     });
    // };

    useEffect(() => {
      getWeatherData(query).then((result) => {
        searchHandler(result);
        setQuery("");
      });
    },[]);

    const search = (evt) => {
        if (evt.key === "Enter") {
          getWeatherData(query).then((result) => {
            searchHandler(result);
            setQuery("");
          });
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
