const express = require('express')
const cuponController = require('../controllers/CuponController')
const authenticate = require('../middlewares/authenticate')

const api = express.Router()

api.get('/', authenticate.verifyAuthAdmin, cuponController.listar)
api.get('/:id', authenticate.verifyAuthAdmin, cuponController.obtenerPorId)
api.post('/', authenticate.verifyAuthAdmin, cuponController.guardar)
api.put('/:id', authenticate.verifyAuthAdmin, cuponController.actualizar)
api.delete('/:id', authenticate.verifyAuthAdmin, cuponController.eliminar)

module.exports = api
