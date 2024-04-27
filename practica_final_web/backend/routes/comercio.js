const express = require('express');
const { checkRol, checkearComercio } = require('../middleware/rol');
const { authMiddleware } = require("../middleware/session")
const router = express.Router();

const { getComercios, getComercio, deleteComercio, updateComercio, createComercio, loginComercio } = require('../controllers/comercio');

const { validatorGetItem, validatorUpdateItemAdmin, validatorCreateItem, validatorLoginComercio } = require('../validators/comercio');

//Obtener lista de comercios
router.get('/', getComercios);

//Obtener un comercio en especifico por id
router.get('/:id', validatorGetItem, getComercio);

//Login comercio
router.post('/loginComercio', checkearComercio, validatorLoginComercio, loginComercio);

//crear comercio
router.post('/', authMiddleware, checkRol(["admin"]), validatorCreateItem, createComercio);

//Modificar comercio siendo admin
router.put('/:id', authMiddleware, checkRol(["admin"]), validatorUpdateItemAdmin, updateComercio);

//Borrar comercio siendo admin
router.delete('/:id', authMiddleware, checkRol(["admin"]), validatorGetItem, deleteComercio);

//Borrar comercio siendo el dueño del comercio
router.delete('/:id', checkearComercio, validatorGetItem, deleteComercio);

module.exports = router;