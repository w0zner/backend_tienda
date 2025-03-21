const express = require('express');
const rolController = require('../controllers/RolController')

const api = express.Router();

api.get('/', rolController.listar)
api.post('/', rolController.guardar)

module.exports = api
