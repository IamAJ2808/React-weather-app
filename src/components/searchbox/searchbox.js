import React, { useState } from "react";

import "./searchbox.css";
import { API_DETAILS } from "../../config";

function SearchBox({ searchHandler }) {
    const [query, setQuery] = useState("");

    const search = (evt) => {
        if (evt.key === "Enter") {
          fetch(
            `${API_DETAILS.baseUrl}weather?q=${query}&units=metric&appid=${API_DETAILS.key}`
          )
            .then((res) => res.json())
            .then((result) => {
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
        onKeyPress={search}
      />
    </div>
  );
}

export default SearchBox;
