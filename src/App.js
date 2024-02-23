import logo from "./logo.svg";
import "./App.css";
import Authentication from "./Components/Auth/Authentication";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/UI/Home";
import SendMail from "./Components/UI/SendMail";
import ReceivedMails from "./Components/UI/ReceivedMails";
import MyNavbar from "./Components/UI/MyNavbar";
import ShowMail from "./Components/UI/ShowMAil";
import SendEmailOne from "./Components/New/SendMail1";
import ReceivedMailsOne from "./Components/New/ReceivedMail1";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { replaceMail } from "./Components/Store/MailSlice";

function App() {
  const Email = localStorage.getItem("email");
  const newEmail = Email.replace(/[^\w\s]/gi, "");
  const data = useSelector((state) => state.mail.sentMail);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `https://mail-client-box-70bff-default-rtdb.firebaseio.com/${newEmail}.json`
        );
        if (!response.ok) {
          throw new Error("something went wrong");
        }
        const getData = await response.json();
        dispatch(replaceMail(getData));
      } catch (error) {
        console.log(error.message);
      }
    };
    getData();
  }, []);
  useEffect(() => {
    const fetchedData = async () => {
      try {
        const response = await fetch(
          `https://mail-client-box-70bff-default-rtdb.firebaseio.com/${newEmail}.json`,
          {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("something went wrong");
        }
        const sentData = await response.json();
        console.log(sentData);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchedData();
  }, [newEmail, data]);
  return (
    <div className="App">
      <MyNavbar />
      <Routes>
        <Route path="/" exact Component={Home} />
        <Route path="/auth" exact Component={Authentication} />
        <Route path="/sendMail" exact Component={SendEmailOne} />
        <Route path="/receivedMail" exact Component={ReceivedMailsOne} />
        <Route path="/receivedMail/:mailId" exact Component={ShowMail} />
      </Routes>
    </div>
  );
}

export default App;
