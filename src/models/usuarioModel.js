var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n function autenticar():", email);
    var instrucaoSql = `
        SELECT u.id, u.nome, u.email, u.heranca, t.nome AS tour
        FROM usuario u
        LEFT JOIN tour t ON t.id = u.fk_tour
        WHERE u.email = '${email}' AND u.senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(nome, email, senha, heranca) {
    console.log("ACESSEI O USUARIO MODEL \n function cadastrar():", nome, email, heranca);
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha, heranca) VALUES ('${nome}', '${email}', '${senha}', '${heranca}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function registrarTour(idUsuario, tour) {
    console.log("ACESSEI O USUARIO MODEL \n function registrarTour():", idUsuario, tour);
    var instrucaoSql = `
        UPDATE usuario SET fk_tour = (SELECT id FROM tour WHERE nome = '${tour}') WHERE id = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarHeranca() {
    var instrucaoSql = `
        SELECT heranca AS nome, COUNT(*) AS total FROM usuario GROUP BY heranca;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarTour() {
    var instrucaoSql = `
        SELECT t.nome AS nome, COUNT(u.id) AS total
        FROM tour t
        JOIN usuario u ON u.fk_tour = t.id
        GROUP BY t.nome;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    registrarTour,
    buscarHeranca,
    buscarTour
};