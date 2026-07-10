import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import TablaVideojuegos from "./components/TablaVideojuegos";
import FormularioVideojuego from "./components/FormularioVideojuego";
import Navbar from "./components/Navbar";
import PaginaNoEncontrada from "./components/PaginaNoEncontrada";
import AlertaNotificacion from "./components/AlertaNotificacion";
import videojuegosData from "./data/videojuegos";

function App() {
  const [videojuegos, setVideojuegos] = useState(() => {
    const datosGuardados = localStorage.getItem("lista_videojuegos");
    return datosGuardados ? JSON.parse(datosGuardados) : videojuegosData;
  });

  const [mensajeExito, setMensajeExito] = useState("");

  useEffect(() => {
    localStorage.setItem("lista_videojuegos", JSON.stringify(videojuegos));
  }, [videojuegos]);

  function agregarVideojuego(juegoNuevo) {
    setVideojuegos([...videojuegos, juegoNuevo]);
    setMensajeExito("Videojuego agregado correctamente ✅");
  }

  function eliminarVideojuego(id) {
    setVideojuegos(videojuegos.filter((j) => j.id !== id));
    setMensajeExito("Videojuego eliminado ✅");
  }

  function editarVideojuego(juegoEditado) {
    setVideojuegos(
      videojuegos.map((j) => (j.id === juegoEditado.id ? juegoEditado : j))
    );
    setMensajeExito("Videojuego actualizado correctamente ✅");
  }

  function manejarGuardar(juego) {
    const existe = videojuegos.find((j) => j.id === juego.id);
    if (existe) {
      editarVideojuego(juego);
    } else {
      agregarVideojuego(juego);
    }
  }

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        {mensajeExito && (
          <AlertaNotificacion
            mensaje={mensajeExito}
            onFin={() => setMensajeExito("")}
          />
        )}
        <Routes>
          <Route
            path="/"
            element={
              <TablaVideojuegos
                videojuegos={videojuegos}
                onEliminar={eliminarVideojuego}
              />
            }
          />
          <Route
            path="/nuevo"
            element={<FormularioVideojuego onGuardar={manejarGuardar} />}
          />
          <Route
            path="/editar"
            element={<FormularioVideojuego onGuardar={manejarGuardar} />}
          />
          <Route path="*" element={<PaginaNoEncontrada />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;