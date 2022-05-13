import axios from "axios";
import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { MovieUser } from "../login-view/login-view";
import "./movie-view.scss";

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = { user: "", FavoriteMovies: [] };
  }

  onLoggedIn(authData) {
    window.addEventListener("storage", (event) => {
      // event contains
      // key – the key that was changed
      // oldValue – the old value
      // newValue – the new value
      // url –
      // storageArea – either localStorage or sessionStorage object where the update happened.
    });
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });
    localStorage.setItem("token", authData.token);
    this.getMovies(authData.token);
  }

  removeMovieList = (e, movies) => {
    const user = this.props.username;
    const token = localStorage.getItem("token");
    const movie = this.props.movie._id;

    axios
      .delete(
        `https://jwmovieapi.herokuapp.com/users/${user}/movies/${movie}`,
        { FavoriteMovies: this.state.FavoriteMovies },

        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        this.setState({
          FavoriteMovies: response.data.FavoriteMovies,
        });
        localStorage.setItem("user", this.state.Username);
        alert("Movie Removed from list");
      })
      .catch(function (error) {
        console.log(error);
        alert("An error occured");
      });
  };

  addMovieList = (e, movies) => {
    // e.preventDefault();

    <MovieUser />;
    const user = this.props.username;

    const token = localStorage.getItem("token");
    const movie = this.props.movie._id;

    axios
      .post(
        `https://jwmovieapi.herokuapp.com/users/${user}/movies/${movie}`,
        { FavoriteMovies: this.state.FavoriteMovies },

        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        this.setState({
          FavoriteMovies: response.data.FavoriteMovies,
        });
        localStorage.setItem("user", this.state.Username);
        alert("Movie Added to list.");
      })
      .catch(function (error) {
        console.log(error);
        alert("An error occured");
      });
  };

  render() {
    const { movie, onBackClick } = this.props;
    return (
      <Card className="movie-view-card">
        <div className="movie-view">
          <img
            className="movie-poster"
            crossOrigin="anonymous"
            src={movie.ImagePath}
          />

          <Card.Title className="text-center">{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <div>
            <Link to={`/directors/${movie.Director.Name}`}>
              <Button variant="secondary" size="sm">
                Director
              </Button>
            </Link>
          </div>
          <div>
            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button variant="secondary" size="sm">
                {movie.Genre.Name}
              </Button>
            </Link>
          </div>

          <Button
            onClick={() => {
              onBackClick(null);
            }}
          >
            Back
          </Button>
          <Button
            onClick={() => {
              this.addMovieList();
            }}
          >
            Add to list
          </Button>
        </div>
        <br></br>
      </Card>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
