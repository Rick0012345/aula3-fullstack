const User = require("../models/userModel");

async function listUsers(req, res) {
    const users = await User.find();
    res.json(users);
}

async function getUser(req, res) {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({ erro: "Usuario nao encontrado" });
    }
    res.json(user);
}

async function createUser(req, res) {
    const user = await User.create({ nome: req.body.nome });
    res.status(201).json(user);
}

async function updateUser(req, res) {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        { nome: req.body.nome },
        { new: true, runValidators: true }
    );

    if (!user) {
        return res.status(404).json({ erro: "Usuario nao encontrado" });
    }
    res.json(user);
}

async function deleteUser(req, res) {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
        return res.status(404).json({ erro: "Usuario nao encontrado" });
    }
    res.status(204).send();
}

module.exports = { listUsers, getUser, createUser, updateUser, deleteUser };
