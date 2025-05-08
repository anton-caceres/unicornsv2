import React from "react";
import { useUnicorns } from "../context/UnicornContext";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const UnicornsView = () => {
  const { unicorns, deleteUnicorn } = useUnicorns();
  const navigate = useNavigate();

  const [estadoSeleccionado, setEstadoSeleccionado] = React.useState(null);

  const estadoOptions = [
    { label: "Activo", value: "Activo" },
    { label: "Inactivo", value: "Inactivo" },
  ];

  // Filtrar la lista manualmente
  const unicorniosFiltrados = estadoSeleccionado
    ? unicorns.filter((u) => u.estado === estadoSeleccionado)
    : unicorns;

  const actionTemplate = (rowData) => (
    <div className="flex gap-2">
      <Button
        icon="pi pi-pencil"
        label="Editar"
        onClick={() => navigate(`/unicornios/editar/${rowData.id}`)}
      />
      <Button
        icon="pi pi-trash"
        label="Eliminar"
        onClick={() => deleteUnicorn(rowData.id)}
        severity="danger"
      />
    </div>
  );

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Lista de Unicornios", 14, 22);

    const tableColumn = ["Nombre", "Edad", "Color", "Poder", "Estado"];
    const tableRows = unicorns.map(({ name, age, colour, power, estado }) => [
      name,
      age,
      colour,
      power,
      estado,
    ]);

    autoTable(doc, {
      startY: 30,
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [63, 81, 181] },
    });

    doc.save("unicornios.pdf");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">🦄 Lista de Unicornios</h2>

      <div className="flex flex-wrap gap-2 mb-4 items-center">
        <Dropdown
          value={estadoSeleccionado}
          options={estadoOptions}
          onChange={(e) => setEstadoSeleccionado(e.value)}
          placeholder="Seleccionar Estado"
          className="w-52"
          showClear
        />
        <Button
          label="Crear Unicornio"
          icon="pi pi-plus"
          onClick={() => navigate("/unicornios/crear")}
        />
        <Button
          label="Exportar PDF"
          icon="pi pi-file-pdf"
          onClick={exportToPDF}
          severity="secondary"
        />
      </div>

      <DataTable
        value={unicorniosFiltrados}
        tableStyle={{ minWidth: "50rem" }}
        paginator
        rows={10}
      >
        <Column field="name" header="Nombre" sortable />
        <Column field="age" header="Edad" sortable />
        <Column field="colour" header="Color" sortable />
        <Column field="power" header="Poder" sortable />
        <Column field="estado" header="Estado" sortable />
        <Column header="Acciones" body={actionTemplate} />
      </DataTable>
    </div>
  );
};

export default UnicornsView;
