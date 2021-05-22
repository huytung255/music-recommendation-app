import React, { useState } from "react";
import FormControl from "react-bootstrap/FormControl";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import InputGroup from "react-bootstrap/InputGroup";
import { FaPlus } from "react-icons/fa";
const Search = () => {
  const [type, setType] = useState("Song");
  const handleTypeClick = (e) => {
    setType(e.currentTarget.textContent);
  };
  return (
    <div className="container search-bar d-flex flex-column">
      <InputGroup>
        <FormControl
          placeholder="Type a song's name here."
          className="input-field"
        />

        <DropdownButton
          as={InputGroup.Append}
          variant="primary"
          title={type}
          id="input-group-dropdown"
          className="drop-down"
        >
          <Dropdown.Item onClick={handleTypeClick}>Song</Dropdown.Item>
          <Dropdown.Item onClick={handleTypeClick}>Artist</Dropdown.Item>
          <Dropdown.Item onClick={handleTypeClick}>Category</Dropdown.Item>
        </DropdownButton>
      </InputGroup>
      <div className="d-flex justify-content-center mt-3">
        <button className="custom-button advance-button py-1 px-3">
          <FaPlus />
          Advanced
        </button>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <button className="custom-button generate-button px-4 py-3">
          Generate
        </button>
      </div>
    </div>
  );
};

export default Search;
