import React, { useEffect, useState } from "react";
import FormControl from "react-bootstrap/FormControl";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { FaPlus } from "react-icons/fa";
import SearchResult from "./SearchResults";
const Search = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [keywords, setKeywords] = useState("");
  const [type, setType] = useState("Song");
  const [showResult, setShowResult] = useState(false);
  useEffect(() => {
    if (title === "" || artist === "") return;
    setKeywords(title + " - " + artist);
  }, [title, artist]);
  const handleTypeClick = (e) => {
    setType(e.currentTarget.textContent);
  };
  const showSearchResult = (e) => {
    setKeywords(e.target.value);
    setShowResult(true);
    if (e.target.value === "") setShowResult(false);
    ///make axios call
  };
  const hideSearchResult = () => {
    setShowResult(false);
  };
  return (
    <div className="container search-bar d-flex flex-column">
      <InputGroup>
        <FormControl
          isInvalid={false}
          placeholder="Type a song's name here."
          className="input-field"
          onChange={showSearchResult}
          //onBlur={hideSearchResult}
          value={keywords}
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
      <div className="result-wrap">
        {showResult ? (
          <SearchResult setTitle={setTitle} setArtist={setArtist} />
        ) : (
          ""
        )}
      </div>

      <div className="d-flex justify-content-center mt-3">
        <Button className="custom-button advance-button py-1 px-3">
          <FaPlus />
          Advanced
        </Button>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <Button className="custom-button generate-button px-4 py-3">
          Generate
        </Button>
      </div>
    </div>
  );
};

export default Search;
