import React, { useEffect, useState } from "react";
import FormControl from "react-bootstrap/FormControl";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { MdCancel, MdArrowDropDown } from "react-icons/md";
import SearchResults from "./SearchResults";
import AdvancedOptions from "../AdvancedOptions.js/AdvancedOptions";
import { useHistory } from "react-router";
import axios from "axios";
const Search = () => {
  const history = useHistory();

  const [id, setId] = useState("");
  const [genre, setGenre] = useState("");

  const [keywords, setKeywords] = useState("");
  const [type, setType] = useState("Song");
  const [searchResult, setSearchResult] = useState();
  const [genres, setGenres] = useState();

  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [isInputValid, setIsInputValid] = useState(true);

  const [showResult, setShowResult] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [length, setLength] = useState(10);
  const [advancedOptions, setAdvancedOptions] = useState({
    acousticness: { isChecked: false, max: 100, min: 0 },
    danceability: { isChecked: false, max: 100, min: 0 },
    instrumentalness: { isChecked: false, max: 100, min: 0 },
    energy: { isChecked: false, max: 100, min: 0 },
    valence: { isChecked: false, max: 100, min: 0 },
    speechiness: { isChecked: false, max: 100, min: 0 },
  });

  useEffect(() => {
    //make axios call
    axios
      .get("http://localhost:5000/genres/getseeds")
      .then((res) => {
        const temp = res.data.genres;
        setGenres(temp);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    if (keywords === "" || id !== "") {
      setShowResult(false);
      return;
    }
    ///make axios call
    const timeOutId = setTimeout(() => {
      if (type === "Song") {
        axios
          .get("http://localhost:5000/tracks/search", {
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
      }
      if (type === "Artist") {
        axios
          .get("http://localhost:5000/artists/search", {
            params: {
              name: keywords,
            },
          })
          .then((res) => {
            const { artists } = res.data;
            setSearchResult(artists);
            setShowResult(true);
          })
          .catch((error) => console.log(error));
      }
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [keywords]);
  useEffect(() => {
    if (id === "") return;
    setShowResult(false);
    setIsInputValid(true);
    setIsInputDisabled(true);
  }, [id]);
  // useEffect(() => {
  //   console.log(showResult);
  // }, [showResult]);
  useEffect(() => {
    setIsInputValid(true);
  }, [genre]);
  useEffect(() => {
    //Reset everything when search type is changed
    setId("");
    setKeywords("");
    setGenre("");
    setIsInputDisabled(false);
  }, [type]);
  const handleTypeClick = (e) => {
    setType(e.currentTarget.textContent);
  };
  const showSearchResult = (e) => {
    setKeywords(e.target.value);
  };

  const hideSearchResult = () => {
    setShowResult(false);
  };
  const clearInput = () => {
    setIsInputDisabled(false);
    setId("");
    setKeywords("");
  };
  const generate = () => {
    if ((type === "Song" || type === "Artist") && id === "") {
      setIsInputValid(false);
      return;
    }
    if (type === "Genre" && genre === "") {
      setIsInputValid(false);
      return;
    }
    const finalOptions = {};
    for (let i in advancedOptions) {
      finalOptions["max_" + i] = advancedOptions[i].isChecked
        ? advancedOptions[i].max
        : null;
      finalOptions["min_" + i] = advancedOptions[i].isChecked
        ? advancedOptions[i].min
        : null;
    }
    history.push({
      pathname: "/result",
      state: {
        method: 1,
        id: id,
        genre: genre,
        type: type,
        n: length,
        ...finalOptions,
      },
    });
  };
  return (
    <div className="search-wrap d-flex flex-column">
      <InputGroup>
        <div className="button-in">
          {type === "Genre" ? (
            <>
              <FormControl
                as="button"
                custom={true}
                isInvalid={!isInputValid}
                onClick={() => setShowResult(!showResult)}
                onBlur={hideSearchResult}
                className="input-field"
                // value={keywords === "" ? "Pick a genre." : keywords}
              >
                {genre === "" ? "Pick a genre." : genre}
                <MdArrowDropDown />
              </FormControl>
            </>
          ) : (
            <>
              <FormControl
                disabled={isInputDisabled}
                custom={true}
                isInvalid={!isInputValid}
                placeholder="Type a song's name here."
                className={
                  `input-field ` + (isInputDisabled ? "input-field-filled" : "")
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
            </>
          )}
        </div>

        <DropdownButton
          as={InputGroup.Append}
          variant="primary"
          title={type}
          id="input-group-dropdown"
          className="drop-down"
        >
          <Dropdown.Item onClick={handleTypeClick}>Song</Dropdown.Item>
          <Dropdown.Item onClick={handleTypeClick}>Artist</Dropdown.Item>
          <Dropdown.Item onClick={handleTypeClick}>Genre</Dropdown.Item>
        </DropdownButton>
      </InputGroup>
      <div className="result-wrap">
        {showResult ? (
          <SearchResults
            setKeywords={setKeywords}
            setGenre={setGenre}
            setId={setId}
            type={type}
            searchResult={searchResult}
            genres={genres}
          />
        ) : (
          ""
        )}
      </div>
      <div className="d-flex justify-content-center mt-3 ">
        <Button
          variant="custom"
          className="advance-button py-1 px-3 "
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          Advanced
        </Button>
      </div>
      {showAdvanced ? (
        <AdvancedOptions
          advancedOptions={advancedOptions}
          setAdvancedOptions={setAdvancedOptions}
          length={length}
          setLength={setLength}
        />
      ) : (
        ""
      )}
      <div className="d-flex justify-content-center mt-3">
        <Button
          variant="custom"
          className="custom-button px-4 py-3"
          onClick={generate}
        >
          Generate
        </Button>
      </div>
    </div>
  );
};

export default Search;
