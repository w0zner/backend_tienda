const express = require('express');
const usuarioController = require('../controllers/UsuarioController');
const authenticate = require('../middlewares/authentica')
const dataForClient = require('../middlewares/dataForClient')

const api = express.Router();

api.post('/', dataForClient.addDefaultData, usuarioController.registrar);
api.get('/:tipo/:filtro?', authenticate.verifyAuthAdmin, usuarioController.listar);
//api.get('/guardar', usuarioController.guardar);


module.exports = api;