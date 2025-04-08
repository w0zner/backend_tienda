const verifyEndpoint = (req, res, next) => {
    let ip = req.ip;
    const ipsPermitidas = ['127.0.0.1', '::1']; // Localhost
    
    if(ip.endsWith(ipsPermitidas[0])){
       ip=ipsPermitidas[0]
    } else if(ip.endsWith(ipsPermitidas[1])) {
        ip=ipsPermitidas[1]
    }

    console.log(ip)
    if (!ipsPermitidas.includes(ip)) {
        return res.status(403).send('No autorizado');
    }
    next()
}

const hideHeader = (req, res, next) => {
    if (req.headers['x-secret-key'] !== '54321') {
        return res.status(403).send('Sin acceso al recurso');
      }
      next();
}

module.exports = { verifyEndpoint, hideHeader }