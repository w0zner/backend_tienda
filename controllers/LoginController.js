const Usuario = require('../models/usuario');
const jwt = require('../helpers/jwt')
const jwtSimple = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')
const moment = require('moment')
require('dotenv').config();

const login_admin = async (req, res) => {
    const data = req.body;
    let usuarios_arr = [];

    usuarios_arr = await Usuario.find({email: data.email}).populate('rol')

    if(usuarios_arr.length == 0) {
        return res.status(404)
        .json({
            message: 'Usuario o Contraseña no encontrado.',
            data: undefined
        })
    } else {
        let user = usuarios_arr[0]

        if(user.rol.nombre == process.env.ROL_ADMIN  || 'ADMIN') {
            const passwordBD = bcrypt.compareSync(data.password, user.password);
            
            if(!passwordBD) {
                return res.status(404)
                .json({
                    message: 'Usuario o Contraseña incorrectos.',
                    data: undefined
                })
            }
    
            const accesToken = jwt.createToken(user)
            const refreshToken = jwt.refreshToken(user)

            // Guardar el refresh token en una cookie HttpOnly
            res.status(200)
            /*.cookie('refreshToken', refreshToken, {
              domain:'localhost',
              name:'refreshToken',
              httpOnly: true,
              secure: false, // Solo en HTTPS
              sameSite: 'None',//'Strict',
              expires: new Date(Date.now() + 3600000)
            })*/
            .json({
                message: 'Usuario logueado!',
                data: user,
                token: accesToken,
                refreshToken: refreshToken
            })
        } else {
            return res.status(403)
                .json({
                    message: 'No tienes el permiso para acceder a esta sección.',
                    data: undefined
                })
        }
    }
}

const refresh_admin = async (req, res) => {
  //console.log(req.cookies)

  const {refreshToken} = req.body//req.cookies.refreshToken;

  if (!refreshToken) return res.status(401).json({ message: 'No refresh token' });

  try {
    const decoded = jwtSimple.decode(refreshToken, process.env.SECRET);
    if (decoded.exp < moment().unix()) return res.status(403).json({ message: 'Refresh token expirado' });

    let usuarios_arr = [];

    usuarios_arr = await Usuario.find({email: decoded.email}).populate('rol')

    if(usuarios_arr.length == 0) {
        return res.status(404)
        .json({
            message: 'Usuario o Contraseña no encontrado.',
            data: undefined
        })
    } else {
        let user = usuarios_arr[0]

        if(user.rol.nombre == process.env.ROL_ADMIN || 'ADMIN') {
            //   const passwordBD = bcrypt.compareSync(data.password, user.password);
            
            //   if(!passwordBD) {
            //       return res.status(404)
            //       .json({
            //           message: 'Usuario o Contraseña incorrectos.',
            //           data: undefined
            //       })
            //   }
    
            const token = jwt.createToken(user)
    
            res.status(200)
            .json({
                message: 'Usuario logueado!',
                data: user,
                token: token
            })
        } else {
            return res.status(403)
                .json({
                    message: 'No tienes el permiso para acceder a esta sección.',
                    data: undefined
                })
        }
    } 
  } catch (error) {
    console.log(error)
    return res.status(401)
    .json({ message: 'Refresh token expirado' });
  }
}

const login = async (req, res) => {
    const data = req.body;
    let usuarios_arr = [];

    usuarios_arr = await Usuario.find({email: data.email}).populate('rol')

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

        
        const accesToken = jwt.createToken(user)
        const refreshToken = jwt.refreshToken(user)

        res.status(200)
        .json({
            message: 'Usuario logueado!',
                data: user,
                token: accesToken,
                refreshToken: refreshToken
        })
    }
}



module.exports = { login, login_admin, refresh_admin }