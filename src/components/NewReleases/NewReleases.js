import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import countryList from "./CountryList";
import TrackList from "../Result/TrackList";
import SaveButton from "../Result/SaveButton";
import axios from "axios";
const NewReleases = ({ authProps }) => {
  const [country, setCountry] = useState("Việt Nam");
  const [showResult, setShowResult] = useState(false);
  const [trackList, setTrackList] = useState([]);
  const generate = () => {
    //make axios call
    axios
      .get("http://localhost:5000/tracks/newreleases/", {
        params: {
          market: countryList[country],
          n: 10,
        },
      })
      .then((res) => {
        const { tracks } = res.data;
        console.log(tracks);
        setTrackList([...tracks]);
        setShowResult(true);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <h1 className="text-center mb-5 title mt-3">New Releases</h1>
      <Dropdown className="mt-2 d-flex">
        <p className="country-label mb-0 mr-2 d-flex align-items-end">
          Pick a country:{" "}
        </p>
        <Dropdown.Toggle variant="custom" id="dropdown-basic" className="">
          {country}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {Object.keys(countryList).map((item) => (
            <Dropdown.Item key={item} onClick={() => setCountry(item)}>
              {item}
            </Dropdown.Item>
          ))}
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
      {showResult ? (
        <div className="mt-3">
          <SaveButton authProps={authProps} trackList={trackList} />
          <TrackList length={10} trackList={trackList} />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default NewReleases;
