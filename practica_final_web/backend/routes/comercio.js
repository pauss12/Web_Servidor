const express = require('express');

const { checkearComercio } = require('../middleware/rol');

const router = express.Router();

const { getComercios, getComercio, deleteComercio, loginComercio } = require('../controllers/comercio');

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

/** 
 * @openapi
 * /api/api/comercio/loginComercio:
 *  post:
 *      tags:
 *      - Admin
 *      summary: Login Merchant
 *      description: Login a Merchant; checks the token we have in the header and after that, checks the role of the users whose token we have in the header and if it is admin, it will allow us to create the merchant
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/loginComercio"
 *      responses:
 *          '200':
 *              description: Returns the inserted object and the token of the merchant created
 *          '403':
 *              description: Validation error
 *      security:
 *          - bearerAuth: []
 */
router.post('/loginComercio', checkearComercio, validatorLoginComercio, loginComercio);


module.exports = router;