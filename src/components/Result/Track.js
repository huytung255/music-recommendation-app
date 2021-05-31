import React, { useState } from "react";
const Track = () => {
  const [showSpotify, setShowSpotify] = useState(false);
  const [showYoutube, setShowYoutube] = useState(false);
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
      <div className="track-wrap p-3">
        <div className="d-flex position-relative  ">
          <img
            src="https://i.scdn.co/image/ab67616d00001e02d8856d19e1f5784ed643d862"
            alt=""
            className="track-img mr-2"
          />
          <div className="d-flex justify-content-center flex-column track-info-wrap">
            <p className="track-info-title mb-0">When This Rain Stops</p>
            <p className="track-info-artist">WENDY</p>
          </div>
          <div className="track-player-buttons text-right">
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
          </div>
        </div>
        <div className="d-flex justify-content-center">
          {showSpotify ? (
            <iframe
              title="Spotify Player"
              src="https://open.spotify.com/embed/track/6mavVLsxaa4YcPje9qZKcf?theme=0"
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
        </div>
      </div>
    </div>
  );
};

export default Track;
<div className=" track-wrap p-3 col-lg-6 col-md-6 col-sm-12">
  <div className="d-flex position-relative  ">
    <img
      src="https://i.scdn.co/image/ab67616d00001e02d8856d19e1f5784ed643d862"
      alt=""
      className="track-img mr-2"
    />
    <div className="d-flex justify-content-center flex-column track-info-wrap">
      <p className="track-info-title mb-0">When This Rain Stops</p>
      <p className="track-info-artist">WENDY</p>
    </div>
    <div className="track-player-buttons text-right">
      <img
        src={process.env.PUBLIC_URL + "Spotify_Icon_RGB_Green.png"}
        alt="spotify-player"
        className="track-player-icon mr-2"
      />
      <img
        src={process.env.PUBLIC_URL + "yt_icon_rgb.png"}
        alt="youtube-player"
        className="track-player-icon"
      />
    </div>
  </div>
  <div className="d-flex justify-content-center">
    <iframe
      width="auto"
      height="auto"
      src="https://www.youtube.com/embed/tknKZe_TyqU"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      className="mt-2"
    ></iframe>
    {/* <iframe
              src="https://open.spotify.com/embed/track/6mavVLsxaa4YcPje9qZKcf?theme=0"
              width="100%"
              height="80"
              frameBorder="0"
              allowtransparency="true"
              allow="encrypted-media"
              className=" mt-2"
            ></iframe> */}
  </div>
</div>;
