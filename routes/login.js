const express = require('express');
const loginController = require('../controllers/LoginController')

const api = express.Router();

api.post('/', loginController.login)
api.post('/admin', loginController.login_admin)
api.post('/admin/refresh', loginController.refresh_admin)

module.exports = api
