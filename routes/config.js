const express = require('express')
const controller=require('../controllers/ConfigController')
const authenticate = require('../middlewares/authenticate')

const api = express.Router()

api.get('/', authenticate.verifyAuthAdmin, controller.listar)
api.get('/:id', authenticate.verifyAuthAdmin, controller.obtenerPorId)
api.post('/', authenticate.verifyAuthAdmin, controller.guardar)
api.put('/:id', authenticate.verifyAuthAdmin, controller.actualizar)
api.delete('/:id', authenticate.verifyAuthAdmin, controller.eliminar)

module.exports = api