const express = require('express')
const carritoController = require('../controllers/CarritoController')
const authenticate = require('../middlewares/authenticate')

const api = express.Router()

api.post('/agregar', authenticate.verifyAuth, carritoController.agregar_al_carrito)
api.get('/obtener-carrito/:id', authenticate.verifyAuth, carritoController.obtener_carrito_por_usuario)
api.get('/eliminar/:id', authenticate.verifyAuth, carritoController.eliminar_item_carrito)


module.exports = api