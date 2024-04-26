const express = require('express');

const { checkearComercio } = require('../middleware/rol');

const router = express.Router();

const { updateComercio } = require('../controllers/comercio');

const { validatorUpdateItemComercio, validatorCrearPaginaComercio } = require('../validators/paginaComercio');


const { getPaginasComercio, createPaginaComercio } = require('../controllers/paginaComercio')

router.get('/', getPaginasComercio);

router.post('/createPage', validatorCrearPaginaComercio, createPaginaComercio);

//Crear comercio
/*router.post('/createPage', checkearComercio, validatorCrearPaginaComercio, createPaginaComercio);*/

//Modificar comercio siendo el dueño del comercio
router.put('/:id', checkearComercio, validatorUpdateItemComercio, updateComercio);

module.exports = router;