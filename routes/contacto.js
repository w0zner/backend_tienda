const express = require('express');
const contactoController = require('../controllers/ContactoController')
const authenticate = require('../middlewares/authenticate')


const api = express.Router();

api.get('/', authenticate.verifyAuthAdmin, contactoController.listar_mensajes)
api.post('/', contactoController.enviar_mensaje)
api.put('/:id',  authenticate.verifyAuthAdmin, contactoController.resolver_mensaje)

module.exports = api
