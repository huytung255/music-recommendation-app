import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Search from "./components/Search/Search";
function App() {
  return (
    <div className="d-flex index-page flex-column align-items-center">
      <h1 className=" mb-5 title mt-5">Playlist Generator</h1>
      <Search />
    </div>
  );
}

export default App;
