import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import classes from "./SendMail.module.css";
import JoditEditor from "jodit-react";

import { useRef } from "react";

const SendEmail = () => {
  const email = localStorage.getItem("email");
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");

  const editor = useRef(null);

  const [content, setContent] = useState();

  const handleToChange = (e) => {
    setTo(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sendEmail = {
      sendTo: to,
      subject: subject,
      content: content,
    };
    const newEmail = sendEmail.sendTo.replace(/[^\w\s]/gi, "");
    console.log(newEmail);
    try {
      const response = await fetch(
        `https://mail-client-box-70bff-default-rtdb.firebaseio.com/${newEmail}.json`,
        {
          method: "POST",
          body: JSON.stringify({
            id: Math.random(),
            time: new Date().toLocaleString(),
            from: `${email}`,
            subject: sendEmail.subject,
            content: sendEmail.content,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      throw new Error(error);
    }

    setTo("");
    setSubject("");
    setContent("");
  };

  return (
    <div className={classes.box}>
      <h2>Send Email</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className={classes.input} controlId="formBasicTo">
          <Form.Label className={classes.lab}>To</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={to}
            onChange={handleToChange}
            required
          />
        </Form.Group>

        <Form.Group className={classes.input} controlId="formBasicSubject">
          <Form.Label className={classes.lab}>Subject</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter subject"
            value={subject}
            onChange={handleSubjectChange}
            required
          />
        </Form.Group>

        <Form.Group className={classes.input} controlId="formBasicMessage">
          <Form.Label className={classes.lab}>Message</Form.Label>
          {/* <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter message"
            value={message}
            onChange={handleMessageChange}
            className={classes.message}
          /> */}
          <JoditEditor
            ref={editor}
            value={content}
            onChange={(newContent) => {
              setContent(newContent);
            }}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className={classes.btn}>
          Send Email
        </Button>
      </Form>
    </div>
  );
};

export default SendEmail;
