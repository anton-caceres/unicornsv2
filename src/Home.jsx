import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <h1>Bienvenidos al mundo de unicornios </h1>
      <p>Selecciona una opción para empezar:</p>

      {/* Contenedor de opciones */}
      <div className="options-container">
        <div className="option-card" onClick={() => navigate("/unicornios")}>
          <button>Unicornios</button>
        </div>

        <div className="option-card" onClick={() => navigate("/productos")}>
          
          <button>Productos</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
