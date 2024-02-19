import logo from "./logo.svg";
import "./App.css";
import Authentication from "./Components/Auth/Authentication";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/UI/Home";
import SendMail from "./Components/UI/SendMail";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact Component={Home} />
        <Route path="/auth" exact Component={Authentication} />
        <Route path="/sendMail" exact Component={SendMail} />
      </Routes>
    </div>
  );
}

export default App;
