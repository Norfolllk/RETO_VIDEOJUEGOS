import { useNavigate } from "react-router-dom";
import "./TablaVideojuegos.css";

function TablaVideojuegos({ videojuegos, onEliminar }) {
  const navigate = useNavigate();

  function manejarEditar(juego) {
    navigate("/editar", { state: { videojuego: juego } });
  }

  return (
    <div className="tabla-container">
      <div className="tabla-header">
        <h2>Tienda de Videojuegos</h2>
        <p>{videojuegos.length} títulos disponibles</p>
      </div>

      <div className="tabla-scroll">
        <table className="tabla-videojuegos">
          <thead>
            <tr>
              <th>Título</th>
              <th>Género</th>
              <th>Plataforma</th>
              <th>Año</th>
              <th>Precio</th>
              <th>Estado</th>
              <th>Descarga</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {videojuegos.map((juego) => (
              <tr key={juego.id} data-label={juego.titulo}>
                <td data-th="Título">{juego.titulo}</td>
                <td data-th="Género">{juego.genero}</td>
                <td data-th="Plataforma">{juego.plataforma}</td>
                <td data-th="Año">{juego.lanzamiento}</td>
                <td data-th="Precio">${juego.precio.toFixed(2)}</td>
                <td data-th="Estado">
                  <span
                    className={`badge ${
                      juego.disponible ? "badge-activo" : "badge-inactivo"
                    }`}
                  >
                    {juego.disponible ? "Disponible" : "Agotado"}
                  </span>
                </td>
                <td data-th="Descarga">
                  <div className="progreso-wrapper">
                    <progress
                      className="progreso-barra"
                      value={juego.progreso}
                      max="1"
                    ></progress>
                    <span className="progreso-texto">
                      {Math.round(juego.progreso * 100)}%
                    </span>
                  </div>
                </td>
                <td data-th="Acciones">
                  <div className="acciones-wrapper">
                    <button
                      className="btn btn-editar"
                      onClick={() => manejarEditar(juego)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-eliminar"
                      onClick={() => onEliminar(juego.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TablaVideojuegos;