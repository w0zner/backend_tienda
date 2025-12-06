const Venta = require('../models/venta')
const Dventa = require('../models/dventa')
const Producto = require('../models/producto')
const Carrito = require('../models/carrito')

const registroVenta = async (req, res) => {
    if(req.user) {
        const dataVenta = req.body
        const dataDetalles = dataVenta.detalleVenta
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
        console.log(dataDetalles)
        const ventaGuardada = await Venta.create(dataVenta)

        dataDetalles.forEach(async element => {
            element.venta = ventaGuardada._id
            await Dventa.create(element)

            //Actualizamos el stock del producto
            const elementProducto = await Producto.findById({_id: element.producto})
            const newStock = elementProducto.stock - element.cantidad;

            await Producto.findByIdAndUpdate({_id: element.producto}, {stock: newStock})

            await Carrito.deleteMany({usuario: dataVenta.usuario})
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

const obtenerPorId = async (req, res) => {
    try {
        const id = req.params.id
        
        const venta= await Venta.findById(id)
        .populate('direccion')
        .populate('usuario');

        const detalles = await Dventa.find({ venta: id })
        .populate('producto');

        res.json({venta: venta, detalles: detalles})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Error '+error.message})
    }
}

const obtenerVentas = async (req, res) => {
    try {
        const desde = req.params['desde']
        const hasta = req.params['hasta']
        let fechaInicio = null;
        let fechaFin = null;
        

        console.log('fecha inicio', desde)
        console.log('fecha fin', fechaFin)

        let filtro = {}
        console.log(desde.length)
        if(desde && desde != 'undefined') {
            fechaInicio = new Date(desde + 'T00:00:00.000Z');
            if(hasta && hasta != 'undefined') {
                fechaFin = new Date(hasta + 'T00:59:00.000Z');
            } else {
                fechaFin = new Date();
            }

            filtro = {createdAt:{$gte: fechaInicio, $lte: fechaFin}}
        }

        console.log(filtro)
        
        const ventas = await Venta.find(filtro).populate('usuario').populate('direccion').sort({createdAt: -1})

        res.status(200).send({data:ventas}) 
    } catch(error) {
        console.error(error)
        res.status(500).json({message: 'Error '+error.message})
    }
}

const updateEstado = async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        console.log(id)
        console.log(data)
        const venta= await Venta.findByIdAndUpdate({_id: id}, {estado: data.value})

        res.json({data: venta})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Error '+error.message})
    }
}

const obtenerVentasPorNroVenta = async (req, res) => {
    try {
        const nroVenta = req.params['nroventa']
        
        console.log('nroVenta', nroVenta)

        const ventas = await Venta.find({nventa: nroVenta}).populate('usuario').populate('direccion').sort({createdAt: -1})

        res.status(200).send({data:ventas}) 
    } catch(error) {
        console.error(error)
        res.status(500).json({message: 'Error '+error.message})
    }
}

const obtenerVentasPorEstado = async (req, res) => {
    try {
        const estado = req.params['estado']
        
        console.log('estado', estado)

        const ventas = await Venta.find({estado: estado}).populate('usuario').populate('direccion').sort({createdAt: -1})

        res.status(200).send({data:ventas}) 
    } catch(error) {
        console.error(error)
        res.status(500).json({message: 'Error '+error.message})
    }
}

//KPI
const kpi_ganacias_mensuales = async (req, res) => {
    if(req.user.role == 'ADMIN') {
        try {
            let enero = 0;
            let febrero = 0;
            let marzo = 0;
            let abril = 0;
            let mayo = 0;
            let junio = 0;
            let julio = 0;
            let agosto = 0;
            let septiembre = 0;
            let octubre = 0;
            let noviembre = 0;
            let diciembre = 0;

            const current_date = new Date()
            const year = current_date.getFullYear()
            
            const ventas = await Venta.find({createdAt: {$gte: new Date(year, 0, 1), $lte: new Date(year, 11, 31)}})//.populate('usuario').populate('direccion').sort({createdAt: -1})


            for(let item of ventas) {
                const createdDate = new Date(item.createdAt)
                const month = createdDate.getMonth() + 1

                
                if(month == 1) {
                    enero += item.subtotal;
                } else if (month == 2) {
                    febrero += item.subtotal;
                } else if (month == 3) {
                    marzo += item.subtotal;
                } else if (month == 4) {
                    abril += item.subtotal;
                } else if (month == 5) {
                    mayo += item.subtotal;
                } else if (month == 6) {
                    junio += item.subtotal;
                } else if (month == 7) {
                    julio += item.subtotal;
                } else if (month == 8) {
                    agosto += item.subtotal;
                } else if (month == 9) {
                    septiembre += item.subtotal;
                } else if (month == 10) {
                    octubre += item.subtotal;
                } else if (month == 11) {
                    noviembre += item.subtotal;
                } else if (month == 12) {
                    diciembre += item.subtotal;
                }
            }

            res.status(200).send({enero: enero, febrero: febrero, marzo: marzo, abril: abril, mayo: mayo, junio: junio, julio: julio, agosto: agosto, septiembre: septiembre, octubre: octubre, noviembre: noviembre, diciembre: diciembre}) 
        } catch(error) {
            console.error(error)
            res.status(500).json({message: 'Error '+error.message})
        }
    } else {
        res.status(500).send({message: 'NoAccess'})
    }
}

const kpi_cantidad_ventas_mensuales = async (req, res) => {
    if(req.user.role == 'ADMIN') {
        try {
            let enero = 0;
            let febrero = 0;
            let marzo = 0;
            let abril = 0;
            let mayo = 0;
            let junio = 0;
            let julio = 0;
            let agosto = 0;
            let septiembre = 0;
            let octubre = 0;
            let noviembre = 0;
            let diciembre = 0;

            const current_date = new Date()
            const year = current_date.getFullYear()
            
            const ventas = await Venta.find({createdAt: {$gte: new Date(year, 0, 1), $lte: new Date(year, 11, 31)}})//.populate('usuario').populate('direccion').sort({createdAt: -1})


            for(let item of ventas) {
                const createdDate = new Date(item.createdAt)
                const month = createdDate.getMonth() + 1

                
                if(month == 1) {
                    enero += 1;
                } else if (month == 2) {
                    febrero += 1;
                } else if (month == 3) {
                    marzo += 1;
                } else if (month == 4) {
                    abril += 1;
                } else if (month == 5) {
                    mayo += 1;
                } else if (month == 6) {
                    junio += 1;
                } else if (month == 7) {
                    julio += 1;
                } else if (month == 8) {
                    agosto += 1;
                } else if (month == 9) {
                    septiembre += 1;
                } else if (month == 10) {
                    octubre += 1;
                } else if (month == 11) {
                    noviembre += 1;
                } else if (month == 12) {
                    diciembre += 1;
                }
            }

            res.status(200).send({enero: enero, febrero: febrero, marzo: marzo, abril: abril, mayo: mayo, junio: junio, julio: julio, agosto: agosto, septiembre: septiembre, octubre: octubre, noviembre: noviembre, diciembre: diciembre}) 
        } catch(error) {
            console.error(error)
            res.status(500).json({message: 'Error '+error.message})
        }
    } else {
        res.status(500).send({message: 'NoAccess'})
    }
}

module.exports = {
    registroVenta,
    obtenerVentasPorUsuario,
    obtenerPorId,
    obtenerVentas,
    updateEstado,
    obtenerVentasPorNroVenta,
    obtenerVentasPorEstado,
    kpi_ganacias_mensuales,
    kpi_cantidad_ventas_mensuales
}