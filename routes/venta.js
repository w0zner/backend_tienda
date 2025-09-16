const express = require('express')
const ventaController = require('../controllers/VentaController')
const authenticate = require('../middlewares/authenticate')

const api = express.Router()

api.post('/registrar', authenticate.verifyAuth, ventaController.registroVenta)
//api.get('/obtener-carrito/:id', authenticate.verifyAuth, carritoController.obtener_carrito_por_usuario)
//api.delete('/eliminar/:id', authenticate.verifyAuth, carritoController.eliminar_item_carrito)


module.exports = api