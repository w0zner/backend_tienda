const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt-nodejs')

const login = async (req, res) => {
    const data = req.body;
    let usuarios_arr = [];

    usuarios_arr = await Usuario.find({email: data.email})

    if(usuarios_arr.length == 0) {
        res.status(404)
        .json({
            message: 'Usuario no encontrado.',
            data: undefined
        })
    } else {
        let user = usuarios_arr[0]
        const passwordBD = bcrypt.compareSync(data.password, user.password);

        if(!passwordBD) {
            res.status(404)
            .json({
                message: 'Password no coincide.',
                data: undefined
            })
        }

        res.status(200)
        .json({
            message: 'Usuario logueado!',
            data: user
        })
    }
}

module.exports = { login }