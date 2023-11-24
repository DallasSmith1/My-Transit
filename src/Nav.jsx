import {Link} from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-success">
        <div>
            <h3><i className="fa-solid fa-train" style={{color: "black"}}></i></h3>
        </div>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
            <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/schedule">Schedule</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/stations">Stations</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/presets">Preset</Link>
            </li>
            </ul>
        </div>
    </nav>
  );
}

export default Nav;
