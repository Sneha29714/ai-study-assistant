import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/login", { replace: true });
  }
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
        <Link to="/progress">Progress</Link>

        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;