// llamamos al router de express
const router = require('express').Router();
//así traemos un controlador
const userController = require('../../controllers/UserController.js');
//instanciamos bcrypt para encriptar la contraseña
const bcrypt = require('bcryptjs');

router.get('/list', userController.listar);
router.post('/register', userController.register);
router.post('/signin', userController.signin);

module.exports = router;