const express = require('express');
const usuarioController = require('../controllers/UsuarioController');
const direccionController = require('../controllers/DireccionController');

const authenticate = require('../middlewares/authenticate')
const dataForClient = require('../middlewares/dataForClient')
const verifyLocation = require('../middlewares/verifyLocation')

const api = express.Router();

api.post('/add-user', verifyLocation.verifyEndpoint, verifyLocation.hideHeader ,usuarioController.registrar);

api.post('/', authenticate.verifyAuthAdmin, dataForClient.addDefaultData, usuarioController.registrar);
api.post('/registrar-usuario-admin', authenticate.verifyAuthAdmin, usuarioController.registrar);

api.get('/:id', authenticate.verifyAuthAdmin,usuarioController.getById);
api.get('/buscar/:tipo/:filtro?', authenticate.verifyAuthAdmin, usuarioController.listar);
api.get('/buscar-usuario-sistema/:tipo/:filtro?', authenticate.verifyAuthAdmin, usuarioController.listarUsuarioSistemaAdmin);
api.put('/:id', authenticate.verifyAuthAdmin, usuarioController.update)
api.put('/actualizar-estado/:id', authenticate.verifyAuthAdmin, usuarioController.updateStatus)
api.delete('/:id', authenticate.verifyAuthAdmin, usuarioController.remove)

api.post('/registro',dataForClient.addDefaultClientData, usuarioController.registroCliente);
api.get('/verificacion-cuenta-usuario', usuarioController.verificarCuentaUsuario)
api.get('/cliente/:id', authenticate.verifyAuth, usuarioController.clientGetById);
api.put('/cliente/:id', authenticate.verifyAuth,  usuarioController.cliente_update)

//-----------------------Direccion----------------------
api.post('/direccion', authenticate.verifyAuth, direccionController.guardarDireccion)
api.get('/direccion/:id', authenticate.verifyAuth, direccionController.obtenerDireccionesPorUsuario)
api.put('/direccion-estado/:id', authenticate.verifyAuth, direccionController.actualizarEstadoDireccion)
api.delete('/direccion/:id', authenticate.verifyAuth, direccionController.eliminarDireccion)
api.get('/direccion-principal/:id', authenticate.verifyAuth, direccionController.obtenerDireccionPrincipalPorUsuario)

 
//api.get('/guardar', usuarioController.guardar);


module.exports = api;