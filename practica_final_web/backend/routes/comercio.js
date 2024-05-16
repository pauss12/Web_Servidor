const express = require('express');

const { checkearComercio } = require('../middleware/rol');

const { authMiddleware } = require("../middleware/session")

const router = express.Router();

const { getComercios, getComercio, loginComercio } = require('../controllers/comercio');

const { validatorGetItem, validatorLoginComercio } = require('../validators/comercio');

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
router.get('/', authMiddleware, getComercios);

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
router.get('/:id', authMiddleware, validatorGetItem, getComercio);

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

//checkear q el id que le paso en la peticion, sea el mismo que esta en el token.en el controller


module.exports = router;