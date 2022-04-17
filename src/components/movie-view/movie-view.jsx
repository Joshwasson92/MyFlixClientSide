import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { LoginView } from "../login-view/login-view";

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = { FavoriteMovies: [] };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");

    this.getMovieList(accessToken);
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

  addMovieList = (e, movies) => {
    // e.preventDefault();
    const user = this.props.user.Username;
    const token = localStorage.getItem("token");
    const movie = this.props.movie._id;

    axios
      .put(
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
      <div className="movie-view">
        <div className="movie-poster">
          <img crossOrigin="anonymous" src={movie.ImagePath} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>

        <div>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link">Director</Button>
          </Link>
        </div>
        <div>
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">{movie.Genre.Name}</Button>
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
    );
  }
}
