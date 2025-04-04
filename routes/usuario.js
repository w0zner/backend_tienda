const express = require('express');
const usuarioController = require('../controllers/UsuarioController');
const authenticate = require('../middlewares/authenticate')
const dataForClient = require('../middlewares/dataForClient')

const api = express.Router();

api.post('/', authenticate.verifyAuthAdmin, dataForClient.addDefaultData, usuarioController.registrar);
api.get('/:id', authenticate.verifyAuthAdmin,usuarioController.getById);
api.get('/buscar/:tipo/:filtro?', authenticate.verifyAuthAdmin, usuarioController.listar);
api.put('/:id', authenticate.verifyAuthAdmin, usuarioController.update)
api.delete('/:id', authenticate.verifyAuthAdmin, usuarioController.remove)
 
//api.get('/guardar', usuarioController.guardar);


module.exports = api;