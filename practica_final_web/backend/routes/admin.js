const express = require('express');

const { checkRol } = require('../middleware/rol');

const { authMiddleware } = require("../middleware/session")

const router = express.Router();

const { createComercio } = require('../controllers/admin');

const { updateComercio, deleteComercio } = require('../controllers/comercio');

const { validatorCreateItem, validatorUpdateItemAdmin, validatorGetItem } = require('../validators/comercio');


//crear comercio
router.post('/', authMiddleware, checkRol(["admin"]), validatorCreateItem, createComercio);

//Modificar comercio siendo admin
router.put('/:id', authMiddleware, checkRol(["admin"]), validatorUpdateItemAdmin, updateComercio);

/**
 * @openapi
 * /api/admin/{id}:
 *  delete:
 *      tags:
 *      - Comercio
 *      summary: Delete merchant by admin
 *      description: Delete a merchant by an admin; checks the token we have in the header and after that, checks the role of the users whose token we have in the header and if it is admin, it will allow us to delete the merchant
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id that need to be deleted
 *              required: true
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 *      security:
 *          - bearerAuth: []
 */
router.delete('/:id', authMiddleware, checkRol(["admin"]), validatorGetItem, deleteComercio);

module.exports = router;