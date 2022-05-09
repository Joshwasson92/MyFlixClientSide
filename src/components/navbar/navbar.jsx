import React from "react";
import { Link } from "react-router-dom";

import { Navbar, Container, Nav, Button } from "react-bootstrap";

export function Menu({ user }) {
  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  };

  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  return (
    <Navbar
      className="main-nav"
      sticky="top"
      bg="dark"
      expand="lg"
      variant="dark"
    >
      <Container>
        <Navbar.Brand className="navbar-logo" href="/">
          Fishbowl Flix!
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <nav className="ml-auto">
            {isAuth() && <Link to={`/usersfind/${user}`}>{user}</Link>}

            {isAuth() && (
              <Button variant="link" onClick={() => onLoggedOut()}>
                Logout
              </Button>
            )}
            {!isAuth() && <Nav.Link href="/">Sign-in</Nav.Link>}
            {!isAuth() && <Nav.Link href="/register">Sign-up</Nav.Link>}
          </nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
