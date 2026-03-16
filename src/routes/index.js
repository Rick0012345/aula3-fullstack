const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController");
const validateUser = require('../middlewares/validateuser');

// GET list
router.get('/users', userController.listUsers);

// GET by id
router.get('/users/:id', userController.getUser);

// POST create
router.post('/users', validateUser, userController.createUser);

// PUT update
router.put('/users/:id', validateUser, userController.updateUser);

// DELETE
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
