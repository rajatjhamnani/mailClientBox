import React, { useEffect, useState } from "react";
import { ListGroup, Badge } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Container, Form, Button } from "react-bootstrap";
import classes from "./ReceivedMails.module.css";
import { useDispatch, useSelector } from "react-redux";
import { receivedMail } from "../Store/MailSlice";

const ReceivedMails = (props) => {
  const [originalData, setOriginalData] = useState();
  console.log(originalData);
  const [fetchedData, setFetchedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const mail = localStorage.getItem("email");
  const newEmail = mail.replace(/[^\w\s]/gi, "");
  const dispatch = useDispatch();

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
        setOriginalData((prev) => {
          return { ...prev, data };
        });

        console.log(data);
        const dataArray = Object.entries(data).map(([id, entry]) => ({
          id,
          ...entry,
        }));
        console.log(dataArray);

        setFetchedData(dataArray);
      } catch (error) {
        console.log(error.message);
      }
    };
    receiveMails();
  }, [dispatch, newEmail]);

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
  let count = 0;

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
            {fetchedData.map((item, index) => {
              if (item.blueTick === true) {
                count++;
                console.log(count);
              }
              return (
                <NavLink to={`/receivedMail/${index}`} key={item.id}>
                  <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                  >
                    <Badge pill bg="primary">
                      .
                    </Badge>
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">{item.from}</div>
                      {item.content}
                    </div>
                    <Badge bg="primary" pill>
                      {item.time}
                    </Badge>
                  </ListGroup.Item>
                </NavLink>
              );
            })}
          </ListGroup>
        </div>
      </div>
    </>
  );
};

export default ReceivedMails;
