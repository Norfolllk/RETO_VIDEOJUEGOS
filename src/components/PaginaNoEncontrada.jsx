import { Link } from "react-router-dom";
import "./PaginaNoEncontrada.css";

function PaginaNoEncontrada() {
  return (
    <div className="error-page">
      <div className="error-card">
        <span className="error-badge">404</span>
        <h1>Página no encontrada</h1>
        <p>La ruta que buscas no existe o ya no está disponible.</p>
        <Link className="error-link" to="/">
          Volver al inventario
        </Link>
      </div>
    </div>
  );
}

export default PaginaNoEncontrada;