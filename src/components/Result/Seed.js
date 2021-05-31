import React from "react";
const Seed = ({ title, subtitle }) => {
  return (
    <div className="text-center seed-wrap p-3">
      <p>A playlist is generated on</p>
      <img
        src="https://i.scdn.co/image/ab67616d00001e02f8553e18a11209d4becd0336"
        alt=""
        className="seed-img mb-2"
      />
      <div className="mt-auto">
        <h1 className="seed-title mb-2">{title}</h1>
        <h6 className="seed-artist mb-0">{subtitle}</h6>
      </div>
    </div>
  );
};

export default Seed;
