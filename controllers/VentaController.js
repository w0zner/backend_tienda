const Venta = require('../models/venta')
const Dventa = require('../models/dventa')

const registroVenta = async (req, res) => {
    if(req.user) {
        const dataVenta = req.body
        const dataDetalles = dataVenta.detalles
        let detallesGuardados = []

        const ventaGuardada = await Venta.create(dataVenta)

        dataDetalles.forEach(async element => {
            await Dventa.create(element)
            detallesGuardados.push(element)
        });

        res.status(200).send({venta: ventaGuardada, dventa: detallesGuardados})
    } else {
        res.status(500).send({message: 'NoAccess'})
    }
}

module.exports = {
    registroVenta
}