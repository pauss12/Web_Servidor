const express = require('express');

const router = express.Router();

const { getComercios, getComercio, deleteComercio, updateComercio, createComercio } = require('../controllers/comercio');

const { validatorGetItem, validatorCreateItem, validatorUpdateComercio } = require('../validators/comercio');

router.post('/', validatorCreateItem, createComercio);

router.get('/', getComercios);

router.get('/:id', validatorGetItem, getComercio);

router.put('/:id', validatorUpdateComercio, updateComercio);

router.delete('/:id', validatorGetItem, deleteComercio);

module.exports = router;