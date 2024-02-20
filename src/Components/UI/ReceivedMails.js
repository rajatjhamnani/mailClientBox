import React, { useEffect, useState } from "react";
import { ListGroup, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Navbar, Container, Form, Button } from "react-bootstrap";
import classes from "./ReceivedMails.module.css";

const ReceivedMails = (props) => {
  const [fetchedData, setFetchedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const mail = localStorage.getItem("email");
  const newEmail = mail.replace(/[^\w\s]/gi, "");

  useEffect(() => {
    const receiveMails = async () => {
      try {
        const response = await fetch(
          `https://mail-client-box-70bff-default-rtdb.firebaseio.com/${newEmail}.json`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const data = await response.json();
        const dataArray = Object.entries(data).map(([id, entry]) => ({
          id,
          ...entry,
        }));
        setFetchedData(dataArray);
      } catch (error) {
        console.log(error.message);
      }
    };
    receiveMails();
  }, []);

  const handleSearch = () => {
    const filteredData = fetchedData.filter((item) => {
      return (
        item.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFetchedData(filteredData);
  };

  const handleClearSearch = async () => {
    setSearchTerm("");
    try {
      const response = await fetch(
        `https://mail-client-box-70bff-default-rtdb.firebaseio.com/${newEmail}.json`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      const dataArray = Object.entries(data).map(([id, entry]) => ({
        id,
        ...entry,
      }));
      setFetchedData(dataArray);
    } catch (error) {
      console.log(error.message);
    }
  };

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-success" onClick={handleSearch}>
              Search
            </Button>
            <Button
              variant="outline-secondary"
              onClick={handleClearSearch}
              className="ms-2"
            >
              Clear Search
            </Button>
          </Form>
        </Container>
      </Navbar>
      <div className={classes.drop}>
        <div className={classes.left}>
          <Link to="/sendMail">
            {" "}
            <Button>Compose Mail</Button>
          </Link>
        </div>
        <div className={classes.right}>
          <ListGroup as="ol" numbered>
            {fetchedData.map((item) => (
              <ListGroup.Item
                key={item.id}
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{item.from}</div>
                  {item.content}
                </div>
                <Badge bg="primary" pill>
                  {item.time}
                </Badge>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </div>
    </>
  );
};

export default ReceivedMails;
