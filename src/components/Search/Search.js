import React, { useEffect, useState } from "react";
import FormControl from "react-bootstrap/FormControl";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { MdCancel, MdArrowDropDown } from "react-icons/md";
import SearchResults from "./SearchResults";
import AdvancedOptions from "../AdvancedOptions.js/AdvancedOptions";
import { useHistory, Redirect } from "react-router";
import dummyresult from "./dummyresult";
import dummycategories from "./dummycategories";
const Search = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [category, setCategory] = useState("");
  const [keywords, setKeywords] = useState("");
  const [type, setType] = useState("Song");
  const [searchResult, setSearchResult] = useState();
  const [categories, setCategories] = useState();

  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [isInputValid, setIsInputValid] = useState(true);

  const [showResult, setShowResult] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [length, setLength] = useState(10);
  const [advancedOptions, setAdvancedOptions] = useState({
    acousticness: { isChecked: false, value: 50 },
    danceability: { isChecked: false, value: 50 },
    instrumentalness: { isChecked: false, value: 50 },
    energy: { isChecked: false, value: 50 },
    valence: { isChecked: false, value: 50 },
    speechiness: { isChecked: false, value: 50 },
  });
  // useEffect(() => {
  //   console.log(advancedOptions);
  // }, [advancedOptions]);
  useEffect(() => {
    //make axiso call
    setCategories(dummycategories);
  }, []);
  useEffect(() => {
    if (title === "" && artist === "") return;
    setIsInputValid(true);
    setIsInputDisabled(true);
    setShowResult(false);
    if (title !== "") setKeywords(title + " - " + artist);
    else setKeywords(artist);
  }, [title, artist]);
  useEffect(() => {
    setIsInputValid(true);
    setKeywords(category);
  }, [category]);
  useEffect(() => {
    //Reset everything when search type is changed
    setKeywords("");
    setArtist("");
    setTitle("");
    setCategory("");
    setIsInputDisabled(false);
  }, [type]);
  const handleTypeClick = (e) => {
    setType(e.currentTarget.textContent);
  };
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
  const generate = () => {
    if (type === "Song" && (title === "" || artist === "")) {
      setIsInputValid(false);
      return;
    }
    if (type === "Artist" && artist === "") {
      setIsInputValid(false);
      return;
    }
    if (type === "Category" && category === "") {
      setIsInputValid(false);
      return;
    }
    //make axios call
    history.push({
      pathname: "/result",
      state: {
        title: title,
        artist: artist,
        category: category,
        length: length,
        acousticness: advancedOptions.acousticness.isChecked
          ? advancedOptions.acousticness.value
          : null,
        danceability: advancedOptions.danceability.isChecked
          ? advancedOptions.danceability.value
          : null,
        instrumentalness: advancedOptions.instrumentalness.isChecked
          ? advancedOptions.instrumentalness.value
          : null,
        energy: advancedOptions.energy.isChecked
          ? advancedOptions.energy.value
          : null,
        valence: advancedOptions.valence.isChecked
          ? advancedOptions.valence.value
          : null,
        speechiness: advancedOptions.speechiness.isChecked
          ? advancedOptions.speechiness.value
          : null,
      },
    });
  };
  return (
    <div className="search-wrap d-flex flex-column">
      <InputGroup>
        <div className="button-in">
          {type === "Category" ? (
            <>
              <FormControl
                as="button"
                custom={true}
                isInvalid={!isInputValid}
                onClick={showSearchResult}
                onBlur={hideSearchResult}
                className="input-field"
                value={keywords === "" ? "Pick a category." : keywords}
              >
                {keywords === "" ? "Pick a category." : keywords}
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
          <Dropdown.Item onClick={handleTypeClick}>Category</Dropdown.Item>
        </DropdownButton>
      </InputGroup>
      <div className="result-wrap">
        {showResult ? (
          <SearchResults
            setTitle={setTitle}
            setArtist={setArtist}
            setCategory={setCategory}
            type={type}
            searchResult={searchResult}
            categories={categories}
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
