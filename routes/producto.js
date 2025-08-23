const express = require('express')
const controller=require('../controllers/ProductoController')
const authenticate = require('../middlewares/authenticate')
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

//productos
api.get('/:filtro?', authenticate.verifyAuthAdmin, controller.listar)
api.get('/obtenerPorId/:id', authenticate.verifyAuthAdmin, controller.obtenerPorId)
api.post('/', [authenticate.verifyAuthAdmin, multipartyMiddleware], controller.guardar)
api.put('/:id', [authenticate.verifyAuthAdmin, multipartyMiddleware], controller.actualizar)
api.delete('/:id', authenticate.verifyAuthAdmin, controller.eliminar)
api.get('/obtenerPortada/:img', controller.obtenerPortada)
api.put('/subirImagenGaleria/:id', [authenticate.verifyAuthAdmin, multipartyMiddleware], controller.agregar_imagen_galeria)

//variedades
api.put('/variedades/:id', authenticate.verifyAuthAdmin, controller.actualizarVariedades)

//inventario
api.get('/inventario/:id', authenticate.verifyAuthAdmin, controller.listar_inventario)  
api.delete('/inventario/:id', authenticate.verifyAuthAdmin, controller.eliminar_item_inventario) 
api.post('/inventario/', [authenticate.verifyAuthAdmin, multipartyMiddleware], controller.guardar_item_inventario)



module.exports = api