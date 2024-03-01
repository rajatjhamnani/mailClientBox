import React, { useEffect, useState } from "react";
import { ListGroup, Badge } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Container, Form, Button } from "react-bootstrap";
import classes from "./ReceivedMails.module.css";
import { useDispatch, useSelector } from "react-redux";
import { increaseNewCount, receivedMail } from "../Store/MailSlice";

const ReceivedMails = () => {
  //const [originalData, setOriginalData] = useState();
  const [fetchedData, setFetchedData] = useState([]);
  //const [searchTerm, setSearchTerm] = useState("");
  const mail = localStorage.getItem("email");
  const newEmail = mail.replace(/[^\w\s]/gi, "");
  const dispatch = useDispatch();
  const count = useSelector((state) => state.mail.newCount);
  console.log(count);
  useEffect(() => {
    const blueTickCount = fetchedData.filter((item) => item.blueTick).length;
    dispatch(increaseNewCount(blueTickCount));
  }, [fetchedData, dispatch]);

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

        if (data && typeof data === "object") {
          const dataArray = Object.entries(data).map(([idd, entry]) => ({
            idd,
            ...entry,
          }));
          setFetchedData(dataArray);
        } else {
          setFetchedData([]);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    receiveMails();
  }, [fetchedData]);

  const handleDelete = async (event, id) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      const response = await fetch(
        `https://mail-client-box-70bff-default-rtdb.firebaseio.com/${newEmail}/${id}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete email (HTTP ${response.status})`);
      }

      const updatedData = fetchedData.filter((item) => item.id !== id);
      setFetchedData(updatedData);
    } catch (error) {
      console.error(error.message);
    }
  };
  const blueTickHandler = async (id) => {
    try {
      const response = await fetch(
        `https://mail-client-box-70bff-default-rtdb.firebaseio.com/${newEmail}/${id}.json`,
        {
          method: "PATCH",
          body: JSON.stringify({
            blueTick: false,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to update blue tick (HTTP ${response.status})`);
      }
      setFetchedData((prevData) =>
        prevData.map((item) =>
          item.idd === id ? { ...item, blueTick: false } : item
        )
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <div className={classes.drop}>
        <div className={classes.left}>
          <Link to="/sendMail">
            {" "}
            <Button>Compose Mail</Button>
          </Link>
          <br />
          <Button>Inbox</Button>
          <Badge pill bg="primary" style={{ marginLeft: "5px" }}>
            {count}
          </Badge>
          <br />
          <Link to="/sentMail">
            {" "}
            <Button>Sent Mail</Button>
          </Link>
        </div>
        <div className={classes.right}>
          <ListGroup as="ol" numbered>
            <h1>Inbox</h1>
            {fetchedData.map((item, index) => (
              <div key={item.id}>
                <NavLink
                  to={`/receivedMail/${index}`}
                  onClick={() => blueTickHandler(item.idd)}
                >
                  <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                  >
                    {item.blueTick === true && (
                      <Badge pill bg="primary">
                        .
                      </Badge>
                    )}
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">{item.from}</div>
                      {item.content}
                    </div>
                    <Badge bg="primary" pill>
                      {item.time}
                    </Badge>
                    <Button
                      variant="primary"
                      style={{ margin: "2px", zIndex: "1" }}
                      onClick={(e) => handleDelete(e, item.idd)}
                    >
                      🗑️
                    </Button>
                  </ListGroup.Item>
                </NavLink>
              </div>
            ))}
          </ListGroup>
        </div>
      </div>
    </>
  );
};

export default ReceivedMails;
