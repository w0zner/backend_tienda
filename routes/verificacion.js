const express = require('express');
const usuarioController = require('../controllers/UsuarioController');

const api = express.Router();

api.get('/verificacion-usuario', usuarioController.verificarCuentaUsuario)

module.exports = api
