const Usuario = require('../models/usuario');
const jwt = require('../helpers/jwt')
const bcrypt = require('bcrypt-nodejs')

const login = async (req, res) => {
    const data = req.body;
    let usuarios_arr = [];

    usuarios_arr = await Usuario.find({email: data.email})

    if(usuarios_arr.length == 0) {
        return res.status(404)
        .json({
            message: 'Usuario no encontrado.',
            data: undefined
        })
    } else {
        let user = usuarios_arr[0]
        const passwordBD = bcrypt.compareSync(data.password, user.password);

        if(!passwordBD) {
            return res.status(404)
            .json({
                message: 'Password no coincide.',
                data: undefined
            })
        }

        const token = jwt.createToken(user)

        res.status(200)
        .json({
            message: 'Usuario logueado!',
            data: user,
            token: token
        })
    }
}

module.exports = { login }