import React, { useState, useEffect } from "react";
import { ListGroup, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Navbar, Container, Form } from "react-bootstrap";
import classes from "./ReceivedMail1.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  changeBlueTickStatus,
  increaseCount,
  receivedMail,
} from "../Store/MailSlice";

const ReceivedMailsOne = (props) => {
  const allEmails = useSelector((state) => state.mail.sentMail) || [];
  const dispatch = useDispatch();
  let count = useSelector((state) => state.mail.count);
  const [searchMail, setSearchMail] = useState("");

  useEffect(() => {
    const blueTickCount = allEmails.filter((item) => item.blueTick).length;
    dispatch(increaseCount(blueTickCount));
  }, [allEmails, dispatch]);

  const blueTickHandler = (id) => {
    dispatch(changeBlueTickStatus(id));
  };

  const emailSearchHandler = (e) => {
    console.log("Search Mail:", searchMail);
  };

  const filteredEmails = allEmails.filter(
    (item) =>
      item.to.toLowerCase().includes(searchMail.toLowerCase()) ||
      item.content.toLowerCase().includes(searchMail.toLowerCase())
  );

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>React mail</Navbar.Brand>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchMail}
              onChange={(e) => setSearchMail(e.target.value)}
            />
            <Button
              variant="outline-success"
              onClick={() => emailSearchHandler()}
            >
              Search
            </Button>
          </Form>
        </Container>
      </Navbar>
      <div className={classes.drop}>
        <div className={classes.left}>
          <Link to="/sendMail">
            <Button>Compose Mail {count}</Button>
            <Badge pill bg="primary" style={{ marginLeft: "5px" }}>
              {count}
            </Badge>
          </Link>
        </div>
        <div className={classes.right}>
          {filteredEmails.length === 0 ? (
            <h1>Empty inbox</h1>
          ) : (
            <ListGroup as="ol" numbered>
              {filteredEmails.map((item, index) => (
                <Link
                  to={`/receivedMail/${index}`}
                  key={index}
                  onClick={() => blueTickHandler(item.id)}
                >
                  <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                  >
                    {item.blueTick && (
                      <Badge pill bg="primary">
                        .
                      </Badge>
                    )}
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">{item.to}</div>
                      {item.content}
                    </div>
                    <Badge bg="primary" pill>
                      {item.time}
                    </Badge>
                  </ListGroup.Item>
                </Link>
              ))}
            </ListGroup>
          )}
        </div>
      </div>
    </>
  );
};

export default ReceivedMailsOne;
