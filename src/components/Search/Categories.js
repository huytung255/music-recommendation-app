import React from "react";
import { ListGroup } from "react-bootstrap";
import categories from "./dummycategory";
const Categories = () => {
  return (
    <>
      {categories.map((category, i) => {
        return (
          <ListGroup.Item variant="custom" key={i} as="option" value={category}>
            {category}
          </ListGroup.Item>
        );
      })}
    </>
  );
};

export default Categories;
