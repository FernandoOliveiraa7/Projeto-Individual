var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n function autenticar():", email);
    var instrucaoSql = `
        SELECT id, nome, email, heranca, tour FROM usuario WHERE email = '${email}' AND senha = '${senha}';
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
        UPDATE usuario SET tour = '${tour}' WHERE id = ${idUsuario};
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
        SELECT tour AS nome, COUNT(*) AS total FROM usuario WHERE tour IS NOT NULL GROUP BY tour;
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