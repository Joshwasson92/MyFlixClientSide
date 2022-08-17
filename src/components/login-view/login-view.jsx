import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import { Menu } from "../menu/menu";
import { RegistrationView } from "../registration-view/registration-view";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import "./login-view.scss";
import PropTypes from "prop-types";

/**
 * If the user selects register, it will direct them to the Registration View.
 * @module RegisterUser
 * @param {object} props
 * @returns Registration view.
 */
function RegisterUser(props) {
  return <RegistrationView></RegistrationView>;
}

export function MovieUser(props) {
  return <MovieView></MovieView>;
}

/**
 * Uses hooks for user imput for username and password
 * @param {Array} props
 * @returns
 */
export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  /**
   * Form validation for user login.
   * @returns boolean
   */
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr("Username is Required");
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr("Username must be 2 characters long");
      isReq = false;
    }
    if (!password) {
      setPasswordErr("Password Required");
      isReq = false;
    } else if (password.length < 2) {
      setPasswordErr("Password must be 6 characters long");
      isReq = false;
    }

    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios
        .post("https://jwmovieapi.herokuapp.com/login", {
          Username: username,
          Password: password,
        })
        .then((response) => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch((e) => {
          console.log("Invalid username or password");
        });
    }
  };

  return (
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label className="reg-form-inputs">Username:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {/* code added here to display validation error */}
        {usernameErr && <p>{usernameErr}</p>}
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label className="reg-form-inputs">Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* code added here to display validation error */}
        {passwordErr && <p>{passwordErr}</p>}
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>

      <Link to={"/register"}>
        <Button>Register</Button>
      </Link>
    </Form>
  );
}

/**
 * PropTypes validation.
 */
LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
