const express = require('express');
const loginController = require('../controllers/LoginController')

const api = express.Router();

api.post('/', loginController.login)
api.post('/refresh', loginController.refresh)

api.post('/admin', loginController.login_admin)
api.post('/admin/refresh', loginController.refresh_admin)
api.post('/admin/logout', loginController.logout_admin);

module.exports = api
