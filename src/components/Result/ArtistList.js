import React from "react";
import Artist from "./Artist";
const ArtistList = ({ artistList, select, deselect }) => {
  return (
    <div className="row justify-content-center mt-3">
      {artistList.map((artist, i) => (
        <Artist
          key={i}
          id={artist.id}
          name={artist.name}
          image={artist.image}
          select={select}
          deselect={deselect}
        />
      ))}
    </div>
  );
};

export default ArtistList;
