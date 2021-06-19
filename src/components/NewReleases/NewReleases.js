import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import { Spinner } from "react-bootstrap";
import TrackList from "../Result/TrackList";
import SaveButton from "../Result/SaveButton";
import axios from "axios";
import { useEffect } from "react";
const NewReleases = () => {
  const [length, setLength] = useState(10);
  const [duration, setDuration] = useState();
  const [showResult, setShowResult] = useState(false);
  const [trackList, setTrackList] = useState([]);
  const [loading, setLoading] = useState(false);
  const generate = () => {
    //make axios call
    setLoading(true);
    axios
      .get(process.env.REACT_APP_SERVER_URL + "tracks/newreleases/", {
        params: {
          n: length,
        },
      })
      .then((res) => {
        const { tracks, playlist_duration } = res.data;
        setTrackList([...tracks]);
        setDuration(playlist_duration);
        setLoading(false);
        setShowResult(true);
      })
      .catch((error) => console.log(error));
  };
  const handleLengthClick = (e) => {
    setLength(Number(e.currentTarget.textContent));
  };
  return (
    <>
      <h1 className="text-center mb-5 title mt-3">New Releases</h1>
      <Dropdown className="mt-2 d-flex">
        <p className="country-label mb-0 mr-2 d-flex align-items-end">
          Number of tracks:{" "}
        </p>
        <Dropdown.Toggle variant="custom" id="dropdown-basic" className="">
          {length}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item className="option-length" onClick={handleLengthClick}>
            5
          </Dropdown.Item>
          <Dropdown.Item className="option-length" onClick={handleLengthClick}>
            10
          </Dropdown.Item>
          <Dropdown.Item className="option-length" onClick={handleLengthClick}>
            20
          </Dropdown.Item>
          <Dropdown.Item className="option-length" onClick={handleLengthClick}>
            30
          </Dropdown.Item>
          <Dropdown.Item className="option-length" onClick={handleLengthClick}>
            40
          </Dropdown.Item>
          <Dropdown.Item className="option-length" onClick={handleLengthClick}>
            50
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <div className="d-flex justify-content-center mt-4">
        <Button
          variant="custom"
          className="custom-button px-4 py-3"
          onClick={generate}
        >
          Generate
        </Button>
      </div>
      {loading ? (
        <Spinner className="m-4" animation="border" variant="light" />
      ) : (
        ""
      )}
      {showResult ? (
        <div className="mt-3">
          <SaveButton trackList={trackList} />
          <TrackList
            length={length}
            duration={duration}
            trackList={trackList}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default NewReleases;
