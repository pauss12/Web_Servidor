const express = require('express');

const { checkearComercio } = require('../middleware/rol');

const router = express.Router();

const { updateComercio } = require('../controllers/comercio');

const { validatorUpdateItemComercio, validatorCrearPaginaComercio, validatorGetPaginaComercio, validatorSubirTexto } = require('../validators/paginaComercio');

const { getPaginasComercio, createPaginaComercio, deletePaginaComercio, subirTextosComercio, getPaginaComercio, getPaginasComercioCiudad, getPaginasComercioCiudadActividad, updatePatchComercio } = require('../controllers/paginaComercio')

/**
 * @openapi
 * /api/paginaComercio:
 *  get:
 *      tags:
 *      - Merchant`s Page
 *      summary: Get all the merchants pages from the database
 *      description: ''
 *      responses:
 *          '200':
 *              description: Returns the pages from all the merchants
 *          '403':
 *              description: Error fetching merchants
 */
router.get('/', getPaginasComercio);

/**
 * @openapi
 * /api/paginaComercio/search/{city}:
 *  get:
 *      tags:
 *      - Merchant`s Page
 *      summary: Get all the merchants pages from the database with the city filter
 *      description: 'Receives the city as a parameter and returns the pages from all the merchants for which the city is true'
 *      parameters:
 *         -   name: city
 *             in: path
 *             required: true
 *             schema:
 *                 type: string
 *      responses:
 *          '200':
 *              description: Returns the pages from all the merchants for which the filter is true
 *          '403':
 *              description: Error fetching merchants
 */
router.get('/search/:city', getPaginasComercioCiudad);

/**
 * @openapi
 * /api/paginaComercio/search/{city}/{activity}:
 *  get:
 *      tags:
 *      - Merchant`s Page
 *      summary: Get all the merchants pages from the database with the city and activity filter
 *      description: 'Receives the city and activity as a parameter and returns the pages from all the merchants for which the city and activity are true'
 *      parameters:
 *         -  name: city
 *            in: path
 *            required: true
 *            schema:
 *                type: string
 *         -  name: activity
 *            in: path
 *            required: true
 *            schema:
 *                type: string
 *      responses:
 *          '200':
 *              description: Returns the pages from all the merchants for which the filters are true
 *          '403':
 *              description: Error fetching merchants
 */
router.get('/search/:city/:activity', getPaginasComercioCiudadActividad);

/**
*   @openapi
*  /api/paginaComercio/{id}:
*  get:
*      tags:
*      - Merchant`s Page
*      summary: Get a merchant page by id
*      description: Get a merchant page by id
*      parameters:
*          -   name: id
*              in: path
*              required: true
*              schema:
*                  type: string
*      responses:
*          '200':
*              description: Returns the merchant page
*          '403':
*              description: Error fetching Merchant Page
*/
router.get('/:id', validatorGetPaginaComercio, getPaginaComercio);

/**
*  @openapi 
*  /api/paginaComercio/createPage:
*   post:
*       tags:
*       - Merchant`s Page
*       summary: "Register a web page for a merchant"
*       description: Merchant registers his webpage in the Database
*       requestBody: 
*           content: 
*               application/json: 
*                   schema:
*                       $ref: "#/components/schemas/crearPaginaComercio"          
*       responses:
*           '200':
*               description: Returns the inserted object
*           '401':
*               description: Validation error 
* 
*       security:
*         - bearerAuth: []
*/
router.post('/createPage', checkearComercio, validatorCrearPaginaComercio, createPaginaComercio);

/**
*  @openapi 
*  /api/paginaComercio/textos/{id}:
*   post:
*       tags:
*       - Merchant`s Page
*       summary: "Post a text to the merchant's page"
*       description: Post a text to merchant's page 
*       requestBody: 
*           content: 
*               application/json: 
*                   schema:
*                       $ref: "#/components/schemas/subirTextos"          
*       responses:
*           '200':
*               description: Returns the inserted object
*           '401':
*               description: Validation error
*           '404':
*               description: Not found
* 
*       security:
*         - bearerAuth: []
*/
router.post('/textos/:id', checkearComercio, validatorSubirTexto, subirTextosComercio);

/** 
 * @openapi
 * /api/paginaComercio/{id}:
 *  put:
 *      tags:
 *      - Merchant`s Page
 *      summary: Update the city, activity, texts and photos from merchant page
 *      description: Update the city, activity, texts and photos from merchant page
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id that need to be updated
 *              required: true
 *              schema:
 *                  type: string
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/updatePaginaComercio"
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '403':
 *              description: Validation error
 *      security:
 *          - bearerAuth: []
 */
router.put('/:id', checkearComercio, validatorUpdateItemComercio, updateComercio);

//Modificar las reseñas o puntuacion de un comercio
/*router.patch('/:id', checkearComercio, updateReviewsComercio);*/

/**
*  @openapi 
*  /api/paginaComercio/{id}:
*   delete:
*       tags:
*       - Merchant`s Page
*       summary: "Delete Merchant`s Page by himself"
*       description: Merchant`s deletes his webpage from the Database
*       parameters:
*           -   name: id
*               in: path
*               required: true
*               schema:
*                   type: string
*       responses:
*           '200':
*               description: Page deleted successfully
*           '403':
*               description: Validation error 
* 
*       security:
*         - bearerAuth: []
*/
router.delete('/:id', checkearComercio, validatorGetPaginaComercio, deletePaginaComercio);

router.patch('/:id', checkearComercio, updatePatchComercio);

module.exports = router;