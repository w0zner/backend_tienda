const jwt = require('jwt-simple')
const moment = require('moment')
require('dotenv').config()

const secret = process.env.SECRET 

const createToken = (usuario) => {
    console.log('USER ',usuario)
    const payload = {
        sub: usuario._id,
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        email: usuario.email,
        role: usuario.rol.nombre,
        permisos: usuario.rol.permisos.map(p => p.key),
        iat: moment().unix(),
        exp: moment().add(15, 'minutes').unix()
    }
    return jwt.encode(payload, secret)
}

const refreshToken = (usuario) => {
    const payload = {
        sub: usuario._id,
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        email: usuario.email,
        role: usuario.rol.nombre,
        permisos: usuario.rol.permisos.map(p => p.key),
        iat: moment().unix(),
        exp: moment().add(1, 'hours').unix()
    }
    return jwt.encode(payload, secret)
}

module.exports = {createToken, refreshToken}