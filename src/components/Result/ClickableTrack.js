import React, { useState } from "react";
const Track = ({ song, artists, image, id, select, deselect }) => {
  const [selectedCSS, setSelectedCSS] = useState("");

  const [showSpotify, setShowSpotify] = useState(false);
  const [showYoutube, setShowYoutube] = useState(false);
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
  const handleShowPlayer = (player) => {
    if (player === "spotify") {
      setShowYoutube(false);
      setShowSpotify(!showSpotify);
    }
    if (player === "youtube") {
      setShowSpotify(false);
      setShowYoutube(!showYoutube);
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
          {/* <div className="track-player-buttons text-right">
            <input
              type="image"
              src={process.env.PUBLIC_URL + "Spotify_Icon_RGB_Green.png"}
              alt="spotify-player"
              className="track-player-icon mr-2"
              onClick={() => handleShowPlayer("spotify")}
            />
            <input
              type="image"
              src={process.env.PUBLIC_URL + "yt_icon_rgb.png"}
              alt="youtube-player"
              className="track-player-icon"
              onClick={() => handleShowPlayer("youtube")}
            />
          </div> */}
        </div>
        {/* <div className="d-flex justify-content-center">
          {showSpotify ? (
            <iframe
              title="Spotify Player"
              src={`https://open.spotify.com/embed/track/` + id + `?theme=0`}
              width="100%"
              height="80"
              frameBorder="0"
              allowtransparency="true"
              allow="encrypted-media"
              className=" mt-3"
            ></iframe>
          ) : (
            ""
          )}
          {showYoutube ? (
            <iframe
              width="auto"
              height="auto"
              src="https://www.youtube.com/embed/tknKZe_TyqU"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              className="mt-3"
            ></iframe>
          ) : (
            ""
          )}
        </div> */}
      </button>
    </div>
  );
};

export default Track;
