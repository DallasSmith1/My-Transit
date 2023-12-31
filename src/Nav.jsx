import {Link} from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar fixed-top navbar-expand-lg bg-success">
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Dashboard</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/schedule">Schedule</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/stations">Stations</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/presets">Saved Trips</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/alerts">Alerts</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/about">About</Link>
                </li>
            </ul>
        </div>
    </nav>
  );
}

export default Nav;
