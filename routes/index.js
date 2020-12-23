// instanciamos el router de express
const router = require('express').Router();
// aquí van los manejadores de cada una de las rutas.
const apiRouterUser = require('./api/users.js');

router.use('/auth', apiRouterUser);

module.exports = router;