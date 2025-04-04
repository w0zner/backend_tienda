const genericMessage = (evento, nombreClase) => {
    message = null
    switch (evento) {
        case 'add':
           message = 'El ' + nombreClase + ' se ha registrado con éxito!' 
           break;

        case 'update':
            message = 'El ' + nombreClase + ' se ha actualizado con éxito!' 
            break;

        case 'remove':
                message = 'El ' + nombreClase + ' se ha eliminado con éxito!' 
                break;
    
        default:
            break;
    }
    return message;
}

module.exports = {
    genericMessage,
    producto: {
      NOT_FOUND: 'No se encontró el producto',
    },
    config: {
        NOT_FOUND: 'No se encontró la configuración',
      },
    coupon: {
      NOT_FOUND: 'No se encontró el cupón',
      EXPIRED: 'El cupón ha expirado',
      ALREADY_USED: 'El cupón ya fue usado',
    },
    auth: {
      INVALID_CREDENTIALS: 'Credenciales inválidas',
      UNAUTHORIZED: 'No autorizado',
    },
    general: {
      SERVER_ERROR: 'Error inesperado del sistema',
      NOT_FOUND: 'Recurso no encontrado',
    }

  };