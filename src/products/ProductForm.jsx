import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const ProductForm = () => {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
  });

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required("El nombre es obligatorio"),
    price: Yup.number().positive("El precio debe ser mayor a 0").required("El precio es obligatorio"),
  });

  const handleSubmit = (values) => {
    setProductData(values);
    // Aquí puedes agregar lógica para guardar el producto en estado o base de datos
    navigate("/productos");
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Crear Producto</h2>

      <Formik
        initialValues={productData}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="field">
            <label htmlFor="name">Nombre del Producto</label>
            <Field
              name="name"
              type="text"
              className="p-inputtext p-component"
            />
          </div>

          <div className="field">
            <label htmlFor="price">Precio</label>
            <Field
              name="price"
              type="number"
              className="p-inputtext p-component"
            />
          </div>

          <Button label="Guardar" icon="pi pi-check" type="submit" />
        </Form>
      </Formik>
    </div>
  );
};

export default ProductForm;

