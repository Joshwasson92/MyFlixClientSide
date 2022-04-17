import React from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import PropTypes from "prop-types";
// import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { Row, Col, Button, Container, Form, Card } from "react-bootstrap";
import { LoginView } from "../login-view/login-view";

export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      Username: "",
      Password: "",
      Email: "",
      Birthday: "",
      FavoriteMovies: [],
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");

    this.getUser(accessToken);
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

  getUser = () => {
    const user = this.props.user;
    const token = localStorage.getItem("token");
    axios
      .get(`https://jwmovieapi.herokuapp.com/usersfind/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  updateUser = (e) => {
    e.preventDefault();
    const user = this.props.user;
    const token = localStorage.getItem("token");

    axios
      .put(
        `https://jwmovieapi.herokuapp.com/users/${user}`,
        {
          Username: this.state.Username,
          Password: this.state.Password,
          Email: this.state.Email,
          Birthday: this.state.Birthday,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });
        localStorage.setItem("user", this.state.Username);
        alert("Profile Successfully updated.");
      })
      .catch(function (error) {
        console.log(error);
        alert("An error occured");
      });
  };

  setUsername(value) {
    this.setState({
      Username: value,
    });
  }

  setPassword(value) {
    this.setState({
      Password: value,
    });
  }

  setEmail(value) {
    this.setState({
      Email: value,
    });
  }

  setBirthday(value) {
    this.setState({
      Birthday: value,
    });
  }

  deleteAccount() {
    const user = this.props.user;
    const token = localStorage.getItem("token");

    axios
      .delete(" https://jwmovieapi.herokuapp.com/usersdelete/${user}", {
        headers: { Authorization: `bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        localStorage.removeItem("user");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  removeFavMovie = (e, movies) => {
    e.preventDefault();
    const user = this.props.user;
    const token = localStorage.getItem("token");

    axios.delete(
      "https://jwmovieapi.herokuapp.com/users/${user}/movies/${movie._id}",
      { headers: { Authorization: `bearer ${token}` } }
        .then((response) => {
          console.log(response);
          this.componentDidMount();
        })
        .catch(function (error) {
          console.log(error);
        })
    );
  };

  render() {
    const { Username, Email, Birthday, Password, onBackClick } = this.state;
    const { FavoriteMovies } = this.props;

    return (
      <Row className="mt-5">
        <Col md={12}>
          <Form>
            <h3>Profile</h3>
            <p></p>
            <Form.Group controlid="formUsername" className="reg-form-inputs">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                value={this.state.Username}
                onChange={(e) => this.setUsername(e.target.value)}
              />
              {/* {values.usernameErr && <p>{values.usernameErr}</p>} */}
            </Form.Group>

            <Form.Group controlid="formPassword" className="reg-form-inputs">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                value={this.state.Password}
                onChange={(e) => this.setPassword(e.target.value)}
              />
              {/* {values.passwordErr && <p>{values.passwordErr}</p>} */}
            </Form.Group>

            <Form.Group controlid="formEmail" className="reg-form-inputs">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                placeholder="user@example.com"
                value={this.state.Email}
                onChange={(e) => this.setEmail(e.target.value)}
              />

              <Form.Group controlid="formBirthday" className="reg-form-inputs">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                  type="date"
                  name="birthday"
                  placeholder="Birthday"
                  //   value={birthday}
                  onChange={(e) => this.setBirthday(e.target.value)}
                />
              </Form.Group>
              {/* {values.emailErr && <p>{values.emailErr}</p>} */}
              <Button variant="primary" type="submit" onClick={this.updateUser}>
                Update
              </Button>
              <Link to={"/"}>
                <Button>Back</Button>
              </Link>
              <Button onClick={() => this.deleteAccount()}>
                Deactivate Account
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    );
    <Row>
      <Col>
        <Card>
          <Card.Body>
            {FavoriteMovies.length === 0 && (
              <div className="text-center">You have no favorite movies.</div>
            )}
            <Row className="favMovies-container">
              {FavoriteMovies.length > 0 &&
                movies.map((movie) => {
                  if (
                    movie._id ===
                    FavoriteMovies.find((favorite) => favorite === movie._id)
                  ) {
                    return (
                      <Card className="favorite-movie" key={movie._id}>
                        <Card.Img
                          className="favorite-movie-image"
                          variant="top"
                          src={movie.ImagePath}
                        />
                        <Card.Body>
                          <Card.Title className="movie-title">
                            {movie.Title}
                          </Card.Title>
                          <Button
                            value={movie._id}
                            onClick={(e) => this.removeFavMovie(e, movie)}
                          >
                            Remove Movie
                          </Button>
                        </Card.Body>
                      </Card>
                    );
                  }
                })}
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>;
  }
}

ProfileView.propTypes = {
  updateUser: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
  }),
  onupdateUser: PropTypes.func,
};
