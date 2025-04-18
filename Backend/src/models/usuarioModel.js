const db = require('../config/db');

// Lista todos os usuários
const getAllUsers = callback => {
  const query = 'SELECT * FROM usuario';
  db.query(query, callback);
};

// Busca um usuário por ID
const getUserById = (id, callback) => {
  const query = 'SELECT * FROM usuario WHERE id_usuario = ?';
  db.query(query, [id], callback);
};

// Cria um novo usuário
const createUser = (email, senha, tipo_usuario, callback) => {
  const query = 'INSERT INTO usuario (email, senha, tipo_usuario) VALUES (?, ?, ?)';
  db.query(query, [email, senha, tipo_usuario], callback);
};

module.exports = { getAllUsers, getUserById, createUser };