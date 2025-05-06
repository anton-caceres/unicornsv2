import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UnicornProvider } from "./context/UnicornContext";
import UnicornRoutes from "./unicorns";  // Rutas de Unicornios
import ProductRoutes from "./products";  // Rutas de Productos
import Home from "./Home";  // Importa el componente Home
import './index.css'; // Importa los estilos globales
import './App.css';   // Importa los estilos específicos de los componentes

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta de inicio con enlaces a Unicornios y Productos */}
        <Route path="/" element={<Home />} /> 

        {/* Rutas de Unicornios */}
        <Route
          path="/unicornios/*"
          element={
            <UnicornProvider>
              <UnicornRoutes />
            </UnicornProvider>
          }
        />
        
        {/* Rutas de Productos */}
        <Route path="/productos/*" element={<ProductRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
