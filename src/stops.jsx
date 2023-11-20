import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import Nav from "./Nav";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Nav />
    <Stops />
  </React.StrictMode>,
);

function Stops() {
    return (
      <div className="container">
        <h1>Stops!</h1>
      </div>
    );
}


export default Stops;