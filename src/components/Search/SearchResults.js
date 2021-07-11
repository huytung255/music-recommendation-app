import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

const SearchResults = ({
  setKeywords,
  setGenre,
  setId,
  type,
  searchResult,
  genres,
}) => {
  const handleSongClick = (id, song, artist) => {
    setId(id);
    setKeywords(song + " - " + artist);
  };
  const handleArtistClick = (id, name) => {
    setId(id);
    setKeywords(name);
  };
  const handleGenreClick = (genre) => {
    setGenre(genre);
  };
  const renderSwitch = (type) => {
    switch (type) {
      case "Genre":
        return genres.map((item, i) => {
          return (
            <ListGroup.Item
              key={i}
              variant="custom"
              onMouseDown={() => handleGenreClick(item)}
              action
            >
              {item}
            </ListGroup.Item>
          );
        });
      case "Song":
        return searchResult.map((item) => {
          return (
            <ListGroup.Item
              key={item.id}
              variant="custom"
              action
              onMouseDown={() =>
                handleSongClick(item.id, item.song, item.artists)
              }
            >
              <img
                src={
                  item.image !== ""
                    ? item.image
                    : process.env.PUBLIC_URL + "music.png"
                }
                alt=""
                className="result-image mr-2"
              />
              {item.song} - {item.artists}
            </ListGroup.Item>
          );
        });

      case "Artist":
        return searchResult.map((item) => {
          return (
            <ListGroup.Item
              key={item.id}
              variant="custom"
              action
              onMouseDown={() => handleArtistClick(item.id, item.name)}
            >
              <img src={item.image} alt="" className="result-image mr-2" />
              {item.name}
            </ListGroup.Item>
          );
        });
      default:
        break;
    }
  };

  return (
    <ListGroup variant="flush" className="result-list mt-1">
      {renderSwitch(type)}
    </ListGroup>
  );
};

export default SearchResults;
