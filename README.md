TALLER 2: EJERCICIO DE LISTAS EN REACT

Opción 2 seleccionada: Ejercicio de listas ya desarrollado, subido, enviado y revisado en Krakedev.

Descripción: Aplicación en React llamada RetoVideojuegos: un inventario de videojuegos que permite listar, agregar, editar y eliminar títulos. Los datos se guardan en `localStorage` para persistir entre recargas del navegador.

Funcionalidad principal:
- Tabla con el listado completo de videojuegos (título, género, plataforma, año, precio, estado, progreso de descarga, fecha de lanzamiento, sinopsis y calificación).
- Formulario de creación/edición con validaciones (campos obligatorios, longitud de sinopsis, rango de calificación, fecha no futura, precio válido).
- Notificación tipo *toast* al agregar, editar o eliminar un juego.
- Ruteo con `react-router-dom` (`/` inventario, `/nuevo` y `/editar` formulario, ruta `*` página 404).

Cómo se construye la lista:
El listado se renderiza en `src/components/TablaVideojuegos.jsx` a partir del arreglo `videojuegos` que vive en el estado de `App.jsx`. Se recorre con `videojuegos.map((juego) => ...)` generando una fila `<tr>` por cada elemento, usando `juego.id` como `key`. El estado inicial se carga desde `localStorage` (o desde `src/data/videojuegos.js` si no hay datos guardados), y cada operación de agregar/editar/eliminar actualiza ese estado con `setVideojuegos`, lo que vuelve a renderizar la lista automáticamente.

Correcciones realizadas tras la revisión en Krakedev:
- Se corrigió el orden de las columnas en `TablaVideojuegos.jsx`: las celdas del cuerpo de la tabla no coincidían con el orden del encabezado (`<thead>`), por lo que "Calificación" y "Sinopsis" aparecían desalineadas.
- Se reemplazaron dos etiquetas `<th>` usadas incorrectamente dentro del `<tbody>` por `<td>`.
- La columna "Lanzamiento" ahora muestra la fecha completa (`fechaLanzamiento`) en lugar de repetir el año, con un valor de respaldo (`—`) para los registros semilla que no la tienen.

Instalación y ejecución local:
1. Clonar el repositorio
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo

2. Instalar dependencias
npm install

3. Ejecutar en modo desarrollo
npm run dev
La aplicación queda disponible en `http://localhost:5173` (puerto por defecto de Vite).

Estudiante:
- Nombre: GAROFALO CECATI FREDDY ALEXANDER
- Observaciones: Completado según lo solicitado en el taller 2 del ejercicio de listas en React
