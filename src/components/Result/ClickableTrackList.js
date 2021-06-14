import React from "react";
import ClickableTrack from "./ClickableTrack";

const TrackList = ({ length, trackList, duration, select, deselect }) => {
  return (
    <div>
      <p className="text-center m-3">
        {length} tracks. {duration ? duration : ""}
      </p>
      <div className="row m-0">
        {trackList.map((track) => {
          const { song, artists, image, id } = track;
          return (
            <ClickableTrack
              key={id}
              song={song}
              artists={artists}
              image={image}
              id={id}
              select={select}
              deselect={deselect}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TrackList;
