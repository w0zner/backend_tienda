const Usuario =  require('../models/usuario');
const Rol = require('../models/rol');
const bcrypt = require('bcrypt-nodejs')

const registrar = async (req, res) => {
    try {
        const data = req.body;

        let existeUsuario = [];
        existeUsuario = await Usuario.find({$or: [{cedula: data.cedula}, {email: data.email}]})
        
        if(existeUsuario.length == 0) {
            if(data.rol) {
                const rol =  await Rol.findOne({nombre: data.rol})
                if(rol) {
                    data.rol = rol._id;
                } else {
                    return res.status(400).json({
                        message: 'El rol no es válido.'
                    })
                }
                if(data.password) {
                    const salt = bcrypt.genSaltSync()
                    data.password = bcrypt.hashSync(data.password, salt)

                    const usuario = await Usuario.create(data);
                    res.status(200)
                    .json({
                        data: usuario
                    })
                } else {
                    return res.status(400).json({
                        message: 'El password es requerido.'
                    })
                }
            } else {
                return res.status(400).json({
                    message: 'El campo rol es requerido'
                })
            }
        } else {
            res.status(400)
            .json({
                message: 'El cliente ya existe en la base de datos',
                data: undefined
            })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Error ' + error.message
        })
    }
}

const listar = async (req, res) => {
    if(req.user) {
        try {
            const tipo = req.params['tipo']
            const filtro = req.params['filtro']
    
            if(tipo==null || tipo=='null') {
                let usuarios = await Usuario.find().populate('rol');
                const clientes = usuarios.filter(user => user.rol.nombre == process.env.ROL_CLIENT)
                res.status(200).json({data: clientes})
            } else {
                if(tipo=='apellido'){
                    let usuarios = await Usuario.find({apellidos:new RegExp(filtro,'i')}).populate('rol');;
                    const clientes = usuarios.filter(user => user.rol.nombre == process.env.ROL_CLIENT)
                    res.status(200).json({data: clientes})
                } else if(tipo=='nombre') {
                    let usuarios = await Usuario.find({nombres:new RegExp(filtro,'i')}).populate('rol');;
                    const clientes = usuarios.filter(user => user.rol.nombre == process.env.ROL_CLIENT)
                    res.status(200).json({data: clientes})
                }
            }
        } catch (error) {
            console.error(error)
            res.status(500).json({mssagge: 'Error inesperado'})
        }   
    } else {
        res.status(500).json({mssagge: 'Acceso denegado'})
    }
}

const getById = async (req, res) => {
    if(req.user) {
        try {
            const id = req.params.id
            const usuario = await Usuario.findById(id);

            if (!usuario) {
                return res.status(404).json({ mensaje: 'Usuario no encontrado' });
            }
            
            res.status(200).json({data: usuario})
        } catch (error) {
            console.error(error)
            res.status(500).json({mssagge: 'Error inesperado'})
        }
    } else {
        res.status(500).json({mssagge: 'Acceso denegado'})
    }
}

const update = async (req, res) => {
    if(req.user) {
        try {
            const id = req.params.id
            const usuario = await Usuario.findById(id)
    
            if(!usuario) {
                return res.status(404).json({
                    message: 'No existe el registro buscado'
                })
            }
            const cedula = req.body?.cedula
            if(usuario.cedula != cedula) {
                const existeCedula = await Usuario.exists({ cedula });
                if(existeCedula) {
                    return res.status(400).json({
                        message: 'Ya existe un registro con esa cedula'
                    })
                }
            } 
    
            const email = req.body?.email
            if(usuario.email != email) {
                const existeEmail = await Usuario.exists({ email });
                if(existeEmail) {
                    return res.status(400).json({
                        message: 'Ya existe un registro con ese correo electrónico'
                    })
                }
            } 
    
            const usuarioActualizado = await Usuario.findByIdAndUpdate(id, req.body, {new: true})
    
            res.status(200).json({data: usuarioActualizado})
        } catch (error) {
            console.error(error)
            res.status(500).json({mssagge: 'Error inesperado'})
        }
    } else {
        res.status(500).json({mssagge: 'Acceso denegado'})
    }
}

const remove = async (req, res) => {
    if(req.user) {
        try {
            const id = req.params.id
            const usuario = await Usuario.findByIdAndDelete(id)

            if(!usuario) {
                return res.status(404).json({message: 'Usuario no encontrado'})
            }
            
            res.status(204).json({message: 'Usuario eliminado'})
        } catch (error) {
            console.error(error)
            res.status(500).json({mssagge: 'Error inesperado'})
        }
    }
}

module.exports = {
    registrar,
    listar,
    getById,
    update,
    remove
}