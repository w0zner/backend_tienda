const addDefaultData = (req, res, next) => {
    req.body.password = '12345'; // Valor predeterminado
    req.body.rol = 'USER'
    next()
}

module.exports = { addDefaultData }