import axios from 'axios';

const API_URL = 'http://localhost:3000/consultas';

export const getConsultas = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar consultas:', error);
    throw error;
  }
};

export const createConsulta = async (consulta) => {
  try {
    const response = await axios.post(API_URL, consulta);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar consulta:', error);
    throw error;
  }
};

export const updateConsulta = async (id, consulta) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, consulta);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar consulta:', error);
    throw error;
  }
};

export const deleteConsulta = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar consulta:', error);
    throw error;
  }
};