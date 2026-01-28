const express = require('express');
const ctrl = require('../controllers/PermisoController');
const checkPermission = require('../middlewares/checkPermission');
const authenticate = require('../middlewares/authenticate')



const api = express.Router();

api.post('/', authenticate.verifyAuthAdmin, checkPermission('permiso.post'), ctrl.create);
api.get('/:filtro?',  authenticate.verifyAuthAdmin, checkPermission('permiso.get'),ctrl.findAll); //checkPermission('permission.read') checkPermission('permission.create') checkPermission('permission.delete')checkPermission('permission.update')
api.get('/:id',  authenticate.verifyAuthAdmin, checkPermission('permiso.get'),ctrl.findOne);
api.put('/:id',  authenticate.verifyAuthAdmin, checkPermission('permiso.put'),ctrl.update);
api.delete('/:id', authenticate.verifyAuthAdmin, checkPermission('permiso.delete'),ctrl.eliminar);

module.exports = api;
