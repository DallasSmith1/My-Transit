import {Link} from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-success">
  <a className="navbar-brand" href="#">My Transit</a>
    <div className="navbar-nav">
      <Link to="/">Home</Link>
      <Link to="/schedule">Schedule</Link>
    </div>
</nav>
  );
}

export default Nav;
