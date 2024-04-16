const express = require('express');
const router = express.Router();

const { getComercios, getComercio, deleteComercio, updateComercio, createComercio } = require('../controllers/comercio');

const { validatorGetComercio, validatorUpdateComercio, validatorCreateItem } = require('../validators/comercio');

router.post('/', createComercio);

router.get('/', getComercios);

router.get('/:id', getComercio);

/*router.post('/', validatorCreateItem, createComercio);*/



router.put('/:id', updateComercio);

/*router.delete("/:id", validatorGetComercio, deleteComercio);*/

module.exports = router;