CREATE DATABASE sismed;
USE sismed;

CREATE TABLE medico(
	id_medico INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome VARCHAR(30) NOT NULL,
    crm VARCHAR(20) NOT NULL,
	data_nascimento DATE
);
