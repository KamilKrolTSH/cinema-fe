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
import { NoAuthRoute } from "./no-auth-route/NoAuthRoute";
import { Showtime } from "./showtime/Showtime";
import { RegisterAdmin } from "./register-admin/RegisterAdmin";
import { Films } from "./films/Films";
import { Rooms } from "./rooms/Rooms";

function App() {
  return (
    <AuthenticateProvider>
      <Router>
        <div className="App">
          <Logout />
          <Switch>
            <NoAuthRoute path="/login">
              <Login />
            </NoAuthRoute>
            <NoAuthRoute path="/register">
              <Register />
            </NoAuthRoute>
            <NoAuthRoute path="/register-admin">
              <RegisterAdmin />
            </NoAuthRoute>
            <PrivateRoute path="/dashboard">
              <Dashboard />
            </PrivateRoute>
            <PrivateRoute path="/showtime/:id">
              <Showtime />
            </PrivateRoute>
            <PrivateRoute path="/films">
              <Films />
            </PrivateRoute>
            <PrivateRoute path="/rooms">
              <Rooms />
            </PrivateRoute>
            <NoAuthRoute path="/">
              <Home />
            </NoAuthRoute>
          </Switch>
        </div>
      </Router>
    </AuthenticateProvider>
  );
}

export default App;
