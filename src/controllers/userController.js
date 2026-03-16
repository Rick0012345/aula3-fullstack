const User = require("../models/userModel");

async function listUsers(req, res) {
    const users = await User.find();
    res.json(users);
}

async function getUser(req, res) {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
    }
    res.json(user);
}

//CreateUser

module.exports = { listUsers, getUser };