import {Link} from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-success">
  <a className="navbar-brand" id="currentPage" href="#">Navbar</a>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link className="nav-link" to="/">Home</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/schedule">Schedule</Link>
      </li>
    </ul>
  </div>
</nav>
  );
}

export default Nav;
