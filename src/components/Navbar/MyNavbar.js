import React from "react";
import { Nav, Navbar } from "react-bootstrap";
const MyNavbar = () => {
  return (
    <Navbar bg="glass" sticky="top" expand="lg" className="">
      <Navbar.Toggle className="btn-custom" aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="">
        <Nav className="mx-auto justify-content-center">
          <Nav.Link href="/">Playlist Generator</Nav.Link>
          <Nav.Link href="/song-analytics">Song Analytics</Nav.Link>
          <Nav.Link href="user-analytics">User Analytics</Nav.Link>
          <Nav.Link href="/new-releases">New releases</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;
