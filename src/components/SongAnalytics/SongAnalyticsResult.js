import React, { useEffect, useState } from "react";
import Seed from "../Result/Seed";
import axios from "axios";
import anlyticsTooltips from "./AnalyticsTooltips";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import MyTooltip from "../MyTooltip/MyTooltip";
const SongAnalyticsResult = ({ id }) => {
  const [analytics, setAnalytics] = useState();
  const [song, setSong] = useState();
  const [artist, setArtist] = useState();
  const [image, setImage] = useState();
  useEffect(() => {
    //make axios call
    axios
      .get("https://music-app-spotify.herokuapp.com/tracks/getanalysis/" + id)
      .then((res) => {
        const { track, features } = res.data;
        setSong(track.song);
        setImage(track.image);
        setArtist(track.artists);
        setAnalytics({ ...features });
      })
      .catch((error) => console.log(error));
  }, [id]);
  return (
    <div className="px-5 pt-2 pb-4">
      <p className="m-0 text-center">Result:</p>

      {image ? (
        <Seed title={song} subtitle={artist} image={image} />
      ) : (
        <Spinner className="m-4" animation="border" variant="light" />
      )}
      {analytics ? (
        <div className="white-div-wrap p-3">
          <div className="row">
            {Object.keys(analytics).map((item, i) => {
              return (
                <Form.Group
                  key={i}
                  controlId={i}
                  className="col-lg-6 col-md-6 col-sm-12 row justify-content-center align-items-center one-advanced-option m-0"
                >
                  <div className="col-12 d-flex justify-content-between align-items-center mb-1">
                    <Form.Label className="text-capitalize text-left p-0 option-label mb-0 d-flex align-items-center">
                      {item}
                      <MyTooltip info={anlyticsTooltips[item]} />
                    </Form.Label>
                    <Form.Label className="option-label mb-0 text-right">
                      {Math.round(analytics[item])}
                    </Form.Label>
                  </div>
                  <div className="col-12 d-flex justify-content-center align-items-center">
                    <Form.Control
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={Math.round(analytics[item])}
                      disabled={true}
                    />
                  </div>
                </Form.Group>
              );
            })}
          </div>
        </div>
      ) : (
        <Spinner className="m-4" animation="border" variant="light" />
      )}
    </div>
  );
};

export default SongAnalyticsResult;
