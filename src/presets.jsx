import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import Nav from "./Nav";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Nav />
    <Presets />
  </React.StrictMode>,
);

function Presets() {
    return (
      <div className="container">
        <h1>Presets!</h1>
      </div>
    );
}


export default Presets;