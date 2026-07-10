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
  const [fechaLanzamiento, setFechaLanzamiento] = useState("");
  const [sinopsis, setSinopsis] = useState("");
  const [calificacion, setCalificacion] = useState("");

  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (videojuegoRecuperado) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTitulo(videojuegoRecuperado.titulo || "");
      setGenero(videojuegoRecuperado.genero || "");
      setPlataforma(videojuegoRecuperado.plataforma || "");
      setLanzamiento(videojuegoRecuperado.lanzamiento || "");
      setPrecio(videojuegoRecuperado.precio || "");
      setDisponible(videojuegoRecuperado.disponible ?? true);
      setFechaLanzamiento(videojuegoRecuperado.fechaLanzamiento || "");
      setSinopsis(videojuegoRecuperado.sinopsis || "");
      setCalificacion(videojuegoRecuperado.calificacion || "");
    } else {
      setTitulo("");
      setGenero("");
      setPlataforma("");
      setLanzamiento("");
      setPrecio("");
      setDisponible(true);
      setFechaLanzamiento("");
      setSinopsis("");
      setCalificacion("");
    }
  }, [videojuegoRecuperado]);

  function validarFormulario() {
    const erroresActivos = {};
    const hoy = new Date().toISOString().split("T")[0];

    if (!titulo.trim()) {
      erroresActivos.titulo = "El título no puede estar vacío.";
    }

    if (!genero) {
      erroresActivos.genero = "Selecciona un género.";
    }

    if (!plataforma) {
      erroresActivos.plataforma = "Selecciona una plataforma.";
    }

    if (!fechaLanzamiento) {
      erroresActivos.fechaLanzamiento = "La fecha de lanzamiento es obligatoria.";
    } else if (fechaLanzamiento > hoy) {
      erroresActivos.fechaLanzamiento = "La fecha no puede ser futura.";
    }

    if (!sinopsis.trim()) {
      erroresActivos.sinopsis = "La sinopsis es obligatoria.";
    } else if (sinopsis.trim().length < 10) {
      erroresActivos.sinopsis = "La sinopsis debe tener al menos 10 caracteres.";
    } else if (sinopsis.trim().length > 250) {
      erroresActivos.sinopsis = "La sinopsis no puede superar los 250 caracteres.";
    }

    const calificacionNum = Number(calificacion);
    if (!calificacion) {
      erroresActivos.calificacion = "La calificación es obligatoria.";
    } else if (calificacionNum < 1 || calificacionNum > 100) {
      erroresActivos.calificacion = "La calificación debe estar entre 1 y 100.";
    }

    if (!precio || Number(precio) <= 0) {
      erroresActivos.precio = "Ingresa un precio válido.";
    }

    return erroresActivos;
  }

  function manejarGuardar(e) {
    e.preventDefault();

    const erroresActivos = validarFormulario();

    if (Object.keys(erroresActivos).length > 0) {
      setErrores(erroresActivos);
      return;
    }

    setErrores({});

    const videojuego = {
      id: videojuegoRecuperado ? videojuegoRecuperado.id : Date.now(),
      titulo: titulo.trim(),
      genero,
      plataforma,
      lanzamiento: Number(lanzamiento) || new Date(fechaLanzamiento).getFullYear(),
      precio: Number(precio),
      disponible,
      fechaLanzamiento,
      sinopsis: sinopsis.trim(),
      calificacion: Number(calificacion),
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
      <form onSubmit={manejarGuardar} noValidate>
        <div className="campo">
          <label>Título:</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          {errores.titulo && <span className="error-mensaje">{errores.titulo}</span>}
        </div>

        <div className="campo">
          <label>Género:</label>
          <select value={genero} onChange={(e) => setGenero(e.target.value)}>
            <option value="">Selecciona un género</option>
            <option value="Aventura">Aventura</option>
            <option value="Acción">Acción</option>
            <option value="RPG">RPG</option>
            <option value="Acción RPG">Acción RPG</option>
            <option value="Metroidvania">Metroidvania</option>
            <option value="Carreras">Carreras</option>
          </select>
          {errores.genero && <span className="error-mensaje">{errores.genero}</span>}
        </div>

        <div className="campo">
          <label>Plataforma:</label>
          <select value={plataforma} onChange={(e) => setPlataforma(e.target.value)}>
            <option value="">Selecciona una plataforma</option>
            <option value="Nintendo Switch">Nintendo Switch</option>
            <option value="PlayStation 5">PlayStation 5</option>
            <option value="Xbox Series X">Xbox Series X</option>
            <option value="PC">PC</option>
          </select>
          {errores.plataforma && <span className="error-mensaje">{errores.plataforma}</span>}
        </div>

        <div className="campo">
          <label>Fecha de lanzamiento:</label>
          <input
            type="date"
            value={fechaLanzamiento}
            max={new Date().toISOString().split("T")[0]}
            onChange={(e) => setFechaLanzamiento(e.target.value)}
          />
          {errores.fechaLanzamiento && (
            <span className="error-mensaje">{errores.fechaLanzamiento}</span>
          )}
        </div>

        <div className="campo">
          <label>Sinopsis:</label>
          <textarea
            value={sinopsis}
            onChange={(e) => setSinopsis(e.target.value)}
            maxLength={250}
            rows={4}
            placeholder="Escribe una breve reseña (10-250 caracteres)..."
          />
          <span className="contador-caracteres">{sinopsis.length}/250</span>
          {errores.sinopsis && <span className="error-mensaje">{errores.sinopsis}</span>}
        </div>

        <div className="campo">
          <label>Calificación de la crítica (1-100):</label>
          <input
            type="number"
            value={calificacion}
            min="1"
            max="100"
            onChange={(e) => setCalificacion(e.target.value)}
          />
          {errores.calificacion && (
            <span className="error-mensaje">{errores.calificacion}</span>
          )}
        </div>

        <div className="campo">
          <label>Precio (USD):</label>
          <input
            type="number"
            value={precio}
            step="0.01"
            min="0"
            onChange={(e) => setPrecio(e.target.value)}
          />
          {errores.precio && <span className="error-mensaje">{errores.precio}</span>}
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