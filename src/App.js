import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PlaylistGenerator from "./components/PlaylistGenerator/PlaylistGenerator";
import Playlist from "./components/Result/Playlist";
import MyNavbar from "./components/Navbar/MyNavbar";
import SongAnalytics from "./components/SongAnalytics/SongAnalytics";
function App() {
  return (
    <>
      <MyNavbar />
      <div className="mt-1 page-wrap">
        <div className="page-background"></div>
        <div className="d-flex index-page-content mt-3 flex-column align-items-center">
          <Router>
            <Switch>
              <Route path="/" exact>
                <PlaylistGenerator />
              </Route>
              <Route path="/result" exact>
                <Playlist />
              </Route>
              <Route path="/song-analytics" exact>
                <SongAnalytics />
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    </>
  );
}

export default App;
