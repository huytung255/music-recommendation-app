import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

const SearchResults = ({
  setTitle,
  setArtist,
  setCategory,
  type,
  searchResult,
  categories,
}) => {
  const handleClick = (title, artist) => {
    if (type === "Song") {
      setTitle(title);
      setArtist(artist);
    }
    if (type === "Artist") {
      setArtist(artist);
    }
  };
  const handleCategoryClick = (category) => {
    setCategory(category);
  };

  return (
    <ListGroup variant="flush" className="result-list mt-1">
      {type === "Category"
        ? categories.map((item) => {
            return (
              <ListGroup.Item
                variant="custom"
                onMouseDown={() => handleCategoryClick(item)}
                action
              >
                {item}
              </ListGroup.Item>
            );
          })
        : searchResult.map((item) => {
            return (
              <ListGroup.Item
                variant="custom"
                action
                onMouseDown={() => handleClick(item.title, item.artist)}
              >
                <img
                  src={process.env.PUBLIC_URL + item.image}
                  alt=""
                  className="result-image mr-2"
                />
                {item.title} {item.artist}
              </ListGroup.Item>
            );
          })}
    </ListGroup>
  );
};

export default SearchResults;
