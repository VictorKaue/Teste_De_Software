const request = require('supertest');
const express = require('express');

// Importa o router de médicos
const medicosRouter = require('../Backend/src/routes/medico');

// Mock do módulo de banco de dados
jest.mock('../Backend/src/config/db');
const db = require('../Backend/src/config/db');

describe('Rotas /medicos - CRUD', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/medicos', medicosRouter);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET /medicos - deve retornar lista de médicos', async () => {
    const fakeMedicos = [
      { id_medico: 1, nome: 'Dr. A', especialidade: 'Cardio', data_nascimento: '1970-01-01', crm: 'CRM1', usuario_id_usuario: 1 },
      { id_medico: 2, nome: 'Dra. B', especialidade: 'Neuro', data_nascimento: '1980-02-02', crm: 'CRM2', usuario_id_usuario: 2 }
    ];
    db.query.mockResolvedValue([fakeMedicos]);

    const res = await request(app).get('/medicos');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(fakeMedicos);
    expect(db.query).toHaveBeenCalledWith('SELECT * FROM medico');
  });

  test('POST /medicos - deve criar um novo médico', async () => {
    const newMedico = {
      nome: 'Dra. C',
      especialidade: 'Pediatria',
      data_nascimento: '1990-03-03',
      crm: 'CRM3',
      usuario_id_usuario: 3
    };
    db.query.mockResolvedValue([{ insertId: 3 }]);

    const res = await request(app)
      .post('/medicos')
      .send(newMedico);

    expect(res.status).toBe(201);
    expect(res.body).toEqual({ id_medico: 3 });
    expect(db.query).toHaveBeenCalledWith(
      'INSERT INTO medico (nome, especialidade, data_nascimento, crm, usuario_id_usuario) VALUES (?, ?, ?, ?, ?)',
      [newMedico.nome, newMedico.especialidade, newMedico.data_nascimento, newMedico.crm, newMedico.usuario_id_usuario]
    );
  });

  test('PUT /medicos/:id - deve atualizar um médico existente', async () => {
    const updateData = {
      nome: 'Dr. Atualizado',
      especialidade: 'Ortopedia',
      data_nascimento: '1985-04-04',
      crm: 'CRM4',
      usuario_id_usuario: 4
    };
    db.query.mockResolvedValue([{}]);

    const res = await request(app)
      .put('/medicos/1')
      .send(updateData);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ mensagem: 'Médico atualizado com sucesso!' });
    expect(db.query).toHaveBeenCalledWith(
      'UPDATE medico SET nome = ?, especialidade = ?, data_nascimento = ?, crm = ?, usuario_id_usuario = ? WHERE id_medico = ?',
      [updateData.nome, updateData.especialidade, updateData.data_nascimento, updateData.crm, updateData.usuario_id_usuario, '1']
    );
  });

  test('DELETE /medicos/:id - deve deletar um médico', async () => {
    db.query.mockResolvedValue([{}]);

    const res = await request(app).delete('/medicos/1');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ mensagem: 'Médico removido com sucesso!' });
    expect(db.query).toHaveBeenCalledWith('DELETE FROM medico WHERE id_medico = ?', ['1']);
  });
});
