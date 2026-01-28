const express = require('express')
const controller=require('../controllers/ProductoController')
const authenticate = require('../middlewares/authenticate')
const checkPermission = require('../middlewares/checkPermission')
const multiparty = require('connect-multiparty')
const fs = require('fs')
const path = require('path')

const api = express.Router()

const uploadDir = path.join(__dirname, '../uploads/productos')
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
}

const multipartyMiddleware = multiparty({uploadDir: uploadDir, maxFilesSize: 5 * 1024 * 1024})

//publico
api.get('/listar-productos/:filtro?', controller.listar)
api.get('/obtener-por-slug/:slug?', controller.obtener_producto_slug)
api.get('/listar-productos-recomendados/:categoria', controller.listarProductosRecomendados)
api.get('/listar-productos-nuevos', controller.listarProductosNuevos)
api.get('/listar-productos-mas-vendidos', controller.listarProductosMasVendidos)


//productos
api.get('/:filtro?', authenticate.verifyAuthAdmin, controller.listar)
api.get('/obtenerPorId/:id', authenticate.verifyAuthAdmin, controller.obtenerPorId)
api.post('/', [authenticate.verifyAuthAdmin, multipartyMiddleware], checkPermission('producto.post'), controller.guardar)
api.put('/:id', [authenticate.verifyAuthAdmin, multipartyMiddleware], checkPermission('producto.put'), controller.actualizar)
api.delete('/:id', authenticate.verifyAuthAdmin, checkPermission('producto.delete'), controller.eliminar)
api.get('/obtenerPortada/:img', controller.obtenerPortada)
api.put('/subirImagenGaleria/:id', [authenticate.verifyAuthAdmin, multipartyMiddleware], controller.agregar_imagen_galeria)

//variedades
api.put('/variedades/:id', authenticate.verifyAuthAdmin, checkPermission('variedades.put'), controller.actualizarVariedades)

//inventario
api.get('/inventario/:id', authenticate.verifyAuthAdmin, checkPermission('inventario.get'), controller.listar_inventario)  
api.delete('/inventario/:id', authenticate.verifyAuthAdmin, checkPermission('inventario.delete'), controller.eliminar_item_inventario) 
api.post('/inventario/', [authenticate.verifyAuthAdmin, multipartyMiddleware], checkPermission('inventario.post'), controller.guardar_item_inventario)



module.exports = api