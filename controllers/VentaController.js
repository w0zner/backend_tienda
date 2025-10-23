const Venta = require('../models/venta')
const Dventa = require('../models/dventa')
const Producto = require('../models/producto')
const Carrito = require('../models/carrito')

const registroVenta = async (req, res) => {
    if(req.user) {
        const dataVenta = req.body
        const dataDetalles = dataVenta.detalles
        //let detallesGuardados = []
        let serie;
        let correlativo;
        let nventas;
        const ventaLast = await Venta.find().sort({createdAt: -1}).limit(1)

        if(ventaLast.length == 0) {
            serie = '001';
            correlativo = '0000001';
            nventas = serie + '-' + correlativo
        } else {
            const lastF = ventaLast[0].nventa.split('-') 

            if(lastF[1] != '9999999') {
                const obteniendoCorrelativo = parseInt(lastF[1]) + 1
                const nuevoCorrelativo = zfill(obteniendoCorrelativo, 7)
                nventas = lastF[0] + '-' + nuevoCorrelativo
            } else if(lastF[1] == '9999999') {
                const obteniendoSerie = parseInt(lastF[0]) + 1
                const nuevoCorrelativo = '0000001'
                const nuevaSerie = zfill(obteniendoSerie, 3)
                nventas = nuevaSerie + '-' + nuevoCorrelativo
            }
        }

        dataVenta.nventa = nventas
        dataVenta.estado = 'Procesando'

        console.log(dataVenta)
        const ventaGuardada = await Venta.create(dataVenta)

        dataDetalles.forEach(async element => {
            element.venta = ventaGuardada._id
            await Dventa.create(element)

            //Actualizamos el stock del producto
            const elementProducto = await Producto.findById({_id: element.producto})
            const newStock = elementProducto.stock - element.cantidad;

            await Producto.findByIdAndUpdate({_id: element.producto}, {stock: newStock})

            await Carrito.remove({usuario: dataVenta.usuario})
        });

        res.status(200).send({venta: ventaGuardada}) 
    } else {
        res.status(500).send({message: 'NoAccess'})
    }
}

function zfill(number, width) {
    var numberOutput = Math.abs(number); 
    var length = number.toString().length;
    var zero = "0";
    
    if (width <= length) {
        if (number < 0) {
             return ("-" + numberOutput.toString()); 
        } else {
             return numberOutput.toString(); 
        }
    } else {
        if (number < 0) {
            return ("-" + (zero.repeat(width - length)) + numberOutput.toString()); 
        } else {
            return ((zero.repeat(width - length)) + numberOutput.toString()); 
        }

    }
}

const obtenerVentasPorUsuario = async (req, res) => {
    try {
        const usuario = req.params['id']

        const reg = await Venta.find({usuario: usuario}).sort({createdAt: -1})

        if(reg.length >= 1) {
            res.status(200).send({data:reg})
        } else {
            res.status(200).send({data:undefined})
        }

    } catch(error) {
        console.error(error)
        res.status(500).json({message: 'Error '+error.message})
    }
}

module.exports = {
    registroVenta,
    obtenerVentasPorUsuario
}