import React from "react";
import { useState } from "react";
const Genre = ({ genre, select, deselect }) => {
  const [selectedCSS, setSelectedCSS] = useState("");
  const handleClick = (genre) => {
    if (selectedCSS === "") {
      const temp = select("genres", genre);
      if (temp) {
        setSelectedCSS("genre-wrap-selected");
      }
    } else {
      deselect("genres", genre);
      setSelectedCSS("");
    }
  };
  return (
    <button
      className={`px-5 py-2 m-2 genre-wrap ` + selectedCSS}
      onClick={() => handleClick(genre)}
    >
      {genre}
    </button>
  );
};

export default Genre;
