const express = require('express')
const descuentoController = require('../controllers/DescuentoController')
const authenticate = require('../middlewares/authenticate')

const multiparty = require('connect-multiparty')
const fs = require('fs')
const path = require('path')

const api = express.Router()

const uploadDir = path.join(__dirname, '../uploads/descuentos')
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
}

const multipartyMiddleware = multiparty({uploadDir: uploadDir, maxFilesSize: 5 * 1024 * 1024})

api.put('/actualizar/:id', [authenticate.verifyAuthAdmin, multipartyMiddleware], descuentoController.actualizarDescuento)
api.post('/registrar', [authenticate.verifyAuthAdmin, multipartyMiddleware], descuentoController.registrarDescuento)
api.get('/listar/:filtro?', authenticate.verifyAuthAdmin, descuentoController.listarDescuentos)
api.get('/obtenerPortada/:img', descuentoController.obtenerBanner)
api.get('/obtener/:id', descuentoController.obtenerPorId)
api.delete('/:id', authenticate.verifyAuthAdmin, descuentoController.eliminarDescuento)




module.exports = api