import React, { useEffect, useState } from "react";
import TrackList from "./TrackList";
import Seed from "./Seed";
import SaveButton from "./SaveButton";
import { useHistory, useLocation } from "react-router";
import axios from "axios";
import { Spinner } from "react-bootstrap";
const Playlist = ({ authProps }) => {
  const history = useHistory();
  const location = useLocation();
  const [title, setTitle] = useState();
  const [subtitle, setSubtitle] = useState();
  const [length, setLength] = useState(10);
  const [image, setImage] = useState();
  const [duration, setDuration] = useState();
  const [trackList, setTrackList] = useState([]);
  useEffect(() => {
    const props = location.state;

    if (props == null) {
      history.push("/");
      return;
    }
    const { type, id, category, n } = props;
    setLength(n);
    const query = props;
    delete query.type;
    delete query.id;
    delete query.category;

    ///make axios call here
    switch (type) {
      case "Song":
        axios
          .get("http://localhost:5000/tracks/generate/" + id, {
            params: {
              ...query,
            },
          })
          .then((res) => {
            const { seed_track, playlist_duration, tracks } = res.data;
            setTitle(seed_track.song);
            setImage(seed_track.image);
            setSubtitle(seed_track.artists);
            setDuration(playlist_duration);
            setTrackList([...tracks]);
          })
          .catch((error) => console.log(error));
        break;
      case "Artist":
        axios
          .get("http://localhost:5000/artists/generate/" + id, {
            params: {
              ...query,
            },
          })
          .then((res) => {
            const { seed_artist, playlist_duration, tracks } = res.data;
            setTitle(seed_artist.name);
            setImage(seed_artist.image);
            setSubtitle("Artist");
            setDuration(playlist_duration);
            setTrackList([...tracks]);
          })
          .catch((error) => console.log(error));
        break;
      case "Category":
        axios
          .get("http://localhost:5000/genres/generate/" + category, {
            params: {
              ...query,
            },
          })
          .then((res) => {
            const { seed_genre, playlist_duration, tracks } = res.data;
            setTitle(seed_genre);
            setImage(
              process.env.PUBLIC_URL + "alexey-ruban-73o_FzZ5x-w-unsplash.jpg"
            );
            setSubtitle("Genre");
            setDuration(playlist_duration);
            setTrackList([...tracks]);
          })
          .catch((error) => console.log(error));
        break;
    }
  }, [location]);
  return (
    <>
      <p className="my-2">A playlist is generated on</p>
      {image ? (
        <Seed title={title} subtitle={subtitle} image={image} />
      ) : (
        <Spinner className="m-4" animation="border" variant="light" />
      )}

      <SaveButton authProps={authProps} trackList={trackList} />

      {trackList.length !== 0 ? (
        <TrackList length={length} trackList={trackList} duration={duration} />
      ) : (
        <Spinner className="m-4" animation="border" variant="light" />
      )}
    </>
  );
};

export default Playlist;
