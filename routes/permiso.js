const express = require('express');
const ctrl = require('../controllers/PermisoController');
const checkPermission = require('../middlewares/checkPermission');
const authenticate = require('../middlewares/authenticate')



const api = express.Router();

api.post('/', authenticate.verifyAuthAdmin, checkPermission('permiso.post'), ctrl.create);
api.get('/',  ctrl.findAll); //checkPermission('permission.read') checkPermission('permission.create') checkPermission('permission.delete')checkPermission('permission.update')
api.get('/:id',  ctrl.findOne);
api.put('/:id',  ctrl.update);
api.delete('/:id', ctrl.eliminar);

module.exports = api;
