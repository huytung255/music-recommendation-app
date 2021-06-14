import React from "react";
import Genre from "./Genre";
const GenreList = ({ genreList, select, deselect }) => {
  return (
    <div className="d-flex flex-wrap justify-content-center mt-3">
      {genreList.map((genre, i) => (
        <Genre key={i} genre={genre} select={select} deselect={deselect} />
      ))}
    </div>
  );
};

export default GenreList;
