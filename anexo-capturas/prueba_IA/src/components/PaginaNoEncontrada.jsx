import { Link } from 'react-router-dom';

function PaginaNoEncontrada() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#e5e7eb' }}>
      <h1 style={{ fontSize: '3rem', margin: 0 }}>404</h1>
      <h2>Página no encontrada</h2>
      <p>La ruta que buscas no existe.</p>
      <Link to="/" style={{ color: '#c7d2fe' }}>Volver al inventario</Link>
    </div>
  );
}

export default PaginaNoEncontrada;
