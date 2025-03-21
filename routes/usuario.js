const express = require('express');

const usuarioController = require('../controllers/UsuarioController');

const api = express.Router();

api.post('/', usuarioController.registrar);
//api.get('/guardar', usuarioController.guardar);


module.exports = api;