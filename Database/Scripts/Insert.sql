-- Usando o banco de dados
USE sismed;

-- Inserindo usuários
INSERT INTO usuario (email, senha, tipo_usuario) VALUES
('admin@exemplo.com', '123456', 'admin'),
('medico@exemplo.com', '123456', 'medico'),
('paciente@exemplo.com', '123456', 'paciente');

-- Inserindo médicos
INSERT INTO medico (nome, especialidade, data_nascimento, crm, usuario_id_usuario) VALUES
('Dr. João Silva', 'Cardiologia', '1975-05-12', 'CRM12345', 2),
('Dra. Maria Oliveira', 'Pediatria', '1982-11-23', 'CRM67890', 2);

-- Inserindo pacientes
INSERT INTO paciente (cpf, nome, telefone, data_nascimento, endereco, usuario_id) VALUES
('123.456.789-00', 'Ana Santos', '61912345678', '1990-04-10', 'Rua A, 123', 3),
('987.654.321-00', 'Carlos Pereira', '61976543210', '1985-07-15', 'Rua B, 456', 3),
('456.789.123-00', 'Mariana Costa', '61998765432', '1992-09-21', 'Rua C, 789', 3);

-- Inserindo relatórios
INSERT INTO relatorio (descricao) VALUES
('Relatório Clínico Ana Santos'),
('Relatório Clínico Carlos Pereira'),
('Relatório Clínico Mariana Costa');

-- Inserindo consultas
INSERT INTO consulta (data_horario, motivo, paciente_id, medico_id, relatorio_id) VALUES
('2025-04-20 10:00:00', 'Consulta de rotina', 1, 1, 1),
('2025-04-21 14:00:00', 'Consulta de retorno', 2, 2, 2),
('2025-04-22 09:30:00', 'Consulta de acompanhamento', 3, 1, 3);