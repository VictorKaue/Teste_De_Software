import axios from 'axios';

const API_URL = 'http://localhost:3000/pacientes';

export const getPacientes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar pacientes:', error);
    throw error;
  }
};

export const createPaciente = async (paciente) => {
  try {
    const response = await axios.post(API_URL, paciente);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar paciente:', error);
    throw error;
  }
};

export const updatePaciente = async (id, paciente) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, paciente);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar paciente:', error);
    throw error;
  }
};

export const deletePaciente = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar paciente:', error);
    throw error;
  }
};