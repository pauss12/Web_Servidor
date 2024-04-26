const express = require('express');

const { checkearComercio } = require('../middleware/rol');

const router = express.Router();

const { validatorUpdateItemComercio, validatorCrearPaginaComercio } = require('../validators/paginaComercio');


const { getPaginasComercio } = require('../controllers/paginaComercio')

router.get('/', getPaginasComercio);

//Crear comercio
router.post('/createPage', checkearComercio, validatorCrearPaginaComercio, createPaginaComercio);

//Modificar comercio siendo el dueño del comercio
/*router.put('/:id', checkearComercio, validatorUpdateItemComercio, updatePaginaComercio);*/

module.exports = router;