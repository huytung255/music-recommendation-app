import React, { useEffect, useState } from "react";
import TrackList from "../Result/TrackList";
import ArtistList from "../Result/ArtistList";
import GenreList from "../Result/GenreList";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { authorize } from "../../utilfuncs/auth";
const UserAnalytics = ({ authProps }) => {
  const [showSection, setShowSection] = useState("genres");
  const [seeds, setSeeds] = useState({
    tracks: [],
    artist: [],
    genres: [],
  });
  const [trackList, setTrackList] = useState([]);
  const [artistList, setArtistList] = useState([]);
  const [genreList, setGenreList] = useState([]);
  useEffect(() => {
    //make axios call
    if (authProps.isLoggedIn) {
      axios
        .get("http://localhost:5000/users/getanalysis", {
          withCredentials: true,
        })
        .then((res) => {
          const { tracks, artists, genres } = res.data;
          setTrackList([...tracks]);
          setArtistList([...artists]);
          setGenreList([...genres]);
          console.log(res);
        })
        .catch((error) => console.log(error));
    }
  }, [authProps.isLoggedIn]);
  const handleLogin = () => {
    authorize(authProps.setIsLoggedIn);
  };
  return (
    <>
      {authProps.isLoggedIn ? (
        <>
          <h1 className="text-center mb-5 title mt-3">User Analytics</h1>
          <div className="d-flex justify-content-between">
            <Button
              variant="custom"
              className="seed-button"
              onClick={() => setShowSection("genres")}
            >
              Genres
            </Button>
            <Button
              variant="custom"
              className="seed-button"
              onClick={() => setShowSection("songs")}
            >
              Songs
            </Button>
            <Button
              variant="custom"
              className="seed-button"
              onClick={() => setShowSection("artists")}
            >
              Artists
            </Button>
          </div>
          {showSection === "genres" ? (
            <>
              <p className="analytics-label m-3 text-center">
                Your favorite genres
              </p>
              <GenreList genreList={genreList} />
            </>
          ) : (
            ""
          )}

          {showSection === "songs" ? (
            <>
              <p className="analytics-label m-3 text-center">
                Your favorite songs
              </p>
              <TrackList length={10} trackList={trackList} />
            </>
          ) : (
            ""
          )}
          {showSection === "artists" ? (
            <>
              <p className="analytics-label m-3 text-center">
                Your favorite artists
              </p>
              <ArtistList artistList={artistList} />
            </>
          ) : (
            ""
          )}
        </>
      ) : (
        <>
          <h1 className="text-center mb-5 title mt-3">User Analytics</h1>
          <p>Please log in with your spotify account</p>
          <Button
            variant="custom"
            className="seed-button"
            onClick={() => handleLogin()}
          >
            Log in
          </Button>
        </>
      )}
    </>
  );
};

export default UserAnalytics;
