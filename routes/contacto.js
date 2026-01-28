const express = require('express');
const contactoController = require('../controllers/ContactoController')
const authenticate = require('../middlewares/authenticate')
const checkPermission = require('../middlewares/checkPermission')


const api = express.Router();

api.get('/', authenticate.verifyAuthAdmin, checkPermission('contacto.get'), contactoController.listar_mensajes)
api.post('/', checkPermission('contacto.post'), contactoController.enviar_mensaje)
api.put('/:id', authenticate.verifyAuthAdmin, checkPermission('contacto.put'), contactoController.resolver_mensaje)

module.exports = api
