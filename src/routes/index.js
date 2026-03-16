const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController");
const validateUser = require('../middlewares/validateuser');

//GET Listar Todos
router.get('/users', userController.listUsers);

//GET Listar usuários por ID (req.params)
router.get('/users/:id', userController.getUser);

//POST - Criação de um usuário
router.post('/users', validateUser, (req, res) => {
    const novoUsuario = {
        id: users.length + 1,
        nome: req.body.nome
    }
    users.push(novoUsuario);
    res.status(201).json(novoUsuario);
});

//PUT - Atualizar usuário
router.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome } = req.body;
    console.log(nome);

    const user = users.find(u => u.id === id);
    if (!user) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    user.nome = nome;

    res.json(user);
});

//DELETE
router.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);

    users = users.filter(u => u.id !== id);

    res.status(204).send();
});


module.exports = router;