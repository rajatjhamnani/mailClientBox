import logo from "./logo.svg";
import "./App.css";
import Authentication from "./Components/Auth/Authentication";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/UI/Home";
import SendMail from "./Components/UI/SendMail";
import ReceivedMails from "./Components/UI/ReceivedMails";
import MyNavbar from "./Components/UI/MyNavbar";

function App() {
  return (
    <div className="App">
      <MyNavbar />
      <Routes>
        <Route path="/" exact Component={Home} />
        <Route path="/auth" exact Component={Authentication} />
        <Route path="/sendMail" exact Component={SendMail} />
        <Route path="/receivedMail" exact Component={ReceivedMails} />
      </Routes>
    </div>
  );
}

export default App;
