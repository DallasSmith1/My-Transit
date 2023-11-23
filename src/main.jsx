import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import Nav from "./Nav";
import Home from "./Home";
import Schedule from "./Schedule";
import Stations from "./Stations";
import Presets from "./Presets";
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
          <Route exact path="/stations">
            <Stations />
          </Route>
          <Route exact path="/presets">
            <Presets />
          </Route>
        </Switch>
      </div>
    </Router>
);
