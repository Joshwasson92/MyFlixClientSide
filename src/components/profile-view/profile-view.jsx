import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Row, Col, Button, Container, Form, Card } from "react-bootstrap";
import { MovieUser } from "../login-view/login-view";
import { LoginView } from "../login-view/login-view";
import "./profile-view.scss";

/**
 * Profile View Page
 */
export class ProfileView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Username: "",
      Password: "",
      Email: "",
      Birthday: "",
      FavoriteMovies: [],
    };
  }

  componentDidMount() {
    this.getUser();
  }

  /**
   * Defining user as current props and retreiving JWT token and making an API call to get user information.
   */
  getUser() {
    const user = this.props.user;
    const token = localStorage.getItem("token");

    axios
      .get(`https://jwmovieapi.herokuapp.com/usersfind/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });
        localStorage.setItem("user", this.state.Username);
        this.findFavMovies(response.data.FavoriteMovies);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /**
   *
   * @param {string} favMovies
   */
  findFavMovies(favMovies) {
    const token = localStorage.getItem("token");

    axios
      .get("https://jwmovieapi.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          FavoriteMovies: response.data.filter((movie) =>
            favMovies.includes(movie._id)
          ),
        });
      })

      .catch(function (error) {
        console.log(error);
      });
  }

  /**
   * API call to retreive a users favorite movies array.
   */
  getFavMovies() {
    const user = this.props.user;
    const token = localStorage.getItem("token");

    axios
      .get(`https://jwmovieapi.herokuapp.com/${user}/movies`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.findFavMovies(response.data.FavoriteMovies);
      });
  }

  /**
   * When logging out, will clear local storage items.
   */
  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: "",
    });
    window.open("/", "_self");
  }
  /**
   *Makes API call to update a users profile information and updates local stoarge with the updated state.
   * @param {event} e
   */
  updateUser = (e) => {
    e.preventDefault();
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .put(
        `https://jwmovieapi.herokuapp.com/${user}`,
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

  /**
   * Sets the state with the current username
   * @param {string} value
   */
  setUsername(value) {
    this.setState({
      Username: value,
    });
  }

  /**
   * Sets the state with the current password
   * @param {string} value
   */
  setPassword(value) {
    this.setState({
      Password: value,
    });
  }

  /**
   * Sets the state with the current email
   * @param {string} value
   */
  setEmail(value) {
    this.setState({
      Email: value,
    });
  }

  /**
   * Sets the state with the current birthday
   * @param {date} value
   */
  setBirthday(value) {
    this.setState({
      Birthday: value,
    });
  }
  /**
   * Makes API call to delete users account and then clears localstorage.
   * @param {string} value
   */
  deleteAccount() {
    const user = this.props.user;
    const token = localStorage.getItem("token");

    axios
      .delete(`https://jwmovieapi.herokuapp.com/usersdelete/${user}`, {
        headers: { Authorization: `bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        localStorage.removeItem("user");
      })
      .then((response) => {
        console.log(response);
        alert("Account Deleted");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /**
   * Makes an API call to emove a specific movie from the users favorite movies array.
   * @param {string} _id
   */
  removeFavMovie = (_id) => {
    const user = this.props.user;
    const token = localStorage.getItem("token");

    axios
      .delete(
        `https://jwmovieapi.herokuapp.com/users/${user}/movies/${_id}`,

        { headers: { Authorization: `bearer ${token}` } }
      )
      .then((response) => {
        console.log(response);
        alert("Movie removed from list");
        window.location.reload();
      })

      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    const { movie, FavoriteMovies, onBackClick } = this.props;
    const { user } = this.state;

    return (
      <Row className="mt-5">
        <Col md={12}>
          <Card>
            <Card.Body>
              {this.getFavMovies()}
              {this.state.FavoriteMovies.length === 0 && (
                <div className="text-center">You have no favorite movies.</div>
              )}
              <Row className="favMovies-container">
                {this.state.FavoriteMovies.map((favMovie) => (
                  <Card>
                    <Card.Body>
                      <div className="movie-title">{favMovie.Title}</div>
                      <img
                        crossOrigin="anonymous"
                        src={favMovie.ImagePath}
                        className="movie-img"
                      />
                      <Button
                        onClick={() => {
                          this.removeFavMovie(favMovie._id);
                        }}
                      >
                        Remove Movie
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
              </Row>
            </Card.Body>
          </Card>
          <br></br>
          <Card>
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

                <Form.Group
                  controlid="formBirthday"
                  className="reg-form-inputs"
                >
                  <Form.Label>Birthday:</Form.Label>
                  <Form.Control
                    type="date"
                    name="birthday"
                    placeholder="Birthday"
                    onChange={(e) => this.setBirthday(e.target.value)}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={this.updateUser}
                >
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
          </Card>
        </Col>
      </Row>
    );
  }
}

/**
 * PropTypes validation.
 */
ProfileView.propTypes = {
  updateUser: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
  }),
};
