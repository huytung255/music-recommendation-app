import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
const MyVerticallyCenteredModal = (props) => {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="my-modal"
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <p>Successfully saved the playlist to your library.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MyVerticallyCenteredModal;
