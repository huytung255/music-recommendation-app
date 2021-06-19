const authorize = () => {
  const url = "https://music-app-spotify.herokuapp.com/login/";
  const width = 450,
    height = 730,
    left = window.screen.width / 2 - width / 2,
    top = window.screen.height / 2 - height / 2;

  window.open(
    url,
    "Spotify",
    "menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=" +
      width +
      ", height=" +
      height +
      ", top=" +
      top +
      ", left=" +
      left
  );
};

exports.authorize = authorize;
