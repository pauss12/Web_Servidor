const express = require('express');

const { checkearComercio } = require('../middleware/rol');

const router = express.Router();

const { updateComercio } = require('../controllers/comercio');

const { validatorUpdateItemComercio, validatorCrearPaginaComercio } = require('../validators/paginaComercio');


const { getPaginasComercio, createPaginaComercio, deletePaginaComercio } = require('../controllers/paginaComercio')

router.get('/', getPaginasComercio);

//Get comercio por id
/*router.get('/:id', getPaginaComercio);*/

router.post('/createPage', validatorCrearPaginaComercio, createPaginaComercio);

//Crear comercio
/*router.post('/createPage', checkearComercio, validatorCrearPaginaComercio, createPaginaComercio);*/

//Modificar comercio siendo el dueño del comercio
router.put('/:id', checkearComercio, validatorUpdateItemComercio, updateComercio);

//Borrar comercio siendo el dueño del comercio
router.delete('/:id', checkearComercio, deletePaginaComercio);

module.exports = router;