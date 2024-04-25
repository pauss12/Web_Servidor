const express = require('express');

const { checkRol } = require('../middleware/rol');

const { authMiddleware } = require("../Middleware/session")

const router = express.Router();

const { getComercios, getComercio, deleteComercio, updateComercio, createComercio } = require('../controllers/comercio');

const { validatorGetItem, validatorUpdateItem, validatorCreateItem } = require('../validators/comercio');

router.get('/', getComercios);

router.get('/:id', validatorGetItem, getComercio);

router.post('/', checkRol["admin"], validatorCreateComercio, createComercio);
//router.post('/', validatorCreateItem, createComercio);

router.put('/:id', validatorUpdateItem, updateComercio);

router.delete('/:id', validatorGetItem, deleteComercio);

module.exports = router;