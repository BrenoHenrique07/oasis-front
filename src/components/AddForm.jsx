// components/AddForm.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddForm = ({ newPaciente, onClose, onSave }) => {
  const [editedPaciente, setEditedPaciente] = useState({ ...newPaciente });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPaciente({ ...editedPaciente, [name]: value });
  };

  const handleDateChange = (date) => {
    setEditedPaciente({ ...editedPaciente, dataNascimento: date });
  };

  const handleSave = () => {
    onSave(editedPaciente);
    onClose();
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Adicionar Paciente</h2>
      <div className="mb-4">
        <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
          Nome
        </label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={editedPaciente.nome}
          onChange={handleInputChange}
          className="mt-1 p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="sobrenome" className="block text-sm font-medium text-gray-700">
          Sobrenome
        </label>
        <input
          type="text"
          id="sobrenome"
          name="sobrenome"
          value={editedPaciente.sobrenome}
          onChange={handleInputChange}
          className="mt-1 p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">
          CPF
        </label>
        <input
          type="text"
          id="cpf"
          name="cpf"
          value={editedPaciente.cpf}
          onChange={handleInputChange}
          className="mt-1 p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="dataNascimento" className="block text-sm font-medium text-gray-700">
          Data de Nascimento
        </label>
        <DatePicker
          selected={editedPaciente.dataNascimento}
          onChange={handleDateChange}
          className="mt-1 p-2 border rounded"
        />
      </div>
      <button onClick={handleSave} className="bg-green-500 text-white p-2 rounded">
        Adicionar
      </button>
      <button onClick={onClose} className="ml-2 text-gray-600">
        Cancelar
      </button>
    </div>
  );
};

export default AddForm;
