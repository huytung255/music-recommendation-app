import React from "react";
import Track from "./Track";
const SongList = ({ length }) => {
  return (
    <div>
      <p className="text-center m-3">{length} tracks. 1h 24m</p>
      <div className="row m-0">
        <Track />
        <Track />
        <Track />
        <Track />
        <Track />
      </div>
    </div>
  );
};

export default SongList;
