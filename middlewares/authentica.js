const jwt = require('jwt-simple')
const moment = require('moment')
require('dotenv').config();

const verifyAuthAdmin = (req, res, next) => {
    let payload = null
    if(!req.headers.authorization) {
        return res.status(201).send({message: 'No headers error'})
    }

    const token = req.headers.authorization.replace(/['"]+/g, '');
    const segment = token.split('.')

    if(segment.length != 3){
        return res.status(403).send({message: 'Invalid token'})
    } else {
        try {
            payload = jwt.decode(token, process.env.SECRET);

            if(payload.exp <= moment().unix()) {
                return res.status(403).send({message: 'Token expired'})
            }

            if(payload.role !== 'ADMIN'){
                return res.status(401).send({message: 'Acceso denegado'})
            }
        } catch (error) {
            return res.status(403).send({message: 'Invalid token'})
        }
    }

    req.user = payload;

    next()
}

const verifyAuth = (req, res, next) => {
    if(!req.headers.authorization) {
        return res.status(201).send({message: 'No headers error'})
    }

    const token = req.headers.authorization.replace(/['"]+/g, '');
    const segment = token.split('.')

    if(segment.length != 3){
        return res.status(403).send({message: 'Invalid token'})
    } else {
        try {
            const payload = jwt.decode(token, process.env.SECRET);

            if(payload.exp <= moment().unix()) {
                return res.status(403).send({message: 'Token expired'})
            }
        } catch (error) {
            return res.status(403).send({message: 'Invalid token'})
        }
    }

    req.user = payload;

    next()
}

module.exports = { verifyAuth, verifyAuthAdmin }

