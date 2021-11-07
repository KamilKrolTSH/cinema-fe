import React from "react";
import "./App.css";
import { Home } from "./home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "./login/Login";
import { Register } from "./register/Register";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
