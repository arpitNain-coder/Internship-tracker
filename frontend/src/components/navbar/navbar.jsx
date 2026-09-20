import "./navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        Internship<span>Tracker</span>
      </div>

      <div className="nav-links">
        <a href="#internships">Internships</a>
        <a href="#about">About</a>
        <a href="#github">GitHub</a>
      </div>
    </nav>
  );
}

export default Navbar;