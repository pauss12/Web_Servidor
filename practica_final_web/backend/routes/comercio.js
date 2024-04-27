const express = require('express');
const { checkRol, checkearComercio } = require('../middleware/rol');
const { authMiddleware } = require("../middleware/session")
const router = express.Router();

const { getComercios, getComercio, deleteComercio, updateComercio, createComercio, loginComercio } = require('../controllers/comercio');

const { validatorGetItem, validatorUpdateItemAdmin, validatorCreateItem, validatorLoginComercio } = require('../validators/comercio');

/**
 * @openapi
 * /api/comercio:
 *  get:
 *      tags:
 *      - Comercio
 *      summary: Get merchants from the database
 *      description: ''
 *      responses:
 *          '200':
 *              description: Returns the merchants
 *          '403':
 *              description: Error fetching merchants
 */
router.get('/', getComercios);

/**
*   @openapi
*  /api/comercio/{id}:
*  get:
*      tags:
*      - Comercio
*      summary: Get a merchant by id
*      description: Get a merchant by id
*      parameters:
*          -   name: id
*              in: path
*              required: true
*              schema:
*                  type: string
*      responses:
*          '200':
*              description: Returns the merchant
*          '403':
*              description: Error fetching Merchant
*/
router.get('/:id', validatorGetItem, getComercio);

//Login comercio
router.post('/loginComercio', checkearComercio, validatorLoginComercio, loginComercio);

//crear comercio
router.post('/', authMiddleware, checkRol(["admin"]), validatorCreateItem, createComercio);

//Modificar comercio siendo admin
router.put('/:id', authMiddleware, checkRol(["admin"]), validatorUpdateItemAdmin, updateComercio);

/**
 * @openapi
 * /api/comercio/{id}:
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

/**
 * @openapi
 * /api/comercio/{id}:
 *  delete:
 *      tags:
 *      - Comercio
 *      summary: Delete merchant himself
 *      description: Delete a merchant himself; checks the token we have in the header and after that, checks if the ID from the token is the same as the ID from the URL, if it is, it will allow us to delete the merchant
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
router.delete('/:id', checkearComercio, validatorGetItem, deleteComercio);

module.exports = router;