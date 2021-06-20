import React from "react";
import { useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { authorize } from "../../utilfuncs/auth";
const MyNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
        if (res.data === "please login") {
          setIsLoggedIn(false);
        }
        if (res.data === "logged in") {
          setIsLoggedIn(true);
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
          <Nav.Link href="/">Playlist Generator</Nav.Link>
          <Nav.Link href="/song-analytics">Song Analytics</Nav.Link>
          <Nav.Link href="user-analytics">User Analytics</Nav.Link>
          <Nav.Link href="/new-releases">New releases</Nav.Link>
          {isLoggedIn ? (
            <Nav.Link onClick={logout}>Log out</Nav.Link>
          ) : (
            <Nav.Link onClick={login}>Log in</Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;
