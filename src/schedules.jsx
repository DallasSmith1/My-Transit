import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import Nav from "./Nav";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Nav />
    <Schedules />
  </React.StrictMode>,
);

function Schedules() {
    return (
      <div className="container">
        <h1>Schedules!</h1>
      </div>
    );
}


export default Schedules;