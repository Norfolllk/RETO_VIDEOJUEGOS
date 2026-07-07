import { useState } from "react";
import "./App.css";
import TablaVideojuegos from "./components/TablaVideojuegos";
import videojuegosData from "./data/videojuegos";

function App() {
  const [videojuegos] = useState(videojuegosData);

  return (
    <div className="app">
      <TablaVideojuegos videojuegos={videojuegos} />
    </div>
  );
}

export default App;