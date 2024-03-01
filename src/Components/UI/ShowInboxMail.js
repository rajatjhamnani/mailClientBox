import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Navbar, Badge } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import classes from "./ShowInboxMail.module.css";
import profile from "../../Images/profile.jpg";
import { useSelector } from "react-redux";

const ShowInboxMail = (props) => {
  const [fetchedData, setFetchedData] = useState([]);
  const params = useParams();
  console.log(params.mailId);
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

        const dataArray = Object.entries(data).map(([idd, entry]) => ({
          idd,
          ...entry,
        }));
        setFetchedData(dataArray);
      } catch (error) {
        console.log(error.message);
      }
    };
    receiveMails();
  }, [newEmail]);
  console.log(fetchedData[params.mailId]);
  const data = useSelector((state) => state.mail.sentMail);

  return (
    <>
      {" "}
      <Container>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#">React-Mail</Navbar.Brand>
          </Container>
        </Navbar>
      </Container>
      <div className={classes.expand}>
        <div className={classes.first}>
          <NavLink to="/sendMail">
            <Button>Compose Mail</Button>
          </NavLink>
          <br></br>
          <NavLink to="/receivedMail">
            <Button>Inbox</Button>
          </NavLink>

          <br></br>
          <NavLink to="/sentMail">
            {" "}
            <Button>Sent Mail</Button>
          </NavLink>
        </div>

        <div className={classes.second}>
          <img src={profile} alt="profile" />
          {fetchedData[params.mailId] && (
            <>
              <p>{fetchedData[params.mailId].time}</p>
              <h1>{fetchedData[params.mailId].from}</h1>
              <h5>subject:-{fetchedData[params.mailId].subject}</h5>
              <h3>message:-{fetchedData[params.mailId].content}</h3>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default ShowInboxMail;
