const express = require('express')
const reviewController = require('../controllers/ReviewController')
const authenticate = require('../middlewares/authenticate')

const api = express.Router()

//api.get('/', authenticate.verifyAuthAdmin, cuponController.listar)
api.get('/:id', authenticate.verifyAuthAdmin, reviewController.obtenerPorId)
api.post('/', authenticate.verifyAuthAdmin, reviewController.guardar)
//api.put('/:id', authenticate.verifyAuthAdmin, cuponController.actualizar)
//api.delete('/:id', authenticate.verifyAuthAdmin, cuponController.eliminar)

module.exports = api
