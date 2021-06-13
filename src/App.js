import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PlaylistGenerator from "./components/PlaylistGenerator/PlaylistGenerator";
import Playlist from "./components/Result/Playlist";
import MyNavbar from "./components/Navbar/MyNavbar";
import SongAnalytics from "./components/SongAnalytics/SongAnalytics";
import UserAnalytics from "./components/UserAnalytics/UserAnalytics";
import NewReleases from "./components/NewReleases/NewReleases";
import { useState, useEffect } from "react";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const authProps = { isLoggedIn, setIsLoggedIn };
  useBackgroundService(isLoggedIn, setIsLoggedIn);
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn"));
  }, []);
  return (
    <>
      <MyNavbar />
      <div className="mt-1 page-wrap">
        <div className="page-background"></div>
        <div className="d-flex px-3 py-2 mt-3 flex-column align-items-center">
          <Router>
            <Switch>
              <Route path="/" exact>
                <PlaylistGenerator />
              </Route>
              <Route path="/result" exact>
                <Playlist authProps={authProps} />
              </Route>
              <Route path="/song-analytics" exact>
                <SongAnalytics />
              </Route>
              <Route path="/user-analytics" exact>
                <UserAnalytics authProps={authProps} />
              </Route>
              <Route path="/new-releases" exact>
                <NewReleases authProps={authProps} />
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    </>
  );
}
const useBackgroundService = (isLoggedIn, setIsLoggedIn) => {
  const [backgroundService, setBackgroundService] = useState(null);

  useEffect(() => {
    const bgService = setInterval(() => {
      // check the condition for running the background service
      // for example, to skip the API call, or whatever
      if (isLoggedIn) {
        setIsLoggedIn(localStorage.getItem("isLoggedIn"));
        //check if past expiration date
        var expiresIn = localStorage.getItem("expiresIn");
        if (expiresIn) {
          if (new Date(expiresIn) < new Date()) {
            setIsLoggedIn(false);
            localStorage.removeItem("expiresIn");
            localStorage.removeItem("isLoggedIn");
          }
        }
      }
    }, 1000);

    setBackgroundService(bgService);

    // make sure you clean up when you no longer need it,
    // for example when component unmounts
    function cleanup() {
      clearInterval(bgService);
    }

    return cleanup;

    // since this `hook` relies on some value from context
    // make sure you include this in your dependency array
    // so that a new background service can be created,
    // and old one be destroyed, when state from context changes
  }, [isLoggedIn]);

  // optionally, return `backgroundService`
  return backgroundService;
};
export default App;
