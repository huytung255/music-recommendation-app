import React, { useState } from "react";
const Track = ({ song, artists, image, id, select, deselect }) => {
  const [selectedCSS, setSelectedCSS] = useState("");
  const handleClick = (song, artists, id) => {
    if (selectedCSS === "") {
      const temp = select("tracks", { id: id, name: song, artists: artists });
      if (temp) {
        setSelectedCSS("clickable-track-wrap-selected");
      }
    } else {
      deselect("tracks", id);
      setSelectedCSS("");
    }
  };
  return (
    <div className="p-1 col-lg-6 col-md-6 col-sm-12">
      <button
        className={`clickable-track-wrap p-3 ` + selectedCSS}
        onClick={() => handleClick(song, artists, id)}
      >
        <div className="d-flex position-relative  ">
          <img src={image} alt="" className="track-img mr-2" />
          <div className="d-flex justify-content-center flex-column track-info-wrap">
            <p className="track-info-title mb-0">{song}</p>
            <p className="track-info-artist">{artists}</p>
          </div>
        </div>
      </button>
    </div>
  );
};

export default Track;
