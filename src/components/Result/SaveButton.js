import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { authorize } from "../../utilfuncs/auth";
import MyVerticallyCenteredModal from "../Modal/MyVerticallyCenteredModal";
import axios from "axios";
const SaveButton = ({ trackList }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [publicity, setPublicity] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [isInputValid, setIsInputValid] = useState(true);
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
        "https://music-app-spotify.herokuapp.com/users/createplaylist",
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
        if (res.data === "please login") {
          authorize();
        }
        if (res.data.snapshot_id) {
          setShowModal(true);
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
      <MyVerticallyCenteredModal
        show={showModal}
        onHide={() => setShowModal(false)}
      />
      <Button
        variant="custom"
        className="seed-button  my-1"
        onClick={() => setShowInfo(!showInfo)}
      >
        Save on Spotify
      </Button>
      {showInfo ? (
        <Form className="white-div-wrap p-3 mt-2">
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
