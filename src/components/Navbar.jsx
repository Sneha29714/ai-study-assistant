import { FaBars } from "react-icons/fa";
function Navbar() {
  return (
    <nav className="navbar">
      <button className="menu-btn">
        <FaBars />
      </button>
      <div className="logo">
        📚 PrepMate
      </div>
    </nav>
  );
}

export default Navbar;