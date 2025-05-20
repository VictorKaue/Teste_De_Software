import { getMedicos, createMedico, updateMedico, deleteMedico } from './api/medicoApi.js';
import { getPacientes, createPaciente, updatePaciente, deletePaciente } from './api/pacienteApi.js';
import { getConsultas, createConsulta, updateConsulta, deleteConsulta } from './api/consultaApi.js';

// Função para listar médicos e exibir no console
const listarMedicos = async () => {
  try {
    const medicos = await getMedicos();
    console.log('Lista de médicos:', medicos);
    alert('Lista de médicos carregada no console!');
  } catch (error) {
    console.error('Erro ao listar médicos:', error);
    alert('Erro ao listar médicos!');
  }
};

// Função para cadastrar um novo médico
const cadastrarMedico = async () => {
  const nome = document.querySelector('#medico-nome').value;
  const especialidade = document.querySelector('#medico-especialidade').value;
  const dataNascimento = document.querySelector('#medico-data-nascimento').value;
  const crm = document.querySelector('#medico-crm').value;

  const novoMedico = { nome, especialidade, data_nascimento: dataNascimento, crm };

  try {
    const medicoCriado = await createMedico(novoMedico);
    console.log('Médico criado:', medicoCriado);
    alert('Médico cadastrado com sucesso!');
  } catch (error) {
    console.error('Erro ao cadastrar médico:', error);
    alert('Erro ao cadastrar médico!');
  }
};

// Função para cadastrar um novo paciente
const cadastrarPaciente = async () => {
  const nome = document.querySelector('#paciente-nome').value;
  const dataNascimento = document.querySelector('#paciente-data-nascimento').value;
  const cpf = document.querySelector('#paciente-cpf').value;
  const telefone = document.querySelector('#paciente-telefone').value;
  const endereco = document.querySelector('#paciente-endereco').value;

  const novoPaciente = { nome, data_nascimento: dataNascimento, cpf, telefone, endereco };

  try {
    const pacienteCriado = await createPaciente(novoPaciente);
    console.log('Paciente criado:', pacienteCriado);
    alert('Paciente cadastrado com sucesso!');
  } catch (error) {
    console.error('Erro ao cadastrar paciente:', error);
    alert('Erro ao cadastrar paciente!');
  }
};

// Função para atualizar uma consulta
const atualizarConsulta = async () => {
  const consultaId = document.querySelector('#consulta-id').value;
  const dataHora = document.querySelector('#consulta-data-hora').value;
  const pacienteId = document.querySelector('#consulta-paciente-id').value;
  const medicoId = document.querySelector('#consulta-medico-id').value;

  const consultaAtualizada = { data_hora: dataHora, paciente_id_paciente: pacienteId, medico_id_medico: medicoId };

  try {
    const resultado = await updateConsulta(consultaId, consultaAtualizada);
    console.log('Consulta atualizada:', resultado);
    alert('Consulta atualizada com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar consulta:', error);
    alert('Erro ao atualizar consulta!');
  }
};

// Adicionar eventos aos botões
document.querySelector('#btn-listar-medicos').addEventListener('click', listarMedicos);
document.querySelector('#btn-cadastrar-medico').addEventListener('click', cadastrarMedico);
document.querySelector('#btn-cadastrar-paciente').addEventListener('click', cadastrarPaciente);
document.querySelector('#btn-atualizar-consulta').addEventListener('click', atualizarConsulta);