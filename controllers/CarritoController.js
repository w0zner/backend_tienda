const carrito= require('../models/carrito');

const agregar_al_carrito = async function(req, res){
    if(req.user){
        let data = req.body;

        const existingCartItem = await carrito.find({ producto: data.producto, usuario: data.usuario});

        if(existingCartItem.length == 0){
            let reg = await carrito.create(data);
            res.status(201).send({data: reg}); 
        } else if(existingCartItem.length >= 1){
            res.status(200).send({data: undefined});  
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const obtener_carrito_por_usuario = async function(req, res){
    if(req.user){
        const id = req.params['id'];

        const carritoUsuario = await carrito.find({ usuario: id }).populate('producto');
        res.status(201).send({data: carritoUsuario}); 
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}

const eliminar_item_carrito = async (req, res) => {
    if(req.user){
        try {
            let id = req.params['id'];

            let reg = await carrito.findByIdAndDelete({_id: id});
            res.status(200).send({data: reg});
        } catch (error) {
            console.log(error)
            res.status(500).send({message: 'Error del servidor'});
        }
    } else {
        res.status(500).send({message: 'NoAccess'});
    }
}

module.exports = {
    agregar_al_carrito,
    obtener_carrito_por_usuario,
    eliminar_item_carrito
}