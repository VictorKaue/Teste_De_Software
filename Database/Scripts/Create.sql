-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS sismed;
USE sismed;

-- Tabela de usuários
CREATE TABLE usuario (
  id_usuario INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  senha VARCHAR(255) NOT NULL,
  tipo_usuario VARCHAR(50) NOT NULL
);

-- Tabela de médicos
CREATE TABLE medico (
  id_medico INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  especialidade VARCHAR(50) NOT NULL,
  data_nascimento DATE NOT NULL,
  crm VARCHAR(10) NOT NULL UNIQUE,
  usuario_id_usuario INT NOT NULL,
  FOREIGN KEY (usuario_id_usuario) REFERENCES usuario(id_usuario)
);

-- Tabela de relatórios
CREATE TABLE relatorio (
  id_relatorio INT AUTO_INCREMENT PRIMARY KEY,
  descricao TEXT NOT NULL
);

-- Tabela de consultas
CREATE TABLE consulta (
  id_consulta INT AUTO_INCREMENT PRIMARY KEY,
  data_horario DATETIME NOT NULL,
  motivo VARCHAR(50) NOT NULL,
  relatorio_id INT NOT NULL,
  FOREIGN KEY (relatorio_id) REFERENCES relatorio(id_relatorio)
);

-- Tabela de pacientes
CREATE TABLE paciente (
  id_paciente INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  data_nascimento DATE NOT NULL,
  cpf VARCHAR(45) NOT NULL UNIQUE,
  endereco VARCHAR(100),
  telefone VARCHAR(12),
  consulta_id INT NOT NULL,
  usuario_id INT NOT NULL,
  FOREIGN KEY (consulta_id) REFERENCES consulta(id_consulta),
  FOREIGN KEY (usuario_id) REFERENCES usuario(id_usuario)
);

-- Tabela de relação entre médicos e pacientes
CREATE TABLE medico_paciente (
  id_medico INT NOT NULL,
  id_paciente INT NOT NULL,
  PRIMARY KEY (id_medico, id_paciente),
  FOREIGN KEY (id_medico) REFERENCES medico(id_medico),
  FOREIGN KEY (id_paciente) REFERENCES paciente(id_paciente)
);