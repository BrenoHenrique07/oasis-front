import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from '../components/Header';
import Table from '../components/Table';
import EditForm from '../components/EditForm';
import AddForm from '../components/AddForm';
import pacienteService from '../services/pacienteService';

function Paciente() {
   const columns = [
    { key: 'id', label: 'ID' },
    { key: 'nome', label: 'Nome' },
    { key: 'sobrenome', label: 'Sobrenome' },
    { key: 'cpf', label: 'CPF' },
    { key: 'dataNascimento', label: 'data Nascimento' },
    { key: 'actions', label: '' },
    { key: 'editar', label: '' },
    { key: 'excluir', label: '' },
    { key: 'verFrequencias', label: '' },
  ];

  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await pacienteService.getAllPacientes();
        setPacientes(data.data);
      } catch (error) {
        console.log('Erro ao carregar dados:', error);
      }
    }
    fetchData();
  }, [])

  const [searchNome, setSearchNome] = useState('');
  const [searchCpf, setSearchCpf] = useState('');
  const [searchId, setSearchId] = useState('');

  const handleSearch = async () => {
    try {
      const resultsNome = searchNome !== '' ? await pacienteService.searchPacientesByName(searchNome) : [];
      const resultsCpf = searchCpf !== '' ? await pacienteService.searchPacientesByCpf(searchCpf) : [];
      const resultsId = searchId !== '' ? await pacienteService.searchPacientesById(searchId) : [];

      if(resultsNome != '') {
        setPacientes(resultsNome.data);
      }

      if(resultsCpf != '') {
        let data = [];
        data.push(resultsCpf)
        setPacientes(data);
      }

      if(resultsId != '') {
        let data = [];
        data.push(resultsId)
        setPacientes(data);
      }
      
      toast.success(`Paciente pesquisado com sucesso.`);
    } catch (error) {
      console.error('Erro ao realizar a pesquisa de pacientes:', error);
      toast.error('Erro ao realizar a pesquisa de pacientes');
    }
  };

  const [showAddForm, setShowAddForm] = useState(false);
  const [newPaciente, setNewPaciente] = useState({
    id: '',
    nome: '',
    sobrenome: '',
    cpf: '',
    dataNascimento: new Date(),
  });

  const handleAdd = () => {
    setShowAddForm(true);
  };

  const handleSaveAdd = async (newPaciente) => {
    try {
      // Lógica para salvar o novo paciente
      const responseNewPaciente = await pacienteService.addPaciente(newPaciente);

      // Atualiza a lista de pacientes após a adição
      const updatedPacientes = [...pacientes, responseNewPaciente];
      setPacientes(updatedPacientes);

      // Limpa os dados do novo paciente e fecha o formulário
      setShowAddForm(false);

      toast.success('Novo paciente adicionado com sucesso.');
    } catch (error) {
      console.error('Erro ao adicionar novo paciente:', error);
      toast.error('Erro ao adicionar novo paciente.');
    }
  };

  const [showEditForm, setShowEditForm] = useState(false);
  const [editingPaciente, setEditingPaciente] = useState(null);

  const handleEdit = (id) => {
    // Encontre o paciente correspondente pelo ID
    const pacienteParaEditar = pacientes.find((paciente) => paciente.id === id);
  
    // Defina o paciente para edição e exiba o formulário
    setEditingPaciente(pacienteParaEditar);
    setShowEditForm(true);
  };

  const handleSaveEdit = async (editedPaciente) => {
    try {
      // Lógica para salvar as alterações no paciente
      await pacienteService.updatePaciente(editedPaciente.id, editedPaciente);
  
      // Atualiza a lista de pacientes após a edição
      const updatedPacientes = pacientes.map((paciente) =>
        paciente.id === editedPaciente.id ? editedPaciente : paciente
      );
      
      setPacientes(updatedPacientes);
      toast.success(`Paciente com ID ${editedPaciente.id} editado com sucesso.`);

    } catch (error) {
      console.error(`Erro ao editar paciente com ID ${editedPaciente.id}:`, error);
      toast.error(`Erro ao editar paciente com ID ${editedPaciente.id}.`);
    }
  };

  const handleCloseEditForm = () => {
    setShowEditForm(false);
    setEditingPaciente(null);
  };

  const handleDelete = async (id) => {
    try {
      // Chama a função de deletar paciente
      const response = await pacienteService.deletePaciente(id);

      // Atualiza a lista de pacientes após a exclusão
      const updatedPacientes = pacientes.filter((paciente) => paciente.id !== id);
      setPacientes(updatedPacientes);

      toast.success(`Paciente com ID ${id} excluído com sucesso.`);
    } catch (error) {
      console.error(`Erro ao excluir paciente com ID ${id}:`, error);
      toast.error(`Erro ao excluir paciente com ID ${id}. Verifique se não existem frequências vinculudas`);
    }
  };

  return (
    <div>
      <Header />

      {/* Campos de pesquisa */}
      <div className="p-10 my-auto flex justify-center">
        <input
          type="text"
          placeholder="Pesquisar por nome"
          value={searchNome}
          onChange={(e) => setSearchNome(e.target.value)}
          className="p-2 mr-2 border rounded"
        />
        <input
          type="text"
          placeholder="Pesquisar por CPF"
          value={searchCpf}
          onChange={(e) => setSearchCpf(e.target.value)}
          className="p-2 mr-2 border rounded"
        />
        <input
          type="text"
          placeholder="Pesquisar por ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="p-2 mr-2 border rounded"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded">
          Pesquisar
        </button>
      </div>

      {/* Tabela de pacientes */}
      <div className="p-10 my-auto flex justify-center">
        <Table columns={columns} data={pacientes} onEdit={handleEdit} onDelete={handleDelete} />
      </div>

      <div className="p-10 my-auto flex justify-center">
        <button onClick={handleAdd} className="bg-green-500 text-white p-2 rounded">
          Adicionar Paciente
        </button>
      </div>

      {showEditForm && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          {/* Passe apenas o paciente editado para o EditForm */}
          <EditForm paciente={editingPaciente} onClose={handleCloseEditForm} onSave={handleSaveEdit} />
        </div>
      )}
      {showAddForm && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <AddForm newPaciente={newPaciente} onClose={() => setShowAddForm(false)} onSave={handleSaveAdd} />
        </div>
      )}
    </div>
  );
}

export default Paciente;
