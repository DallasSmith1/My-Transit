import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import App from "./App";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <BrowserRouter >
        <App/>
      </BrowserRouter>
    </React.StrictMode>
);
