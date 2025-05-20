import axios from 'axios';

const API_URL = 'http://localhost:3000/medicos';

export const getMedicos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar médicos:', error);
    throw error;
  }
};

export const createMedico = async (medico) => {
  try {
    const response = await axios.post(API_URL, medico);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar médico:', error);
    throw error;
  }
};

export const updateMedico = async (id, medico) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, medico);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar médico:', error);
    throw error;
  }
};

export const deleteMedico = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar médico:', error);
    throw error;
  }
};