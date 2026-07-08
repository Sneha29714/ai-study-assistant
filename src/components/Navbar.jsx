import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-top">
      <h2 className="logo">
        📚 Prep<span>Mate</span>
      </h2>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <a href="/#howitworks">How It Works</a>
        <a href="/#upload-notes">Upload Notes</a>
        <Link to="/my-notes">My Notes</Link>
      </div>
    </nav>
  );
}

export default Navbar;