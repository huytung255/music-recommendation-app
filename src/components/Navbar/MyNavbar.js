import React from "react";
import { useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import axios from "axios";
import { authorize } from "../../utilfuncs/auth";
const MyNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userImg, setUserImg] = useState();
  const messageFn = (event) => {
    try {
      const m = event.data;
      if (m === "logged in") setIsLoggedIn(true);
    } catch (e) {
      // do nothing
      console.error(e);
    }
  };
  useEffect(() => {
    window.addEventListener("message", messageFn);
    axios
      .get(process.env.REACT_APP_SERVER_URL + "check-logged-in", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data === "please login") {
          setIsLoggedIn(false);
        }
        if (res.data.status === "logged in") {
          setIsLoggedIn(true);
          setUserImg(res.data.user_image);
        }
      })
      .catch((error) => console.log(error));
    // cleanup this component

    return () => {
      window.removeEventListener("message", messageFn);
    };
  }, []);
  const login = () => {
    authorize();
  };
  const logout = () => {
    axios
      .get(process.env.REACT_APP_SERVER_URL + "logout", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data === "logout") {
          setIsLoggedIn(false);
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <Navbar bg="glass" sticky="top" expand="lg" className="">
      <Navbar.Toggle className="btn-custom" aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="">
        <Nav className="mx-auto justify-content-center">
          <Nav.Link href="/" className="link">
            Playlist Generator
          </Nav.Link>
          <Nav.Link href="/song-analytics" className="link">
            Song Analytics
          </Nav.Link>
          <Nav.Link href="user-analytics" className="link">
            User Analytics
          </Nav.Link>
          <Nav.Link href="/new-releases" className="link">
            New releases
          </Nav.Link>
          {isLoggedIn ? (
            <Nav.Link onClick={logout} className="login-button">
              <img src={userImg} alt="user" className="mr-1" /> Log out
            </Nav.Link>
          ) : (
            <Nav.Link onClick={login} className="login-button">
              <img
                src={process.env.PUBLIC_URL + "Spotify_Icon_RGB_Black.png"}
                alt="spotify"
                className="mr-1"
              />{" "}
              Log in
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;
