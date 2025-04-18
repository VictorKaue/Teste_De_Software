const db = require('../config/db.js');

// Lista todos os pacientes (READ)
const getPacientes = (req, res) => {
  const query = 'SELECT * FROM paciente';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao consultar pacientes' });
    } else {
      res.status(200).json(results);
    }
  });
};

// Busca um paciente por ID (READ)
const getPacienteById = (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM paciente WHERE id_paciente = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao consultar paciente' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Paciente não encontrado' });
    } else {
      res.status(200).json(results[0]);
    }
  });
};

// Cadastra um paciente e cria o usuário correspondente (CREATE)
const createPaciente = (req, res) => {
  const { email, senha, nome, data_nascimento, cpf, endereco, telefone } = req.body;

  // Inicia uma transação
  db.beginTransaction(err => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao iniciar transação' });
    }

    // Insere o usuário com tipo "paciente"
    const userQuery = 'INSERT INTO usuario (email, senha, tipo_usuario) VALUES (?, ?, ?)';
    db.query(userQuery, [email, senha, 'paciente'], (err, userResults) => {
      if (err) {
        return db.rollback(() => {
          res.status(500).json({ error: 'Erro ao cadastrar usuário' });
        });
      }

      const usuarioId = userResults.insertId; // ID do usuário recém-criado

      // Insere o paciente vinculado ao usuário
      const pacienteQuery = 'INSERT INTO paciente (nome, data_nascimento, cpf, endereco, telefone, usuario_id) VALUES (?, ?, ?, ?, ?, ?)';
      db.query(pacienteQuery, [nome, data_nascimento, cpf, endereco, telefone, usuarioId], (err, pacienteResults) => {
        if (err) {
          return db.rollback(() => {
            res.status(500).json({ error: 'Erro ao cadastrar paciente' });
          });
        }

        // Confirma a transação
        db.commit(err => {
          if (err) {
            return db.rollback(() => {
              res.status(500).json({ error: 'Erro ao confirmar transação' });
            });
          }

          res.status(201).json({
            message: 'Paciente e usuário cadastrados com sucesso!',
            pacienteId: pacienteResults.insertId,
            usuarioId: usuarioId,
          });
        });
      });
    });
  });
};

// Cria um usuário (CREATE)
const createUsuario = (req, res) => {
  const { email, senha, tipo_usuario } = req.body;

  const query = 'INSERT INTO usuario (email, senha, tipo_usuario) VALUES (?, ?, ?)';
  db.query(query, [email, senha, tipo_usuario], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao criar usuário.' });
    } else {
      res.status(201).json({ message: 'Usuário criado com sucesso!', usuarioId: results.insertId });
    }
  });
};

module.exports = {createUsuario, getPacientes, getPacienteById, createPaciente};