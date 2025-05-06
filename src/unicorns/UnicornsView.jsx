import React from "react";
import { useUnicorns } from "../context/UnicornContext";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

const UnicornsView = () => {
  const { unicorns, deleteUnicorn } = useUnicorns();
  const navigate = useNavigate();

  const actionTemplate = (rowData) => (
    <div className="flex gap-2">
      
      <Button icon="pi pi-pencil" label="Editar" onClick={() => navigate(`/unicornios/editar/${rowData.id}`)} />
      <Button icon="pi pi-trash" label="Eliminar" onClick={() => deleteUnicorn(rowData.id)} severity="danger" />
    </div>
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">🦄 Lista de Unicornios</h2>
      <Button label="Crear Unicornio" icon="pi pi-plus" onClick={() => navigate("/unicornios/crear")} className="mb-4" />
      <DataTable value={unicorns} tableStyle={{ minWidth: "50rem" }}>
        <Column field="name" header="Nombre" />
        <Column field="age" header="Edad" />
        <Column field="colour" header="Color" />
        <Column field="power" header="Poder" />
        <Column header="Acciones" body={actionTemplate} />
      </DataTable>
    </div>
  );
};

export default UnicornsView;
