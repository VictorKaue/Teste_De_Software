-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS sismed;
USE sismed;

-- Tabela de pacientes
CREATE TABLE paciente (
  id_paciente INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  data_nascimento DATE NOT NULL,
  cpf VARCHAR(45) NOT NULL UNIQUE,
  endereco VARCHAR(100),
  telefone VARCHAR(12),
  senha VARCHAR(255) NOT NULL
);

-- Tabela de médicos
CREATE TABLE medico (
  id_medico INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  especialidade VARCHAR(50) NOT NULL,
  data_nascimento DATE NOT NULL,
  crm VARCHAR(10) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL
);

-- Tabela de consultas
CREATE TABLE consulta (
  id_consulta INT AUTO_INCREMENT PRIMARY KEY,
  data_horario DATETIME NOT NULL,
  motivo VARCHAR(50) NOT NULL,
  descricao TEXT NOT NULL,
  paciente_id INT NOT NULL,
  medico_id INT NOT NULL,
  FOREIGN KEY (paciente_id) REFERENCES paciente(id_paciente),
  FOREIGN KEY (medico_id) REFERENCES medico(id_medico)
);

-- Tabela de relação entre médicos e pacientes
CREATE TABLE medico_paciente (
  id_medico INT NOT NULL,
  id_paciente INT NOT NULL,
  PRIMARY KEY (id_medico, id_paciente),
  FOREIGN KEY (id_medico) REFERENCES medico(id_medico),
  FOREIGN KEY (id_paciente) REFERENCES paciente(id_paciente)
);
