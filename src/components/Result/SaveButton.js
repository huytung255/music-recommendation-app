import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { authorize } from "../../utilfuncs/auth";
import axios from "axios";
const SaveButton = ({ authProps, trackList }) => {
  const [showSaveInfo, setShowSaveInfo] = useState(false);
  const [publicity, setPublicity] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [isInputValid, setIsInputValid] = useState(true);
  const handleSaveClick = () => {
    if (authProps.isLoggedIn) setShowSaveInfo(!showSaveInfo);
    else {
      authorize(authProps.setIsLoggedIn);
    }
  };
  const confirmSaving = () => {
    if (playlistName === "") {
      setIsInputValid(false);
      return;
    }
    // make axios call

    let idList = [];
    for (let i in trackList) {
      idList.push(trackList[i].id);
    }
    axios
      .post(
        "http://localhost:5000/users/createplaylist",
        {
          playlist_name: playlistName,
          public: publicity,
          songids: idList,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res) {
          alert("Success");
        }
      })
      .catch((error) => console.log(error));
  };
  const handleChange = (e) => {
    setPlaylistName(e.target.value);
    setIsInputValid(true);
  };

  return (
    <div className="text-center">
      <Button
        variant="custom"
        className="seed-button"
        onClick={() => handleSaveClick()}
      >
        Save on Spotify
      </Button>
      {showSaveInfo ? (
        <Form className="white-div-wrap mt-2 p-3">
          <Form.Group>
            <Form.Label className="text-left">Playlist name</Form.Label>
            <Form.Control
              custom={true}
              className="input-field playlist-name-input"
              type="text"
              isInvalid={!isInputValid}
              value={playlistName}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group className="d-flex justify-content-center">
            <label htmlFor="visibility" className="m-0 mr-1">
              Public
            </label>
            <label className="checkbox-container m-0">
              <input
                type="radio"
                name="visibility"
                onClick={() => setPublicity(true)}
              />
              <span className="checkmark"></span>
            </label>
            <label htmlFor="visibility" className="m-0 mr-1">
              Private
            </label>
            <label className="checkbox-container m-0">
              <input
                type="radio"
                name="visibility"
                defaultChecked
                onClick={() => setPublicity(false)}
              />
              <span className="checkmark"></span>
            </label>
          </Form.Group>
          <Button
            variant="custom"
            className="py-2 px-3"
            onClick={() => confirmSaving()}
          >
            Save
          </Button>
        </Form>
      ) : (
        ""
      )}
    </div>
  );
};

export default SaveButton;
