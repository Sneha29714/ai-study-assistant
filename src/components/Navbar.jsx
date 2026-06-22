import { FaBars } from "react-icons/fa";
function Navbar() {
  return (
    <nav className="navbar">
      <button className="menu-btn">
        <FaBars />
      </button>
      <h2 className="logo">
        📚 Prep<span>Mate</span>
      </h2>
    </nav>
  );
}

export default Navbar;