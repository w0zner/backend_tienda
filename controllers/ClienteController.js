const Cliente = require('../models/cliente')

const guardar = (req, res) => {
    //
    res.status(200).json({'message':'Hola mundo'})
}

module.exports = {
    guardar
}