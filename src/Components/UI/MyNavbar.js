import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
const MyNavbar = (props) => {
  return (
    <>
      {" "}
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            Navbar
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/sendMail">
              Compose Mail
            </Nav.Link>
            <Nav.Link as={NavLink} to="/receivedMail">
              Inbox
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
export default MyNavbar;
