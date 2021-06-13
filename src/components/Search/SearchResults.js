import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

const SearchResults = ({
  setKeywords,
  setCategory,
  setId,
  type,
  searchResult,
  categories,
}) => {
  const handleSongClick = (id, song, artist) => {
    setId(id);
    setKeywords(song + " - " + artist);
  };
  const handleArtistClick = (id, name) => {
    setId(id);
    setKeywords(name);
  };
  const handleCategoryClick = (category) => {
    setCategory(category);
  };
  const renderSwitch = (type) => {
    switch (type) {
      case "Category":
        return categories.map((item, i) => {
          return (
            <ListGroup.Item
              key={i}
              variant="custom"
              onMouseDown={() => handleCategoryClick(item)}
              action
            >
              {item}
            </ListGroup.Item>
          );
        });
        break;
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
              <img src={item.image} alt="" className="result-image mr-2" />
              {item.song} - {item.artists}
            </ListGroup.Item>
          );
        });
        break;
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
