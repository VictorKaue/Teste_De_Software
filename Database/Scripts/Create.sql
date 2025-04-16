CREATE DATABASE sismed;
USE sismed;

CREATE TABLE medico (
    crm INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    especialidade VARCHAR(50),
    data_nascimento DATE
);

CREATE TABLE paciente (
    cpf VARCHAR(14) PRIMARY KEY NOT NULL,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(15),
    data_nascimento DATE NOT NULL,
    id_medico INT NOT NULL,
    FOREIGN KEY (id_medico) REFERENCES medico(crm) ON DELETE CASCADE
);

CREATE TABLE relatorio (
    id_relatorio INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome_relatorio VARCHAR(50) NOT NULL,
    data_criacao DATE NOT NULL,
    id_medico INT,
    id_paciente VARCHAR(14),
    FOREIGN KEY (id_medico) REFERENCES medico(crm) ON DELETE CASCADE,
    FOREIGN KEY (id_paciente) REFERENCES paciente(cpf) ON DELETE CASCADE
);
