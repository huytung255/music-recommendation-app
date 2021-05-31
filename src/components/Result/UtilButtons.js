import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

const UtilButtons = () => {
  const [showSaveInfo, setShowSaveInfo] = useState(false);
  const [publicity, setPublicity] = useState(false);
  const handleSaveClick = () => {
    setShowSaveInfo(!showSaveInfo);
  };
  // useEffect(() => {
  //   console.log(publicity);
  // }, [publicity]);
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
        <Form className="save-info-wrap mt-2 p-3">
          <Form.Group>
            <Form.Label className="text-left">Playlist name</Form.Label>
            <Form.Control
              custom={true}
              className="input-field playlist-name-input"
              type="text"
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
          <Button variant="custom" className="py-2 px-3">
            Save
          </Button>
        </Form>
      ) : (
        ""
      )}
    </div>
  );
};

export default UtilButtons;
