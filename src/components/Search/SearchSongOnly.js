import React, { useState, useEffect } from "react";
import { MdCancel } from "react-icons/md";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import SearchResults from "../Search/SearchResults";
import axios from "axios";
const SearchSongOnly = ({ props }) => {
  const [id, setId, setShowAnalyticsResult] = [...props];
  const [showResult, setShowResult] = useState(false);
  const [isInputValid, setIsInputValid] = useState(true);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [keywords, setKeywords] = useState("");
  const [searchResult, setSearchResult] = useState();
  const showSearchResult = (e) => {
    setKeywords(e.target.value);
  };
  const hideSearchResult = () => {
    setShowResult(false);
  };
  const clearInput = () => {
    setId("");
    setIsInputDisabled(false);
    setKeywords("");
  };
  useEffect(() => {
    if (keywords === "" || id !== "") {
      setShowResult(false);
      return;
    }
    ///make axios call
    const timeOutId = setTimeout(() => {
      axios
        .get(process.env.REACT_APP_SERVER_URL + "tracks/search", {
          params: {
            name: keywords,
          },
        })
        .then((res) => {
          const { tracks } = res.data;
          setSearchResult(tracks);
          setShowResult(true);
        })
        .catch((error) => console.log(error));
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [keywords]);
  useEffect(() => {
    if (id === "") return;
    setShowResult(false);
    setIsInputValid(true);
    setIsInputDisabled(true);
  }, [id]);
  const analyse = () => {
    if (id === "") {
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
            setId={setId}
            setKeywords={setKeywords}
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
