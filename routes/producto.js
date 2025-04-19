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

//productos
api.get('/:filtro?', authenticate.verifyAuthAdmin, controller.listar)
api.get('/obtenerPorId/:id', authenticate.verifyAuthAdmin, controller.obtenerPorId)
api.post('/', [authenticate.verifyAuthAdmin, multipartyMiddleware], controller.guardar)
api.put('/:id', [authenticate.verifyAuthAdmin, multipartyMiddleware], controller.actualizar)
api.delete('/:id', authenticate.verifyAuthAdmin, controller.eliminar)
api.get('/obtenerPortada/:img', controller.obtenerPortada)

//inventario
api.get('/inventario/:id', authenticate.verifyAuthAdmin, controller.listar_inventario)  

module.exports = api