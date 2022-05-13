import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { Menu } from "../menu/menu";
import PropTypes from "prop-types";

import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";
import "./main-view.scss";

export default class MainView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      filteredMovies: [],
      user: null,
      FavoriteMovies: [],
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(token);
    }
  }

  onSearchBarChange = (event) => {
    const searchTerm = event.target.value;
    const temporalData = this.state.movies.filter((movies) => {
      return movies.Title.includes(searchTerm);
    });

    this.setState({
      filteredMovies: temporalData,
    });
  };

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
      FavoriteMovies: authData.user.FavoriteMovies,
    });
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios
      .get("https://jwmovieapi.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
          filteredMovies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movies, user, filteredMovies } = this.state;
    return (
      <Router>
        <Menu
          user={this.state.user}
          onSearchBarChange={this.onSearchBarChange}
        />
        {this.state.filteredMovies.map((filteredMovies) => {})}
        <Row className="main-view justify-content-md-center">
          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return filteredMovies.map((m) => (
                <Col md={3} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ));
            }}
          />
          <Route
            path="/register"
            render={({ history }) => {
              if (user) return <Redirect to="/" />;
              return (
                <Col>
                  <RegistrationView onBackClick={() => history.goBack()} />
                </Col>
              );
            }}
          />

          <Route
            path="/movies/:movieId"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <MovieView
                    username={user}
                    movie={movies.find((m) => m._id === match.params.movieId)}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path="/usersfind/:userId"
            render={({ match, history }) => {
              if (!user) {
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              } else {
                return (
                  <Col>
                    <ProfileView
                      user={user}
                      email={user.email}
                      movies={movies}
                      FavoriteMovies={user.FavoriteMovies}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }
            }}
          />

          <Route
            path="/moviesearch/:title"
            render={({ match, history }) => {
              if (!user) {
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              } else {
                return (
                  <Col>
                    <MovieCard
                      user={user}
                      movie={movies.find((m) => m.Title === match.params.Title)}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }
            }}
          />

          <Route
            path="/directors/:name"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <DirectorView
                    director={
                      movies.find((m) => m.Director.Name === match.params.name)
                        .Director
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path="/genres/:name"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <GenreView
                    className="main-view"
                    genre={
                      movies.find((m) => m.Genre.Name === match.params.name)
                        .Genre
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
        </Row>
      </Router>
    );
  }
}

MainView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    })
  ),
};
