const jwt = require('jwt-simple')
const moment = require('moment')
require('dotenv').config()

const secret = process.env.SECRET 

const createToken = (usuario) => {
    const payload = {
        sub: usuario._id,
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        email: usuario.email,
        iat: moment().unix(),
        exp: moment().add(1, 'hours').unix()
    }
    return jwt.encode(payload, secret)
}

module.exports = {createToken}