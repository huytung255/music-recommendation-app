import React from "react";
import { useState } from "react";
const Artist = ({ id, name, image, select, deselect }) => {
  const [selectedCSS, setSelectedCSS] = useState("");
  const handleClick = (id, name) => {
    if (selectedCSS === "") {
      const temp = select("artists", { id: id, name: name });
      if (temp) {
        setSelectedCSS("artist-wrap-selected");
      }
    } else {
      deselect("artists", id);
      setSelectedCSS("");
    }
  };
  return (
    <div className="px-4 py-3 col-lg-3 col-md-3 col-sm-6">
      <button
        className={`artist-wrap text-center py-4 ` + selectedCSS}
        onClick={() => handleClick(id, name)}
      >
        <img
          src={image !== "" ? image : process.env.PUBLIC_URL + "music.png"}
          alt=""
          className="artist-img mb-2"
        />
        <div className="artist-name text-center">{name}</div>
      </button>
    </div>
  );
};

export default Artist;
