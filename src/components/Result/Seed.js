import React from "react";
const Seed = ({ title, subtitle, image }) => {
  return (
    <div className="text-center seed-wrap p-3">
      <img src={image} alt="" className="seed-img mb-2" />
      <div className="mt-auto">
        <h1 className="seed-title mb-2">{title}</h1>
        <h6 className="seed-subtitle mb-0">{subtitle}</h6>
      </div>
    </div>
  );
};

export default Seed;
