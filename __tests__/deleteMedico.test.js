const request = require('supertest');
const app = require('../Backend/src/server'); // Ajuste o caminho para o seu arquivo server.js

describe('DELETE /medico/:id', () => {
  it('Deve deletar um médico existente e retornar status 200', async () => {
    const medicoId = 2; // Substitua pelo ID de um médico existente no banco de dados para o teste

    const response = await request(app).delete(`/medico/${medicoId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('mensagem', 'Médico removido com sucesso!');
  });
});