import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import Nav from "./Nav";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Nav />
    <Fare />
  </React.StrictMode>,
);

function Fare() {
    return (
      <div className="container">
        <h1>Fare Costs!</h1>
      </div>
    );
}


export default Fare;