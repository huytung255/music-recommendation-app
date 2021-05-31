import React, { useEffect, useState } from "react";
import SongList from "./SongList";
import Seed from "./Seed";
import UtilButtons from "./UtilButtons";
import { useHistory, useLocation } from "react-router";
const Playlist = () => {
  const history = useHistory();
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [length, setLength] = useState(10);
  const [image, setImage] = useState("");
  useEffect(() => {
    const props = location.state;
    if (props == null) {
      history.push("/");
      return;
    }
    ///make axios call here
    if (props.title !== "") {
      setTitle(props.title);
      setSubtitle(props.artist);
    } else {
      if (props.artist !== "") {
        setTitle(props.artist);
        setSubtitle("Artist");
      } else {
        setTitle(props.category);
        setSubtitle("Category");
      }
    }
    setLength(props.length);
  }, [location]);
  return (
    <>
      <Seed title={title} subtitle={subtitle} />
      <UtilButtons title={title} />
      <SongList length={length} />
    </>
  );
};

export default Playlist;
