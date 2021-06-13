import React, { useState } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { MdInfoOutline } from "react-icons/md";
const MyTooltip = ({ info }) => {
  const [show, setShow] = useState(false);
  return (
    <OverlayTrigger
      show={show}
      placement="right"
      delay={{ show: 100, hide: 100 }}
      overlay={<Tooltip id="info-tooltip">{info}</Tooltip>}
    >
      <MdInfoOutline
        className="ml-1 info-icon"
        onClick={() => setShow(!show)}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      />
    </OverlayTrigger>
  );
};

export default MyTooltip;
