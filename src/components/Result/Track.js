import axios from "axios";
import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
const Track = ({ song, artists, image, id }) => {
  const [showSpotify, setShowSpotify] = useState(false);
  const [showYoutube, setShowYoutube] = useState(false);
  const [youtubeId, setYoutubeId] = useState("");
  const handleShowPlayer = (player) => {
    if (player === "spotify") {
      setShowYoutube(false);
      setShowSpotify(!showSpotify);
    }
    if (player === "youtube") {
      if (youtubeId === "") {
        axios
          .get(process.env.REACT_APP_SERVER_URL + "tracks/searchYoutube", {
            params: {
              name: song + " " + artists,
            },
          })
          .then((res) => {
            const { videoId } = res.data;
            setYoutubeId(videoId);
          })
          .catch((error) => console.log(error));
      }
      setShowSpotify(false);
      setShowYoutube(!showYoutube);
    }
  };
  return (
    <div className="p-1 col-lg-6 col-md-6 col-sm-12">
      <div className="track-wrap p-3">
        <div className="d-flex position-relative  ">
          <img src={image} alt="" className="track-img mr-2" />
          <div className="d-flex justify-content-center flex-column track-info-wrap">
            <p className="track-info-title mb-0">{song}</p>
            <p className="track-info-artist">{artists}</p>
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
            youtubeId !== "" ? (
              <iframe
                width="auto"
                height="auto"
                src={"https://www.youtube.com/embed/" + youtubeId}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="mt-3"
              ></iframe>
            ) : (
              <Spinner className="m-4" animation="border" variant="light" />
            )
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Track;
