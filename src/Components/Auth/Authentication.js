import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import classes from "./Authentication.module.css";

const Authentication = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBgsH4yPBWiBAev0JHTbBDCvA_3BLakGJU",
        {
          method: "POST",
          body: JSON.stringify({
            email: details.email,
            password: details.password,
            returnSecureToken: true,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const data = await response.json();
      console.log(data);
      alert("user has successfully registered");
    } catch (error) {
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
          <h2>Sign in</h2>
          <Form.Group className={classes.lab} controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={emailHandler}
              value={email}
            />
          </Form.Group>

          <Form.Group className={classes.lab} controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={passwordHandler}
              value={password}
            />
          </Form.Group>

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
            />
          </Form.Group>

          <Button className={classes.btn} variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </section>
    </>
  );
};

export default Authentication;
