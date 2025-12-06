const express = require('express')
const ventaController = require('../controllers/VentaController')
const authenticate = require('../middlewares/authenticate')

const api = express.Router()

api.post('/registrar', authenticate.verifyAuth, ventaController.registroVenta)
api.get('/obtener-ventas/:desde?/:hasta?', authenticate.verifyAuthAdmin, ventaController.obtenerVentas)
api.get('/obtener-ventas/:desde?/:hasta?', authenticate.verifyAuthAdmin, ventaController.obtenerVentas)
api.get('/obtener-ventas-nventa/:nroventa?', authenticate.verifyAuthAdmin, ventaController.obtenerVentasPorNroVenta)
api.get('/obtener-ventas-estado/:estado?', authenticate.verifyAuthAdmin, ventaController.obtenerVentasPorEstado)

api.get('/obtener-ventas-usuario/:id', authenticate.verifyAuth, ventaController.obtenerVentasPorUsuario)
api.get('/obtener-venta/:id', authenticate.verifyAuth, ventaController.obtenerPorId)
api.get('/obtener-venta-admin/:id', authenticate.verifyAuthAdmin, ventaController.obtenerPorId)
api.put('/actualizar-estado/:id', authenticate.verifyAuthAdmin, ventaController.updateEstado)

api.get('/obtener-kpi-ganancias', authenticate.verifyAuthAdmin, ventaController.kpi_ganacias_mensuales)
api.get('/obtener-kpi-cantidad', authenticate.verifyAuthAdmin, ventaController.kpi_cantidad_ventas_mensuales)


//api.delete('/eliminar/:id', authenticate.verifyAuth, carritoController.eliminar_item_carrito)


module.exports = api