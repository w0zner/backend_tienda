const express = require('express');
const rolController = require('../controllers/RolController')

const api = express.Router();

api.get('/', rolController.listar)
api.get('/:id', rolController.findOne)
api.post('/', rolController.guardar)
api.put('/:id', rolController.update)

module.exports = api
