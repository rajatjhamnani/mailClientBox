import logo from "./logo.svg";
import "./App.css";
import Authentication from "./Components/Auth/Authentication";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/UI/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact Component={Home} />
        <Route path="/auth" exact Component={Authentication} />
      </Routes>
    </div>
  );
}

export default App;
