import React, { useState } from "react";
import ClickableTrackList from "../Result/ClickableTrackList";
import ArtistList from "../Result/ArtistList";
import GenreList from "../Result/GenreList";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import { authorize } from "../../utilfuncs/auth";
import { useHistory } from "react-router";
const UserAnalytics = () => {
  const history = useHistory();
  const [length, setLength] = useState(10);
  const [showSection, setShowSection] = useState("genres");
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [seeds, setSeeds] = useState({
    tracks: [],
    artists: [],
    genres: [],
  });
  const [nSeeds, setNSeeds] = useState(0);
  const [trackList, setTrackList] = useState([]);
  const [artistList, setArtistList] = useState([]);
  const [genreList, setGenreList] = useState([]);

  const handleGetAnalytics = () => {
    axios
      .get(process.env.REACT_APP_SERVER_URL + "users/getanalysis", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data === "please login") {
          authorize();
        } else {
          const { tracks, artists, genres } = res.data;
          setTrackList([...tracks]);
          setArtistList([...artists]);
          setGenreList([...genres]);
          setShowAnalytics(true);
          console.log(res);
        }
      })
      .catch((error) => console.log(error));
  };
  const select = (type, item) => {
    if (nSeeds === 5) return false;
    setNSeeds(nSeeds + 1);
    setSeeds({ ...seeds, [type]: [...seeds[type], item] });
    return true;
  };
  const deselect = (type, item) => {
    let newSeeds;
    if (type === "genres") {
      newSeeds = seeds[type].filter((genre) => genre !== item);
    } else {
      newSeeds = seeds[type].filter((genre) => genre.id !== item);
    }
    setNSeeds(nSeeds - 1);
    setSeeds({ ...seeds, [type]: [...newSeeds] });
  };
  const generate = () => {
    if (nSeeds === 0) return;
    const temp = {
      n: length,
      tracks: [...seeds.tracks.map((item) => item.id)],
      artists: [...seeds.artists.map((item) => item.id)],
      genres: [...seeds.genres.map((item) => item)],
    };
    history.push({
      pathname: "/result",
      state: {
        method: 2,
        ...temp,
      },
    });
  };
  const handleLengthClick = (e) => {
    setLength(e.currentTarget.textContent);
  };
  return (
    <>
      {showAnalytics ? (
        <>
          <h1 className="text-center mb-3 title mt-3">User Analytics</h1>
          <p className="mb-4 text-center">
            You can pick 5 items and generate a playlist based on your
            interests.
          </p>
          <div className="row justify-content-center">
            <Button
              variant="custom"
              className="seed-button col-lg-4 col-md-4 col-sm-12 my-1"
              onClick={() => setShowSection("genres")}
            >
              Genres
            </Button>
            <Button
              variant="custom"
              className="seed-button col-lg-4 col-md-4 col-sm-12 my-1"
              onClick={() => setShowSection("songs")}
            >
              Songs
            </Button>
            <Button
              variant="custom"
              className="seed-button col-lg-4 col-md-4 col-sm-12 my-1"
              onClick={() => setShowSection("artists")}
            >
              Artists
            </Button>
          </div>
          <div className={showSection === "genres" ? "" : "d-none"}>
            <GenreList
              genreList={genreList}
              select={select}
              deselect={deselect}
            />
          </div>
          <div className={showSection === "songs" ? "" : "d-none"}>
            <ClickableTrackList
              length={10}
              trackList={trackList}
              select={select}
              deselect={deselect}
            />
          </div>
          <div className={showSection === "artists" ? "" : "d-none"}>
            <ArtistList
              artistList={artistList}
              select={select}
              deselect={deselect}
            />
          </div>
          <Dropdown className="d-flex align-items-baseline my-3">
            <p className="option-label mb-0 mr-2">
              Number of tracks to generate:{" "}
            </p>
            <Dropdown.Toggle
              variant="custom"
              id="dropdown-basic"
              className="option-length"
            >
              {length}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                className="option-length"
                onClick={handleLengthClick}
              >
                5
              </Dropdown.Item>
              <Dropdown.Item
                className="option-length"
                onClick={handleLengthClick}
              >
                10
              </Dropdown.Item>
              <Dropdown.Item
                className="option-length"
                onClick={handleLengthClick}
              >
                25
              </Dropdown.Item>
              <Dropdown.Item
                className="option-length"
                onClick={handleLengthClick}
              >
                50
              </Dropdown.Item>
              <Dropdown.Item
                className="option-length"
                onClick={handleLengthClick}
              >
                75
              </Dropdown.Item>
              <Dropdown.Item
                className="option-length"
                onClick={handleLengthClick}
              >
                100
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div className="d-flex justify-content-center">
            <Button
              variant="custom"
              className="custom-button px-4 py-3"
              onClick={generate}
            >
              Generate
            </Button>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-center mb-5 title mt-3">User Analytics</h1>
          <Button
            variant="custom"
            className="seed-button"
            onClick={() => handleGetAnalytics()}
          >
            Get analytics
          </Button>
        </>
      )}
    </>
  );
};

export default UserAnalytics;
