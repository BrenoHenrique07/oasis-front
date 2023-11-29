import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Header from '../components/Header';
import frequenciaService from '../services/frequenciaService';
import CustomFrequenciasTable from '../components/CustomFrequenciasTable';

const Frequencias = () => {
  const { pacienteId } = useParams();
  const [frequencias, setFrequencias] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await frequenciaService.getFrequenciasByPacienteId(pacienteId);
        setFrequencias(data.data);
      } catch (error) {
        console.log('Erro ao carregar frequências:', error);
      }
    }
    fetchData();
  }, [pacienteId]);

  const columns = [
    { key: 'id', label: 'id' },
    { key: 'nome', label: 'nome' },
    { key: 'data', label: 'data' },
    { key: 'descricao', label: 'Descrição' },
  ];

  const handleExportCSV = () => {
    // Criação do conteúdo do arquivo CSV
    const csvContent = "data:text/csv;charset=utf-8," + columns.map(column => column.label).join(",") + "\n";
    const csvRows = frequencias.map(item => item.join(","));
    const csvData = csvContent + csvRows.join("\n");

    // Criação de um link para download
    const encodedUri = encodeURI(csvData);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "frequencias.csv");
    
    // Simula um clique no link para iniciar o download
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div>
      <Header />
      <div className="p-10 my-auto flex justify-center">
        <CustomFrequenciasTable columns={columns} data={frequencias} />
      </div>
      <div className="p-10 my-auto flex justify-center">
        <button onClick={handleExportCSV} className="bg-green-500 text-white p-2 rounded">
          Exportar CSV
        </button>
      </div>
    </div>
  );
};

export default Frequencias;
