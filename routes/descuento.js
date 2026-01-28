const express = require('express')
const descuentoController = require('../controllers/DescuentoController')
const authenticate = require('../middlewares/authenticate')
const checkPermission = require('../middlewares/checkPermission')

const multiparty = require('connect-multiparty')
const fs = require('fs')
const path = require('path')

const api = express.Router()

const uploadDir = path.join(__dirname, '../uploads/descuentos')
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
}

const multipartyMiddleware = multiparty({uploadDir: uploadDir, maxFilesSize: 5 * 1024 * 1024})

api.put('/actualizar/:id', [authenticate.verifyAuthAdmin, multipartyMiddleware], checkPermission('descuento.put'), descuentoController.actualizarDescuento)
api.post('/registrar', [authenticate.verifyAuthAdmin, multipartyMiddleware], checkPermission('descuento.post'), descuentoController.registrarDescuento)
api.get('/listar/:filtro?', authenticate.verifyAuthAdmin, checkPermission('descuento.get'), descuentoController.listarDescuentos)
api.get('/obtenerPortada/:img', checkPermission('descuento.get'), descuentoController.obtenerBanner)
api.get('/obtener/:id', checkPermission('descuento.get'), descuentoController.obtenerPorId)
api.get('/obtener-descuentos/', checkPermission('descuento.get'), descuentoController.obtenerDescuentosActivos)
api.delete('/:id', authenticate.verifyAuthAdmin, checkPermission('descuento.delete'), descuentoController.eliminarDescuento)





module.exports = api