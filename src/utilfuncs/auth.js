const authorize = (setIsLoggedIn) => {
  const url = "http://localhost:5000/login/";
  const width = 450,
    height = 730,
    left = window.screen.width / 2 - width / 2,
    top = window.screen.height / 2 - height / 2;

  const messageFn = (event) => {
    try {
      const hash = JSON.parse(event.data);
      if (hash.status === "access_accepted") {
        window.removeEventListener("message", messageFn, false);
        const accessToken = hash.access_token;
        const expiresIn = Number(hash.expires_in) / 3600;
        var expireDate = new Date();
        expireDate.setHours(expireDate.getHours() + expiresIn); //one hour from now
        if (accessToken === "") {
          // todo: implement login error
        } else {
          setIsLoggedIn(true);
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("expiresIn", expireDate);
        }
      }
    } catch (e) {
      // do nothing
      console.error(e);
    }
  };
  window.addEventListener("message", messageFn, false);
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
