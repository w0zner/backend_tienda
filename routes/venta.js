const express = require('express')
const ventaController = require('../controllers/VentaController')
const authenticate = require('../middlewares/authenticate')

const api = express.Router()

api.post('/registrar', authenticate.verifyAuth, ventaController.registroVenta)
api.get('/obtener-ventas-usuario/:id', authenticate.verifyAuth, ventaController.obtenerVentasPorUsuario)
//api.delete('/eliminar/:id', authenticate.verifyAuth, carritoController.eliminar_item_carrito)


module.exports = api