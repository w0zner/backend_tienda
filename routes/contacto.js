const express = require('express');
const contactoController = require('../controllers/ContactoController')

const api = express.Router();

//api.get('/', rolController.listar)
api.post('/', contactoController.enviar_mensaje)

module.exports = api
