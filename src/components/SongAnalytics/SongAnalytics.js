import React, { useEffect, useState } from "react";
import SearchSongOnly from "../Search/SearchSongOnly";
import SongAnalyticsResult from "./SongAnalyticsResult";

const SongAnalytics = () => {
  const [id, setId] = useState("");
  const [showAnalyticsResult, setShowAnalyticsResult] = useState(false);
  const props = [id, setId, setShowAnalyticsResult];
  useEffect(() => {
    if (id === "") setShowAnalyticsResult(false);
  }, [id]);
  return (
    <>
      <h1 className="text-center mb-5 title mt-3">Song Analytics</h1>
      <SearchSongOnly props={props} />
      {showAnalyticsResult ? <SongAnalyticsResult id={id} /> : ""}
    </>
  );
};

export default SongAnalytics;
