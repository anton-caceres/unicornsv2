import React from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from 'react-router-dom';
import { products } from './productsData';

const ProductsView = () => {
  const navigate = useNavigate();

  const actionTemplate = (rowData) => (
    <Button
      label="Ver detalles"
      onClick={() => navigate(`/productos/${rowData.id}`)}
    />
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Lista de Productos</h2>
      <Button
        label="Crear Producto"
        icon="pi pi-plus"
        onClick={() => navigate("/productos/crear")}
        className="mb-4"
      />
      <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
        <Column field="name" header="Nombre" />
        <Column field="price" header="Precio" />
        <Column header="Acciones" body={actionTemplate} />
      </DataTable>
    </div>
  );
};

export default ProductsView;
