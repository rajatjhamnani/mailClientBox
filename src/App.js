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
import { replaceMail, sentEmails } from "./Components/Store/MailSlice";
import { fetchMailData, mailData } from "./Components/Store/MailThunk";
import SentMail from "./Components/New/SentMail";

function App() {
  const Email = localStorage.getItem("email");
  const newEmail = Email.replace(/[^\w\s]/gi, "");
  const data = useSelector((state) => state.mail.sentMail);
  const to = useSelector((state) => state.mail.to);
  const sendTo = to.replace(/[^\w\s]/gi, "");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMailData(newEmail));
  }, []);

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      dispatch(mailData(data));
    }
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
        <Route path="/sentMail" exact Component={SentMail} />
      </Routes>
    </div>
  );
}

export default App;
