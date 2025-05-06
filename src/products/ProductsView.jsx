import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const ProductsView = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Cargar productos desde localStorage
  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(savedProducts);
  }, []);

  // Eliminar un producto
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
    if (confirmDelete) {
      const updated = products.filter((p) => p.id !== id);
      setProducts(updated);
      // Guardamos los productos actualizados en localStorage
      localStorage.setItem("products", JSON.stringify(updated));
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Lista de Productos</h2>
      <Button label="Agregar Producto" icon="pi pi-plus" onClick={() => navigate("/productos/crear")} className="mb-3" />
      {products.length === 0 ? (
        <p>No hay productos aún.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr>
              <th className="border p-2">Nombre</th>
              <th className="border p-2">Precio</th>
              <th className="border p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">{product.price}</td>
                <td className="border p-2">
                  <Button
                    label="Eliminar"
                    icon="pi pi-trash"
                    severity="danger"
                    onClick={() => handleDelete(product.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductsView;

