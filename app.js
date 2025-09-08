'use strict'

const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

//importamos las rutas
const login_route = require('./routes/login');
const usuario_route = require('./routes/usuario');
const verificacion_route = require('./routes/verificacion');
const rol_route = require('./routes/rol')
const cupon_route = require('./routes/cupon')
const config_route = require('./routes/config')
const producto_route = require('./routes/producto')
const carrito_route = require('./routes/carrito')

//definimos puerto e inicializamos express
const port = process.env.PORT || 5000;
const app = express();

//Implementacion de socket
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {origin:"*"}
})

io.on('connection', function(socket){
    console.log("Cliente conectado:", socket.id);
    socket.on('delete-carrito', function(data){
        io.emit('new-carrito', data);
        console.log(data);
    })
})

//hacemos conexión a la base de datos, si es correcto inicia el servidor
mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            server.listen(port, () => {
                console.info('Server running in port ' + port)
            })
        })
        .catch((err) => console.error(err))

//implementación de un log        
app.use(morgan("dev"));        

//configuraciones para tratar con json        
app.use(bodyparser.urlencoded({extended: true}))        
app.use(bodyparser.json({limit:'50mb', extended: true}))

app.use(cookieParser());

//configuraciones para las cabeceras y evitar cors
const corsOptions = {
    origin: '*',//['http://localhost:6200', 'http://localhost:5200', 'http://localhost:4200'],  // El origen de tu aplicación frontend Angular
    //credentials: true,  // Importante para permitir cookies
    allowedHeaders: ['Authorization', 'X-API-KEY', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Access-Control-Allow-Request-Method'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
};
  
app.use(cors(corsOptions));  // Usar la configuración CORS


// app.use((req,res,next)=>{
//     res.header('Access-Control-Allow-Origin','*'); 
//     res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
//     res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
//     res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
//     next();
// });

//definición de rutas
const prefix = '/api'
app.use(prefix + '/login', login_route);
app.use(prefix + '/usuarios', usuario_route);
app.use(prefix + '/cuenta', verificacion_route);
app.use(prefix + '/roles', rol_route);
app.use(prefix + '/cupones', cupon_route);
app.use(prefix + '/config', config_route);
app.use(prefix + '/productos', producto_route);
app.use(prefix + '/carrito', carrito_route);

module.exports = app;