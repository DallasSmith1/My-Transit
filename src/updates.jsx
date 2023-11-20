import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import Nav from "./Nav";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Nav />
    <Updates />
  </React.StrictMode>,
);

function Updates() {
    return (
      <div className="container">
        <h1>Updates!</h1>
      </div>
    );
}


export default Updates;