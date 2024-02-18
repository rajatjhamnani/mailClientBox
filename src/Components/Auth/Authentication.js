import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import classes from "./Authentication.module.css";
import { useNavigate } from "react-router-dom";

const Authentication = (props) => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toggleButtonHandler = () => {
    setLogin((prev) => {
      return !prev;
    });
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const confirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const details = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
    let url;
    if (login) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBgsH4yPBWiBAev0JHTbBDCvA_3BLakGJU";
    } else {
      if (password === confirmPassword)
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBgsH4yPBWiBAev0JHTbBDCvA_3BLakGJU";
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: details.email,
          password: details.password,
          returnSecureToken: true,
        }),
        headers: {
          "content-type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const data = await response.json();
      navigate("/");
      console.log(data);
      {
        !login && alert("user has successfully registered");
      }
      {
        login && alert("user has successfully Login");
      }
    } catch (error) {
      alert("something went wrong");
      console.error("fetched error", error);
    }
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      <section className={classes.auth}>
        <Form onSubmit={submitHandler}>
          <h2>{login ? "Login" : "Sign"} in</h2>
          <Form.Group className={classes.lab} controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={emailHandler}
              value={email}
              required
            />
          </Form.Group>

          <Form.Group className={classes.lab} controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={passwordHandler}
              value={password}
              required
            />
          </Form.Group>

          {!login && (
            <Form.Group
              className={classes.lab}
              controlId="formBasicConfirmPassword"
            >
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                onChange={confirmPasswordHandler}
                value={confirmPassword}
                required
              />
            </Form.Group>
          )}

          <Button className={classes.btn} variant="primary" type="submit">
            {login ? "Login" : "SignUp"}
          </Button>
        </Form>
        <button onClick={toggleButtonHandler}>
          {login
            ? "No Existing account ? sign up"
            : "Already have account? Login"}
        </button>
      </section>
    </>
  );
};

export default Authentication;
