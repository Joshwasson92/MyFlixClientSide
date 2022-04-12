import React from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import PropTypes from "prop-types";
// import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { Row, Col, Button, Container, Form } from "react-bootstrap";
import { LoginView } from "../login-view/login-view";

export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      email: "",
      birthday: "",
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });
    localStorage.setItem("token", authData.token);
    this.getMovies(authData.token);
  }

  getUser = (token) => {
    const Username = localStorage.getItem("user");
    axios
      .get(`https://jwmovieapi.herokuapp.com/usersfind/${Username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          FavoriteMovies: response.data.FavoriteMovies,
          Birthday: response.data.Birthday,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  updateUser = function (e) {
    e.preventDefault();
    const Username = localstore.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .put("https://jwmovieapi.herokuapp.com/users/:Username", {
        headers: { Authorization: "Bearer ${token}" },
        Username: this.state.username,
        Password: this.state.password,
        Email: this.state.email,
        Birthday: this.state.birthday,
      })
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

  render() {
    const { username, email, birthday, password, onBackClick } = this.state;
    console.log(`${username}`);
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {/* {values.usernameErr && <p>{values.usernameErr}</p>} */}
            </Form.Group>

            <Form.Group controlid="formPassword" className="reg-form-inputs">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* {values.passwordErr && <p>{values.passwordErr}</p>} */}
            </Form.Group>

            <Form.Group controlid="formEmail" className="reg-form-inputs">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Form.Group controlid="formBirthday" className="reg-form-inputs">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                  type="date"
                  name="birthday"
                  placeholder="Birthday"
                />
              </Form.Group>
              {/* {values.emailErr && <p>{values.emailErr}</p>} */}
              <Button variant="primary" type="submit" onClick={this.updateUser}>
                Update
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    );
  }
}
