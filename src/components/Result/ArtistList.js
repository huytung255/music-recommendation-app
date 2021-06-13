import React from "react";
import Artist from "./Artist";
const ArtistList = ({ artistList }) => {
  return (
    <div className="row justify-content-center m-0">
      {artistList.map((artist) => (
        <Artist name={artist.name} image={artist.image} />
      ))}
    </div>
  );
};

export default ArtistList;
