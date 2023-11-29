import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'; //

const pacienteService = {
  async getAllPacientes() {
    try {
      const response = await axios.get(`${API_BASE_URL}/pacientes?page=0&size=20`);
      return response.data;
    } catch (error) {
      console.error('Erro ao obter dados dos pacientes:', error);
      throw error;
    }
  },
   async deletePaciente(id) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/pacientes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao excluir paciente com ID ${id}:`, error);
      throw error;
    }
  },
  async searchPacientesByCpf(cpf) {
    try {
      const response = await axios.get(`${API_BASE_URL}/pacientes/cpf/${cpf}`);
      return response.data;
    } catch (error) {
      console.log('Erro ao realizar a pesquisa por CPF:', error);
      throw error;
    }
  },
  async searchPacientesByName(nome) {
    try {
      const response = await axios.get(`${API_BASE_URL}/pacientes?page=0&size=20&nome=${nome}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao realizar a pesquisa por nome:', error);
      throw error;
    }
  },
  async searchPacientesById(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/pacientes/id/${id}`);
      return response.data;
    } catch (error) {
      console.log('Erro ao realizar a pesquisa por ID:', error);
      throw error;
    }
  },
  async updatePaciente(id, pacienteData) {
    try {
      // Converta a data para o formato ISO 8601
      pacienteData.dataNascimento = new Date(pacienteData.dataNascimento - 1).toISOString().split('T')[0];
      
      const response = await axios.put(`${API_BASE_URL}/pacientes/${id}`, pacienteData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(`Erro ao atualizar paciente com ID ${id}:`, error);
      throw error;
    }
  },
  async addPaciente(newPaciente) {
    try {
      // Converta a data para o formato ISO 8601
      newPaciente.dataNascimento = new Date(newPaciente.dataNascimento - 1).toISOString().split('T')[0];
  
      const response = await axios.post(`${API_BASE_URL}/pacientes`, newPaciente);
      return response.data;
    } catch (error) {
      console.error('Erro ao adicionar novo paciente:', error);
      throw error;
    }
  }
};

export default pacienteService;
