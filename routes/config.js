const express = require('express')
const controller=require('../controllers/ConfigController')
const authenticate = require('../middlewares/authenticate')
const checkPermission = require('../middlewares/checkPermission')
const multiparty = require('connect-multiparty')
const fs = require('fs')
const path = require('path')

const uploadDir = path.join(__dirname, '../uploads/configuraciones')
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
}

const multipartyMiddleware = multiparty({uploadDir: uploadDir, maxFilesSize: 5 * 1024 * 1024})

const api = express.Router()

//api.get('/', authenticate.verifyAuthAdmin, controller.listar)
api.get('/', controller.obtenerConfig)
api.get('/', authenticate.verifyAuthAdmin, controller.obtenerConfig)
api.get('/obtenerLogo/:img', controller.obtenerLogo)
api.post('/',  authenticate.verifyAuthAdmin, checkPermission('config.post'), controller.guardar)
api.put('/',  [authenticate.verifyAuthAdmin, checkPermission('config.put'), multipartyMiddleware], controller.actualizar)
api.delete('/:id',  authenticate.verifyAuthAdmin, checkPermission('config.delete'), controller.eliminar)

module.exports = api