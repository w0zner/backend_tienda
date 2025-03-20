'use strict'

const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

//importamos las rutas
const cliente_route = require('./routes/cliente');

//definimos puerto e inicializamos express
const port = process.env.PORT || 5201;
const app = express();

//hacemos conexión a la base de datos, si es correcto inicia el servidor
mongoose.connect('mongodb://127.0.0.1:59406/735d2be1-c23f-4f89-bee4-a9a59c4e9193?')
        .then(() => {
            app.listen(port, () => {
                console.info('Server running in port ' + port)
            })
        })
        .catch((err) => console.error(err))

//implementación de un log        
app.use(morgan("dev"));        

//configuraciones para tratar con json        
app.use(bodyparser.urlencoded({extended: true}))        
app.use(bodyparser.json({limit:'50mb', extended: true}))

//configuraciones para las cabeceras y evitar cors
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

//definición de rutas
app.use('/api/clientes', cliente_route);

module.exports = app;