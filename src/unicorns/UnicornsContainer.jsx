import React, { useEffect, useState } from 'react';
import UnicornsView from './UnicornsView';

const API_URL = 'https://crudcrud.com/api/a05df5d15bc34d3db0588976d2dfaaff/unicorns ';

const UnicornsContainer = () => {
  const [unicorns, setUnicorns] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    colour: '',
    power: '', 
  });
  const [editingUnicorn, setEditingUnicorn] = useState(null);

  // GET - Leer unicornios
  const fetchUnicorns = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setUnicorns(data);
    } catch (err) {
      console.error('Error al obtener unicornios:', err);
    }
  };

  useEffect(() => {
    fetchUnicorns();
  }, []);

  // POST - Crear
  const handleCreate = async () => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormData({ name: '', age: '', colour: '', power: '' });
        fetchUnicorns();
      }
    } catch (err) {
      console.error('Error al crear unicornio:', err);
    }
  };

  // PUT - Actualizar
  const handleUpdate = async () => {
    if (!editingUnicorn) return;
    try {
      await fetch(`${API_URL}/${editingUnicorn._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          age: formData.age,
          colour: formData.colour,
          power: formData.power,
        }),
      });
      setEditingUnicorn(null);
      setFormData({ name: '', age: '', colour: '', power: '' });
      fetchUnicorns();
    } catch (err) {
      console.error('Error al actualizar unicornio:', err);
    }
  };

  // DELETE - Eliminar
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchUnicorns();
    } catch (err) {
      console.error('Error al eliminar unicornio:', err);
    }
  };

  // Iniciar edición
  const startEdit = (unicorn) => {
    setEditingUnicorn(unicorn);
    setFormData({
      name: unicorn.name || '',
      age: unicorn.age || '',
      colour: unicorn.colour || '',
      power: unicorn.power || '', // 🆕 Cargar poder también
    });
  };

  return (
    <UnicornsView
      unicorns={unicorns}
      formData={formData}
      setFormData={setFormData}
      handleCreate={handleCreate}
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
      editingUnicorn={editingUnicorn}
      startEdit={startEdit}
    />
  );
};

export default UnicornsContainer;
