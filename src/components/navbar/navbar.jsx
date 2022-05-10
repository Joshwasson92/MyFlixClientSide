import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MovieView } from "../movie-view/movie-view";
import {
  Navbar,
  Container,
  Nav,
  Button,
  Form,
  FormControl,
} from "react-bootstrap";
import axios from "axios";

export function Menu({ user }) {
  const [searchText, setSearchText] = useState("");
  const [movie, setMovie] = useState();

  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  };

  function getMovie() {
    axios
      .get(`https://jwmovieapi.herokuapp.com/moviesearch/${searchText}`, {
        headers: { Authorization: `Bearer ${isAuth()}` },
      })
      .then((response) => {
        setMovie(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleSearchInput = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchText) {
      getMovie();
    } else {
      alert("Please enter a movie title!");
    }
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
        {isAuth() && (
          <Form inline="true">
            <FormControl
              onChange={handleSearchInput}
              type="text"
              placeholder="Search"
              className="mr-sm-2"
            />
            <Button
              onClick={() => {
                handleSearchSubmit();
              }}
              variant="outline-info"
            >
              Search
            </Button>
          </Form>
        )}
      </Container>
    </Navbar>
  );
}
