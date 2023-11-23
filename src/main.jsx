import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import Nav from "./Nav";
import Home from "./Home";
import Schedule from "./Schedule";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
      <Nav />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/schedule">
            <Schedule />
          </Route>
        </Switch>
      </div>
    </Router>
);
