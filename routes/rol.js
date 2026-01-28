const express = require('express');
const rolController = require('../controllers/RolController');
const checkPermission = require('../middlewares/checkPermission');
const authenticate = require('../middlewares/authenticate');

const api = express.Router();

api.get('/', authenticate.verifyAuthAdmin, rolController.listar)
api.get('/:id', authenticate.verifyAuthAdmin, rolController.findOne)
api.post('/', authenticate.verifyAuthAdmin, checkPermission('rol.post'), rolController.guardar)
api.put('/:id', authenticate.verifyAuthAdmin, checkPermission('rol.put'), rolController.update)

module.exports = api
