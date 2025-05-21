import axios from 'axios';

document.getElementById('formLoginMedico').addEventListener('submit', async (event) => {
  event.preventDefault(); // Evita o recarregamento da página

  // Captura os valores do formulário
  const crm = document.querySelector('input[placeholder="CRM"]').value;
  const senha = document.querySelector('input[placeholder="Senha"]').value;

  try {
    // Faz a requisição para a API de login
    const response = await axios.post('http://localhost:3000/medicos/login', {
      crm,
      senha,
    });

    if (response.status === 200) {
      const data = response.data;
      alert(data.mensagem); // Exibe mensagem de sucesso
      console.log('Médico logado:', data.medico);
      // Redirecionar para outra página, se necessário
      // window.location.href = 'pagina_principal_medico.html';
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      alert('CRM ou senha incorretos!');
    } else {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login. Tente novamente mais tarde.');
    }
  }
});