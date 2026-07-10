import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./FormularioVideojuego.css";

function FormularioVideojuego({ onGuardar }) {
  const navigate = useNavigate();
  const location = useLocation();
  const videojuegoRecuperado = location.state?.videojuego;

  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [lanzamiento, setLanzamiento] = useState("");
  const [precio, setPrecio] = useState("");
  const [disponible, setDisponible] = useState(true);

useEffect(() => {
  if (videojuegoRecuperado) {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTitulo(videojuegoRecuperado.titulo || "");
    setGenero(videojuegoRecuperado.genero || "");
    setPlataforma(videojuegoRecuperado.plataforma || "");
    setLanzamiento(videojuegoRecuperado.lanzamiento || "");
    setPrecio(videojuegoRecuperado.precio || "");
    setDisponible(videojuegoRecuperado.disponible ?? true);
  } else {
    setTitulo("");
    setGenero("");
    setPlataforma("");
    setLanzamiento("");
    setPrecio("");
    setDisponible(true);
  }
}, [videojuegoRecuperado]);

  function manejarGuardar(e) {
    e.preventDefault();

    const videojuego = {
      id: videojuegoRecuperado ? videojuegoRecuperado.id : Date.now(),
      titulo,
      genero,
      plataforma,
      lanzamiento: Number(lanzamiento),
      precio: Number(precio),
      disponible,
      progreso: videojuegoRecuperado ? videojuegoRecuperado.progreso : 0,
    };

    onGuardar(videojuego);
    navigate("/");
  }

  function manejarCancelar() {
    navigate("/");
  }

  return (
    <div className="formulario-container">
      <h2>{videojuegoRecuperado ? "Editar Videojuego" : "Nuevo Videojuego"}</h2>
      <form onSubmit={manejarGuardar}>
        <div className="campo">
          <label>Título:</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>

        <div className="campo">
          <label>Género:</label>
          <select
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            required
          >
            <option value="">Selecciona un género</option>
            <option value="Aventura">Aventura</option>
            <option value="Acción">Acción</option>
            <option value="RPG">RPG</option>
            <option value="Acción RPG">Acción RPG</option>
            <option value="Metroidvania">Metroidvania</option>
            <option value="Carreras">Carreras</option>
          </select>
        </div>

        <div className="campo">
          <label>Plataforma:</label>
          <select
            value={plataforma}
            onChange={(e) => setPlataforma(e.target.value)}
            required
          >
            <option value="">Selecciona una plataforma</option>
            <option value="Nintendo Switch">Nintendo Switch</option>
            <option value="PlayStation 5">PlayStation 5</option>
            <option value="Xbox Series X">Xbox Series X</option>
            <option value="PC">PC</option>
          </select>
        </div>

        <div className="campo">
          <label>Año de lanzamiento:</label>
          <input
            type="number"
            value={lanzamiento}
            onChange={(e) => setLanzamiento(e.target.value)}
            min="1970"
            max="2030"
            required
          />
        </div>

        <div className="campo">
          <label>Precio (USD):</label>
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            step="0.01"
            min="0"
            required
          />
        </div>

        <div className="campo campo-checkbox">
          <label>
            <input
              type="checkbox"
              checked={disponible}
              onChange={(e) => setDisponible(e.target.checked)}
            />
            Disponible
          </label>
        </div>

        <div className="formulario-botones">
          <button type="submit" className="btn btn-guardar">
            Guardar
          </button>
          <button type="button" className="btn btn-cancelar" onClick={manejarCancelar}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormularioVideojuego;