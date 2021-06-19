import React, { useEffect, useState } from "react";
import TrackList from "./TrackList";
import Seed from "./Seed";
import SaveButton from "./SaveButton";
import { useHistory, useLocation } from "react-router";
import axios from "axios";
import { Spinner } from "react-bootstrap";
const Playlist = () => {
  const history = useHistory();
  const location = useLocation();
  const [title, setTitle] = useState();
  const [subtitle, setSubtitle] = useState();
  const [length, setLength] = useState(10);
  const [image, setImage] = useState();
  const [duration, setDuration] = useState();
  const [trackList, setTrackList] = useState([]);
  const [noResults, setNoResults] = useState(false);
  useEffect(() => {
    const props = location.state;
    if (props == null) {
      history.push("/");
      return;
    }
    const { method } = props;
    if (method === 1) {
      const { type, id, genre, n } = props;
      setLength(n);
      const query = props;
      delete query.type;
      delete query.id;
      delete query.genre;
      delete query.method;

      ///make axios call here
      switch (type) {
        case "Song":
          axios
            .get(process.env.REACT_APP_SERVER_URL + "tracks/generate/" + id, {
              params: {
                ...query,
              },
            })
            .then((res) => {
              const { seed_track, playlist_duration, tracks } = res.data;
              if (tracks.length === 0) {
                setNoResults(true);
              }
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
            .get(process.env.REACT_APP_SERVER_URL + "artists/generate/" + id, {
              params: {
                ...query,
              },
            })
            .then((res) => {
              const { seed_artist, playlist_duration, tracks } = res.data;
              if (tracks.length === 0) {
                setNoResults(true);
              }
              setTitle(seed_artist.name);
              setImage(seed_artist.image);
              setSubtitle("Artist");
              setDuration(playlist_duration);
              setTrackList([...tracks]);
            })
            .catch((error) => console.log(error));
          break;
        case "Genre":
          axios
            .get(
              process.env.REACT_APP_SERVER_URL + "genres/generate/" + genre,
              {
                params: {
                  ...query,
                },
              }
            )
            .then((res) => {
              const { seed_genre, playlist_duration, tracks } = res.data;
              if (tracks.length === 0) {
                setNoResults(true);
              }
              setTitle(seed_genre);
              setImage(process.env.PUBLIC_URL + "music.png");
              setSubtitle("Genre");
              setDuration(playlist_duration);
              setTrackList([...tracks]);
            })
            .catch((error) => console.log(error));
          break;
        default:
          break;
      }
    }
    if (method === 2) {
      const { n } = props;
      setLength(n);
      const query = props;
      delete query.method;
      axios
        .post(
          process.env.REACT_APP_SERVER_URL + "users/generate-basedon-analysis/",
          {
            ...query,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          const { seed_user, playlist_duration, tracks } = res.data;
          if (tracks.length === 0) {
            setNoResults(true);
          }
          setTitle(seed_user.name + `'s interests`);
          setImage(seed_user.image);
          setSubtitle("User");
          setDuration(playlist_duration);
          setTrackList([...tracks]);
        })
        .catch((error) => console.log(error));
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

      <SaveButton trackList={trackList} />

      {trackList.length !== 0 ? (
        <TrackList length={length} trackList={trackList} duration={duration} />
      ) : noResults ? (
        <h3 className="m-3 text-center">No results match your requirements.</h3>
      ) : (
        <Spinner className="m-4" animation="border" variant="light" />
      )}
    </>
  );
};

export default Playlist;
