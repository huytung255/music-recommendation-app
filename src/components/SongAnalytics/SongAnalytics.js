import React, { useState } from "react";
import SearchSongOnly from "../Search/SearchSongOnly";

const SongAnalytics = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [showAnalyticsResult, setShowAnalyticsResult] = useState(false);
  const props = [title, setTitle, artist, setArtist, setShowAnalyticsResult];
  return (
    <>
      <h1 className="text-center mb-5 title mt-3">Song Analytics</h1>
      <SearchSongOnly props={props} />
      {showAnalyticsResult ? "" : ""}
    </>
  );
};

export default SongAnalytics;
