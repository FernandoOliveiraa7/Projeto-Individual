var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);

                    if (resultadoAutenticar.length == 1) {
                        res.json({
                            id: resultadoAutenticar[0].id,
                            nome: resultadoAutenticar[0].nome,
                            email: resultadoAutenticar[0].email,
                            heranca: resultadoAutenticar[0].heranca,
                            tour: resultadoAutenticar[0].tour
                        });
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var heranca = req.body.herancaServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (heranca == undefined) {
        res.status(400).send("Sua herança (quem te fez corinthiano) está undefined!");
    } else {

        usuarioModel.cadastrar(nome, email, senha, heranca)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function registrarTour(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var tour = req.body.tourServer;

    if (idUsuario == undefined) {
        res.status(400).send("Seu id de usuário está undefined!");
    } else if (tour == undefined) {
        res.status(400).send("Seu tour está undefined!");
    } else {

        usuarioModel.registrarTour(idUsuario, tour)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao registrar o tour! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function dashboard(req, res) {
    usuarioModel.buscarHeranca()
        .then(
            function (resultadoHeranca) {
                usuarioModel.buscarTour()
                    .then(
                        function (resultadoTour) {
                            res.json({
                                heranca: resultadoHeranca,
                                tour: resultadoTour
                            });
                        }
                    ).catch(
                        function (erro) {
                            console.log(erro);
                            res.status(500).json(erro.sqlMessage);
                        }
                    );
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao buscar os dados da dashboard! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    autenticar,
    cadastrar,
    registrarTour,
    dashboard
}