import React from "react";
const Artist = ({ name, image }) => {
  return (
    <div className="px-4 py-3 col-lg-4 col-md-4 col-sm-6">
      <div className="artist-wrap text-center px-3 py-4">
        <img src={image} alt="artist" className="artist-img mb-2" />
        <div className="artist-name">{name}</div>
      </div>
    </div>
  );
};

export default Artist;
