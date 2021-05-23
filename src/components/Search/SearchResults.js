import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import result from "./dummyresult";
const SearchResults = ({ setTitle, setArtist }) => {
  const handleclick = (title, artist) => {
    setTitle(title);
    setArtist(artist);
  };
  return (
    <ListGroup variant="flush" className="result-list mt-1">
      {result.map((item) => {
        return (
          <ListGroup.Item
            action
            onClick={() => handleclick(item.title, item.artist)}
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
