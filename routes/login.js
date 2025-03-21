const express = require('express');
const loginController = require('../controllers/LoginController')

const api = express.Router();

api.post('/', loginController.login)

module.exports = api
