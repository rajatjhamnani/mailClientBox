import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../Store/AuthSlice";
const MyNavbar = (props) => {
  const newMail = localStorage.getItem("email");
  const isLogin = useSelector((state) => state.auth.isLogin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logouthandler = () => {
    navigate("/auth");
    dispatch(logoutUser());
  };
  return (
    <>
      {" "}
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          {!isLogin && (
            <Navbar.Brand as={NavLink} to="/">
              React Mail
            </Navbar.Brand>
          )}
          <Nav className="me-auto">
            {isLogin && (
              <Nav.Link as={NavLink} to="/">
                Home
              </Nav.Link>
            )}
            {isLogin && (
              <Nav.Link as={NavLink} to="/sendMail">
                Compose Mail
              </Nav.Link>
            )}
            {isLogin && (
              <Nav.Link as={NavLink} to="/receivedMail">
                Inbox
              </Nav.Link>
            )}
            {!isLogin && (
              <Nav.Link as={NavLink} to="/auth">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Container>
        {isLogin && (
          <Button
            style={{ marginRight: "50px" }}
            onClick={() => logouthandler()}
          >
            Logout
          </Button>
        )}
        {isLogin && <b style={{ marginRight: "30px" }}>{newMail}</b>}
      </Navbar>
    </>
  );
};
export default MyNavbar;
