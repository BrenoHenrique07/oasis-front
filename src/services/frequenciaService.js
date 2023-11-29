import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const frequenciaService = {

  async getFrequenciasByPacienteId(pacienteId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/frequencias/paciente/${pacienteId}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao obter frequências para o paciente com ID ${pacienteId}:`, error);
      throw error;
    }
  },
};

export default frequenciaService;
