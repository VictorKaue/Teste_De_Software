document.getElementById('btnCadastrarMedico').addEventListener('click', async () => {
  // Captura os valores do formulário
  const nome = document.getElementById('nome').value;
  const crm = document.getElementById('crm').value;
  const especialidade = document.getElementById('especialidade').value;
  const nascimento = document.getElementById('nascimento').value;
  const senha = document.getElementById('senha').value;

  // Validação básica
  if (!nome || !crm || !especialidade || !nascimento || !senha) {
    alert('Por favor, preencha todos os campos!');
    return;
  }

  try {
    // Faz a requisição para a API
    const response = await fetch('http://localhost:3000/medico/cadastrar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome,
        crm,
        especialidade,
        nascimento,
        senha,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      alert('Médico cadastrado com sucesso!');
      console.log('Resposta da API:', data);
    } else {
      const errorData = await response.json();
      alert(`Erro ao cadastrar médico: ${errorData.mensagem}`);
    }
  } catch (error) {
    console.error('Erro ao chamar a API:', error);
    alert('Erro ao cadastrar médico. Tente novamente mais tarde.');
  }
});