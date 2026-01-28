const express = require('express')
const cuponController = require('../controllers/CuponController')
const authenticate = require('../middlewares/authenticate')
const checkPermission = require('../middlewares/checkPermission')

const api = express.Router()

api.get('/', authenticate.verifyAuthAdmin, checkPermission('cupon.get'), cuponController.listar)
api.get('/:id', authenticate.verifyAuthAdmin, checkPermission('cupon.get'), cuponController.obtenerPorId)
api.post('/', authenticate.verifyAuthAdmin, checkPermission('cupon.post'), cuponController.guardar)
api.put('/:id', authenticate.verifyAuthAdmin, checkPermission('cupon.put'), cuponController.actualizar)
api.delete('/:id', authenticate.verifyAuthAdmin, checkPermission('cupon.delete'), cuponController.eliminar)

module.exports = api
