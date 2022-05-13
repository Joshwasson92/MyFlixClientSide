import React, { useState } from "react";
import axios from "axios";
import { Row, Col, Button, Container, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./registration-view.scss";
import { Menu } from "../menu/menu";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [values, setValues] = useState({
    // Hooks

    usernameErr: "",
    passwordErr: "",
    emailErr: "",
  });

  //user validation

  const validate = () => {
    let isReq = true;

    if (!username) {
      setValues({ ...values, usernameErr: "Username required" });
      isReq = false;
    } else if (username.length < 2) {
      setValues({
        ...values,
        usernameErr: "Username must be at least 2 characters long",
      });
      isReq = false;
    }
    if (!password) {
      setValues({ ...values, passwordErr: "Password required" });
      isReq = false;
    } else if (password.length < 6) {
      setValues({
        ...values,
        passwordErr: "Password must be at least 6 characters long",
      });
      isReq = false;
    }
    if (!email) {
      setValues({ ...values, emailErr: "Email required" });
      isReq = false;
    } else if (email.indexOf("@") === -1) {
      setValues({ ...values, emailErr: "Email is invalid" });
      isReq = false;
    }

    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios
        .post("https://jwmovieapi.herokuapp.com/users", {
          Username: username,
          Password: password,
          Email: email,
          //   Birthday: birthday,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          alert("Registration successful, Please login.");
          window.open("/", "_self");
        })
        .catch((response) => {
          console.error(response);
          alert("An error occured");
        });
    }
  };

  return (
    <Row className="mt-5">
      <Col md={12}>
        <Form>
          <h3 className="reg-form-inputs"> Sign Up</h3>
          <p></p>
          <Form.Group controlid="formUsername" className="reg-form-inputs">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {values.usernameErr && <p>{values.usernameErr}</p>}
          </Form.Group>

          <Form.Group controlid="formPassword" className="reg-form-inputs">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {values.passwordErr && <p>{values.passwordErr}</p>}
          </Form.Group>

          <Form.Group controlid="formEmail" className="reg-form-inputs">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {values.emailErr && <p>{values.emailErr}</p>}
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
            <Button
              onClick={() => {
                onBackClick(null);
              }}
            >
              Back
            </Button>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
  }),
  onRegistration: PropTypes.func,
};
