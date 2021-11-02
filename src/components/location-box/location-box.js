import React from "react";

import "./location-box.css";
import { MONTHS, DAYS } from "../../constants";

function LocationBox({ weather }) {
  const dateBuilder = (d) => {
    let day = DAYS[d.getDay()];
    let date = d.getDate();
    let month = MONTHS[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div className="location-box">
      <div className="location">{`${weather.name}, ${weather.sys.country}`}</div>
      <div className="date">{dateBuilder(new Date())}</div>
    </div>
  );
}

export default LocationBox;
