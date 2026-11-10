var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

// Salva o tour escolhido pelo usuário (vem da pesquisa da home)
router.post("/tour", function (req, res) {
    usuarioController.registrarTour(req, res);
});

// Devolve os dados para os gráficos da dashboard
router.get("/dashboard", function (req, res) {
    usuarioController.dashboard(req, res);
});

module.exports = router;