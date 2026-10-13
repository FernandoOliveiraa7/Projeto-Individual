-- =====================================================
-- Projeto: Corinthians e o Futebol - Tour Parque São Jorge / Neo Química Arena
-- Banco: MySQL (padrão da web-data-viz)
-- =====================================================

CREATE DATABASE IF NOT EXISTS corinthians;
USE corinthians;

-- -----------------------------------------------------
-- TABELAS
-- -----------------------------------------------------

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(80) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL,
    quem_fez_corinthiano VARCHAR(20) NOT NULL,
    dt_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_quem CHECK (quem_fez_corinthiano IN
        ('Pai', 'Mãe', 'Avô/Avó', 'Tio/Tia', 'Amigo', 'Nasci assim'))
);

CREATE TABLE local_tour (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL UNIQUE,
    CONSTRAINT chk_local CHECK (nome IN ('Parque São Jorge', 'Neo Química Arena'))
);

CREATE TABLE agendamento (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fk_usuario INT NOT NULL,
    fk_local INT NOT NULL,
    data_tour DATE NOT NULL,
    qtd_pessoas INT NOT NULL,
    dt_agendamento DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id),
    FOREIGN KEY (fk_local) REFERENCES local_tour(id),
    CONSTRAINT chk_qtd CHECK (qtd_pessoas BETWEEN 1 AND 20)
);

-- -----------------------------------------------------
-- DADOS INICIAIS
-- -----------------------------------------------------

INSERT INTO local_tour (nome) VALUES
    ('Parque São Jorge'),
    ('Neo Química Arena');

-- Dados de exemplo para testar a dashboard (opcional)
INSERT INTO usuario (nome, email, senha, quem_fez_corinthiano) VALUES
    ('Teste Um', 'teste1@email.com', '123456', 'Tio/Tia'),
    ('Teste Dois', 'teste2@email.com', '123456', 'Pai'),
    ('Teste Três', 'teste3@email.com', '123456', 'Nasci assim'),
    ('Teste Quatro', 'teste4@email.com', '123456', 'Avô/Avó');

INSERT INTO agendamento (fk_usuario, fk_local, data_tour, qtd_pessoas) VALUES
    (1, 1, '2026-11-14', 4),
    (2, 2, '2026-11-15', 3),
    (3, 2, '2026-11-21', 2),
    (4, 1, '2026-12-05', 5),
    (1, 2, '2026-12-12', 2);

-- -----------------------------------------------------
-- CADASTRO E LOGIN (usados pela API)
-- -----------------------------------------------------

-- Cadastro
INSERT INTO usuario (nome, email, senha, quem_fez_corinthiano)
VALUES ('Nome', 'email@email.com', 'senha', 'Tio/Tia');

-- Login
SELECT id, nome, email, quem_fez_corinthiano
FROM usuario
WHERE email = 'email@email.com' AND senha = 'senha';

-- Agendar tour
INSERT INTO agendamento (fk_usuario, fk_local, data_tour, qtd_pessoas)
VALUES (1, 1, '2026-12-20', 3);

-- -----------------------------------------------------
-- CONSULTAS DA DASHBOARD
-- (só comandos básicos; as contagens e médias são feitas no JavaScript)
-- -----------------------------------------------------

-- Todos os agendamentos, com o nome do local
-- Serve para: KPI 1 (total), KPI 2 (média de pessoas), KPI 3 (local mais escolhido),
-- Gráfico 1 (agendamentos por local) e Gráfico 3 (agendamentos por dia da semana)
SELECT a.id, a.data_tour, a.qtd_pessoas, l.nome AS local
FROM agendamento a
JOIN local_tour l ON l.id = a.fk_local;

-- KPI 4: Meu próximo tour (troque o 1 pelo id do usuário logado)
SELECT a.data_tour, a.qtd_pessoas, l.nome AS local
FROM agendamento a
JOIN local_tour l ON l.id = a.fk_local
WHERE a.fk_usuario = 1
ORDER BY a.data_tour;

-- Gráfico 2: quem te fez corinthiano
SELECT quem_fez_corinthiano
FROM usuario;