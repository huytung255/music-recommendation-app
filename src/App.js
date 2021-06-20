import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PlaylistGenerator from "./components/PlaylistGenerator/PlaylistGenerator";
import Playlist from "./components/Result/Playlist";
import MyNavbar from "./components/Navbar/MyNavbar";
import SongAnalytics from "./components/SongAnalytics/SongAnalytics";
import UserAnalytics from "./components/UserAnalytics/UserAnalytics";
import NewReleases from "./components/NewReleases/NewReleases";

function App() {
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
                {/* <Playlist authProps={authProps} /> */}
                <Playlist />
              </Route>
              <Route path="/song-analytics" exact>
                <SongAnalytics />
              </Route>
              <Route path="/user-analytics" exact>
                {/* <UserAnalytics authProps={authProps} /> */}
                <UserAnalytics />
              </Route>
              <Route path="/new-releases" exact>
                {/* <NewReleases authProps={authProps} /> */}
                <NewReleases />
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    </>
  );
}

export default App;
