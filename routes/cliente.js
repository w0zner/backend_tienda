const express = require('express');

const clienteController = require('../controllers/ClienteController');

const api = express.Router();

//api.post('/guardar', clienteController.guardar);
api.get('/guardar', clienteController.guardar);


module.exports = api;