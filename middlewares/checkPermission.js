const checkPermission = (permisoKey) => {
  return (req, res, next) => {
    try {
      console.log('USUARIO ', req.user)
      const permisos = req.user.permisos;
      console.log('permisos  ', permisos)
      console.log('permisoKey  ', permisoKey)
      if (!permisos.includes(permisoKey)) {
        return res.status(403).json({ message: 'No autorizado' });
      }

      next();
    } catch(error) {
        console.error(error)
        res.status(500).json({
            message: 'Error ' + error.message
        })
    }
  };
};

module.exports = checkPermission;
