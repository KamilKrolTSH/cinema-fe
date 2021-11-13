import React from "react";
import "./App.css";
import { Home } from "./home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "./login/Login";
import { Register } from "./register/Register";
import { AuthenticateProvider } from "./providers/AuthenticateProvider";
import { Dashboard } from "./dashboard/Dashboard";
import { PrivateRoute } from "./private-route/PrivateRoute";
import { Logout } from "./logout/Logout";

function App() {
  return (
    <AuthenticateProvider>
      <Router>
        <div className="App">
          <Logout />
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <PrivateRoute path="/dashboard">
              <Dashboard />
            </PrivateRoute>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthenticateProvider>
  );
}

export default App;
