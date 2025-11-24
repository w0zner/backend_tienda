const Usuario =  require('../models/usuario');
const Rol = require('../models/rol');
const bcrypt = require('bcrypt-nodejs')
const { v4: uuidv4 } = require('uuid');
const VerificacionCuentaUsuario = require('../models/verificacionCuentaUsuario');
const nodemailer = require('nodemailer');
require('dotenv').config();

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

const clientGetById = async (req, res) => {
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

const cliente_update = async (req, res) => {
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
            //Se vera despues estrategia para actualizar contraseña
            /*if(req.body.password) {
                const salt = bcrypt.genSaltSync()
                req.body.password = bcrypt.hashSync(req.body.password, salt)
            } */
    
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

const registroCliente = async (req, res) => {
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
                    const token = uuidv4();

                    await VerificacionCuentaUsuario.create({
                        userId: usuario._id,
                        token,
                        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24h
                    })

                    // Configurar nodemailer
                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'noreply.tiendita@gmail.com', 
                            pass:  process.env.EMAIL_SENDER_PASSWORD
                        },
                        tls: {
                          rejectUnauthorized: false  // Permite certificados autofirmados
                        }
                    });

                    const link = `http://localhost:5000/api/cuenta/verificacion-usuario?token=${token}`;

                    await transporter.sendMail({
                        from: 'noreply.tiendita@gmail.com',
                        to: data.email,
                        subject: 'Verifica tu cuenta',
                        html: `<p>Haz clic en el siguiente enlace para verificar tu cuenta de usuario:</p>
                               <p><a href="${link}" style="color:#1a73e8; text-decoration:none; font-weight:bold;">Verificar cuenta</a></p>`
                    });

                    //res.status(201).json({ message: 'Registro exitoso. Verifica tu email.' });

                    res.status(201)
                    .json({
                        data: usuario,
                        message: 'Registro exitoso. Verifica tu email.'
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

const verificarCuentaUsuario = async (req, res) => {
    console.log(req.query)
    try {
        const { token } = req.query;

        if (!token) {
            return res.status(400).json({ mensaje: 'Token no proporcionado' });
        }
    
        const verification = await VerificacionCuentaUsuario.findOne({ token, usado: false });
        if (!verification || verification.expiresAt < new Date()) {
          return res.status(400).send('Token inválido o expirado');
        }
    
        await Usuario.findByIdAndUpdate(verification.userId, { verificado: true });
        verification.usado = true;
        await verification.save();
    
        //res.send('Cuenta verificada correctamente');
        res.send(`
            <!DOCTYPE html>
            <html lang="es">
            <head>
              <meta charset="UTF-8">
              <title>Cuenta verificada</title>
              <style>
                body {
                  background: #f4f6f8;
                  font-family: Arial, sans-serif;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                  margin: 0;
                }
                .card {
                  background: white;
                  padding: 30px;
                  border-radius: 12px;
                  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                  text-align: center;
                }
                .card h1 {
                  color: #2ecc71;
                  margin-bottom: 10px;
                }
                .card p {
                  color: #333;
                  font-size: 16px;
                }
              </style>
            </head>
            <body>
              <div class="card">
                <h1>✅ ¡Cuenta verificada!</h1>
                <p>Tu cuenta ha sido verificada exitosamente.<br>
                Ya podés iniciar sesión con tu correo.</p>
              </div>
            </body>
            </html>
          `);
          
      } catch (err) {
        res.status(500).send('Error al verificar el email');
      }
}

module.exports = {
    registrar,
    listar,
    getById,
    update,
    remove,
    clientGetById,
    cliente_update,
    registroCliente,
    verificarCuentaUsuario
}