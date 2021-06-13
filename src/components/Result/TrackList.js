import React from "react";
import Track from "./Track";

const TrackList = ({ length, trackList, duration }) => {
  return (
    <div>
      <p className="text-center m-3">
        {length} tracks. {duration ? duration : ""}
      </p>
      <div className="row m-0">
        {trackList.map((track) => {
          const { song, artists, image, id } = track;
          return (
            <Track
              key={id}
              song={song}
              artists={artists}
              image={image}
              id={id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TrackList;
