import axios from 'axios';

document.getElementById('formLoginPaciente').addEventListener('submit', async (event) => {
  event.preventDefault(); // Evita o recarregamento da página

  // Captura os valores do formulário
  const cpf = document.getElementById('cpf').value;
  const senha = document.getElementById('senha').value;

  try {
    // Faz a requisição para a API de login
    const response = await axios.post('http://localhost:3000/pacientes/login', {
      cpf,
      senha,
    });

    if (response.status === 200) {
      const data = response.data;
      alert(data.mensagem); // Exibe mensagem de sucesso
      console.log('Paciente logado:', data.paciente);
      // Redirecionar para outra página, se necessário
      // window.location.href = 'pagina_principal.html';
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      alert('CPF ou senha incorretos!');
    } else {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login. Tente novamente mais tarde.');
    }
  }
});