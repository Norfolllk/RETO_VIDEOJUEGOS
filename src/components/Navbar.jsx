import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <span className="navbar-brand">🎮 RetoVideojuegos</span>
      <div className="navbar-links">
        <Link to="/">Inventario</Link>
        <Link to="/nuevo">Nuevo Juego</Link>
      </div>
    </nav>
  );
}

export default Navbar;