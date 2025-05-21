// filepath: /Users/victorkaue/Teste_De_Software/Frontend/js/consulta.js

document.addEventListener('DOMContentLoaded', () => {
    carregarPacientes();
    carregarMedicos();
  });
  
  // Função para carregar pacientes
  async function carregarPacientes() {
    try {
      const response = await fetch('http://localhost:3000/paciente/listar');
      if (!response.ok) throw new Error('Erro ao carregar pacientes');
      const pacientes = await response.json();
  
      const selectPaciente = document.getElementById('paciente');
      pacientes.forEach(paciente => {
        const option = document.createElement('option');
        option.value = paciente.id;
        option.textContent = paciente.nome;
        selectPaciente.appendChild(option);
      });
    } catch (error) {
      console.error('Erro ao carregar pacientes:', error);
    }
  }
  
  // Função para carregar médicos
  async function carregarMedicos() {
    try {
      const response = await fetch('http://localhost:3000/medico/listar');
      if (!response.ok) throw new Error('Erro ao carregar médicos');
      const medicos = await response.json();
  
      const selectMedico = document.getElementById('medico');
      medicos.forEach(medico => {
        const option = document.createElement('option');
        option.value = medico.id;
        option.textContent = medico.nome;
        selectMedico.appendChild(option);
      });
    } catch (error) {
      console.error('Erro ao carregar médicos:', error);
    }
  }