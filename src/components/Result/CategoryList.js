import React from "react";
const CategoryList = ({ categoryList }) => {
  return (
    <div className="d-flex flex-wrap justify-content-center m-0">
      {categoryList.map((category) => (
        <div className="category-wrap px-5 py-2 m-2">{category}</div>
      ))}
    </div>
  );
};

export default CategoryList;
