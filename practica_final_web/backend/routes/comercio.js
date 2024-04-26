const express = require('express');
const { checkRol, checkearComercio } = require('../middleware/rol');
const { authMiddleware } = require("../middleware/session")
const router = express.Router();

const { getComercios, getComercio, deleteComercio, updateComercio, createComercio } = require('../controllers/comercio');

const { validatorGetItem, validatorUpdateItemAdmin, validatorCreateItem } = require('../validators/comercio');

router.get('/', getComercios);

router.get('/:id', validatorGetItem, getComercio);

//crear comercio
router.post('/', authMiddleware, checkRol(["admin"]), validatorCreateItem, createComercio);

//Modificar comercio siendo admin
router.put('/:id', authMiddleware, checkRol(["admin"]), validatorUpdateItemAdmin, updateComercio);

//Borrar comercio siendo admin
router.delete('/:id', authMiddleware, checkRol(["admin"]), validatorGetItem, deleteComercio);

//Borrar comercio siendo el dueño del comercio
router.delete('/:id', checkearComercio, validatorGetItem, deleteComercio);

module.exports = router;