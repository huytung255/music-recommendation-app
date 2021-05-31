import React, { useState, useEffect } from "react";
import { MdCancel } from "react-icons/md";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import SearchResults from "../Search/SearchResults";
import dummyresult from "./dummyresult";
const SearchSongOnly = ({ props }) => {
  const [title, setTitle, artist, setArtist, setShowAnalyticsResult] = [
    ...props,
  ];
  const [showResult, setShowResult] = useState(false);
  const [isInputValid, setIsInputValid] = useState(true);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [keywords, setKeywords] = useState("");
  const [searchResult, setSearchResult] = useState();
  const showSearchResult = (e) => {
    setKeywords(e.target.value);
    setShowResult(true);
    if (e.target.value === "") setShowResult(false);
    ///make axios call
    setSearchResult(dummyresult);
  };
  const hideSearchResult = () => {
    setShowResult(false);
  };
  const clearInput = () => {
    setTitle("");
    setArtist("");
    setIsInputDisabled(false);
    setKeywords("");
  };
  useEffect(() => {
    if (title === "" && artist === "") return;
    setIsInputValid(true);
    setIsInputDisabled(true);
    setShowResult(false);
    if (title !== "") setKeywords(title + " - " + artist);
    else setKeywords(artist);
  }, [title, artist]);
  const analyse = () => {
    if (title === "" || artist === "") {
      setIsInputValid(false);
      return;
    }
    setShowAnalyticsResult(true);
  };
  return (
    <div className="search-wrap">
      <div className="position-relative">
        <FormControl
          disabled={isInputDisabled}
          custom={true}
          isInvalid={!isInputValid}
          placeholder="Type a song's name here."
          className={
            `input-field input-field-2 ` +
            (isInputDisabled ? "input-field-filled" : "")
          }
          onChange={showSearchResult}
          onBlur={hideSearchResult}
          value={keywords}
        />
        {isInputDisabled ? (
          <a
            href="#"
            className="erase-button d-flex justify-content-center"
            onClick={() => clearInput()}
          >
            <MdCancel />
          </a>
        ) : (
          ""
        )}
      </div>

      <div className="result-wrap">
        {showResult ? (
          <SearchResults
            setTitle={setTitle}
            setArtist={setArtist}
            type="Song"
            searchResult={searchResult}
          />
        ) : (
          ""
        )}
      </div>
      <div className="d-flex justify-content-center mt-3">
        <Button
          variant="custom"
          className="custom-button generate-button px-4 py-3"
          onClick={analyse}
        >
          Analyse
        </Button>
      </div>
    </div>
  );
};

export default SearchSongOnly;
