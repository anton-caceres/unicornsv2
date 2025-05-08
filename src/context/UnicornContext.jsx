import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UnicornContext = createContext();

export const useUnicorns = () => useContext(UnicornContext);

export const UnicornProvider = ({ children }) => {
  const [unicorns, setUnicorns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUnicorns();
  }, []);

  const getUnicorns = () => {
    const stored = JSON.parse(localStorage.getItem("unicorns")) || [];
    setUnicorns(stored);
  };

  const createUnicorn = (unicorn) => {
    const newUnicorn = {
      ...unicorn,
      id: Date.now(),
      estado: unicorn.estado || "Activo", // Si no se envía, por defecto es "Activo"
    };
    const updated = [...unicorns, newUnicorn];
    setUnicorns(updated);
    localStorage.setItem("unicorns", JSON.stringify(updated));
    navigate("/unicornios");
  };

  const editUnicorn = (id, updatedData) => {
    const updated = unicorns.map((u) =>
      u.id === id ? { ...u, ...updatedData } : u
    );
    setUnicorns(updated);
    localStorage.setItem("unicorns", JSON.stringify(updated));
    navigate("/unicornios");
  };

  const deleteUnicorn = (id) => {
    const updated = unicorns.filter((u) => u.id !== id);
    setUnicorns(updated);
    localStorage.setItem("unicorns", JSON.stringify(updated));
  };

  return (
    <UnicornContext.Provider
      value={{
        unicorns,
        setUnicorns,
        getUnicorns,
        createUnicorn,
        editUnicorn,
        deleteUnicorn,
      }}
    >
      {children}
    </UnicornContext.Provider>
  );
};
