import "./Home.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import Nav from "./Nav";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Nav />
    <Home />
  </React.StrictMode>,
);

function Home() {
  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>

      

      <p>Click on the Tauri, Vite, and React logos to learn more.</p>
    </div>
  );
}

export default Home;
