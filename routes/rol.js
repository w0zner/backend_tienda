const express = require('express');
const rolController = require('../controllers/RolController');
const checkPermission = require('../middlewares/checkPermission');
const authenticate = require('../middlewares/authenticate');

const api = express.Router();

api.get('/', authenticate.verifyAuthAdmin, rolController.listar)
api.get('/:id', authenticate.verifyAuthAdmin, rolController.findOne)
api.post('/', authenticate.verifyAuthAdmin,  rolController.guardar) //checkPermission('rol.post'),
api.put('/:id', authenticate.verifyAuthAdmin,  rolController.update) //checkPermission('rol.put'),

module.exports = api
