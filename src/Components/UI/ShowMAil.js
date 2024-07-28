import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Navbar, Badge } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import classes from "./ShowMail.module.css";
import profile from "../../Images/profile.jpg";
import { useSelector } from "react-redux";

const ShowMail = (props) => {
  const [fetchedData, setFetchedData] = useState([]);
  const params = useParams();
  console.log(params.mailId);
  const count = useSelector((state) => state.mail.count);
  const newCount = useSelector((state) => state.mail.newCount);
  // const mail = localStorage.getItem("email");
  // const newEmail = mail.replace(/[^\w\s]/gi, "");

  // useEffect(() => {
  //   const receiveMails = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://mail-client-box-70bff-default-rtdb.firebaseio.com/${newEmail}.json`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       if (!response.ok) {
  //         throw new Error("Something went wrong");
  //       }
  //       const data = await response.json();
  //       const dataArray = Object.entries(data).map(([id, entry]) => ({
  //         id,
  //         ...entry,
  //       }));
  //       setFetchedData(dataArray);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };
  //   receiveMails();
  // }, []);
  // console.log(fetchedData[params.mailId]);
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
          <NavLink to="/receivedMail">
            <NavLink to="/sendMail">
              <Button>Compose Mail</Button>
            </NavLink>
            <br></br>
            <Button>
              Inbox<Badge>{newCount}</Badge>
            </Button>
          </NavLink>
          <br></br>
          <NavLink to="/sentMail">
            {" "}
            <Button>
              Sent Mail<Badge>{count}</Badge>
            </Button>
          </NavLink>
        </div>

        <div className={classes.second}>
          <img src={profile} alt="profile" />
          {data[params.mailId] && (
            <>
              <p>{data[params.mailId].time}</p>
              <h1>{data[params.mailId].to}</h1>
              <h5>subject:-{data[params.mailId].subject}</h5>
              <h3>message:-{data[params.mailId].content}</h3>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default ShowMail;
