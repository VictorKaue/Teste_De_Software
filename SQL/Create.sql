CREATE DATABASE sismed;
USE sismed;

CREATE TABLE medico(
    crm VARCHAR(20) PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome VARCHAR(30) NOT NULL,
    data_nascimento DATE
);

CREATE TABLE paciente(
	cpf INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    dataNascimento DATE NOT NULL,
    id_medico VARCHAR(20) NOT NULL,
    FOREIGN KEY (id_medico) REFERENCES medico(crm)
);

CREATE TABLE relatorio(
    id_relatorio INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome_relatorio VARCHAR(30) NOT NULL,
    id_medico INT,
    id_paciente INT,
    FOREIGN KEY (id_medico) REFERENCES medico(crm),
    FOREIGN KEY (id_paciente) REFERENCES paciente(cpf)
);
