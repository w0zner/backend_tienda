const addDefaultData = (req, res, next) => {
    req.body.verificado= true;
    req.body.password = '12345'; // Valor predeterminado
    req.body.rol = 'USER'
    next()
}

const addDefaultClientData = (req, res, next) => {
    req.body.rol = 'USER'
    next()
}

module.exports = { addDefaultData, addDefaultClientData }