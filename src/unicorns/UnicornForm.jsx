import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useNavigate, useParams } from "react-router-dom";
import { useUnicorns } from "../context/UnicornContext";

const UnicornForm = () => {
  const { createUnicorn, editUnicorn, unicorns } = useUnicorns();
  const { id } = useParams();  // Obtenemos el id de la URL
  const navigate = useNavigate();

  // Encontramos el unicornio a editar (si existe)
  const unicornToEdit = unicorns.find((u) => u.id === parseInt(id));  // Cambié _id por id

  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      colour: "",
      power: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Campo requerido"),
      age: Yup.number().min(1, "Edad debe ser mayor a 0").required("Campo requerido"),
      colour: Yup.string().required("Campo requerido"),
      power: Yup.string().required("Campo requerido"),
    }),
    onSubmit: async (values) => {
      if (id) {
        // Si estamos editando, actualizamos el unicornio
        await editUnicorn(id, values);
      } else {
        // Si estamos creando, agregamos el unicornio
        await createUnicorn(values);
      }
      navigate("/unicornios");
    },
    enableReinitialize: true, // Esto permite que los valores iniciales se actualicen cuando se cargue un unicornio a editar
  });

  // Si el unicornio existe, actualizamos los valores del formulario
  useEffect(() => {
    if (unicornToEdit) {
      formik.setValues(unicornToEdit);
    }
  }, [unicornToEdit]);

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">{id ? "Editar" : "Crear"} Unicornio</h2>
      <form onSubmit={formik.handleSubmit} className="grid gap-4 max-w-md">
        {/* Creamos los campos del formulario de forma dinámica */}
        {["name", "age", "colour", "power"].map((field) => (
          <span className="p-float-label" key={field}>
            <InputText
              id={field}
              name={field}
              type={field === "age" ? "number" : "text"}
              value={formik.values[field]}
              onChange={formik.handleChange}
              className={`w-full ${formik.touched[field] && formik.errors[field] ? "p-invalid" : ""}`}
            />
            <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            {formik.touched[field] && formik.errors[field] && (
              <small className="p-error">{formik.errors[field]}</small>
            )}
          </span>
        ))}
        <Button type="submit" label={id ? "Actualizar" : "Crear"} />
      </form>
    </div>
  );
};

export default UnicornForm;
