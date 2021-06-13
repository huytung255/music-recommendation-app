import React from "react";
const GenreList = ({ genreList }) => {
  return (
    <div className="d-flex flex-wrap justify-content-center m-0">
      {genreList.map((genre) => (
        <div className="genre-wrap px-5 py-2 m-2">{genre}</div>
      ))}
    </div>
  );
};

export default GenreList;
