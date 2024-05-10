const express = require("express")

const router = express.Router();

const uploadMiddleware = require("../utils/handleStorage")

const { validatorGetPaginaComercio } = require("../validators/paginaComercio")

const { createItem, getFotosStorage, getFotoStorage } = require("../controllers/storage");
const { validatorGetItem } = require("../validators/comercio");

/**
 * @openapi
 * /api/storage/photos:
 *  get:
 *      tags:
 *      - Storage
 *      summary: Get the photos from the database
 *      description: 'Get all the photos that have been uploded to the database'
 *      responses:
 *          '200':
 *              description: Returns the photos from the database
 *          '403':
 *              description: Error fetching photos
 */
router.get('/photos', getFotosStorage);

/**
*   @openapi
*  /api/storage/photos/{id}:
*  get:
*      tags:
*      - Storage
*      summary: Get a photo from the Storage`s database by id
*      description: Get a photo from the Storage`s database by id
*      parameters:
*          -   name: id
*              in: path
*              required: true
*              schema:
*                  type: string
*      responses:
*          '200':
*              description: Returns the photo
*          '403':
*              description: Error fetching Photo
*/
router.get('/photos/:id', validatorGetItem, getFotoStorage);

/**
*  @openapi 
*  /api/paginaComercio/photos/{id}:
*   post:
*       tags:
*       - Storage
*       summary: "Post a photo to the merchant's page"
*       description: Post a photo to merchant's page with the photo's url
*       requestBody: 
*           content: 
*               application/json: 
*                   schema:
*                       $ref: "#/components/schemas/subirFotos"          
*       responses:
*           '200':
*               description: Returns the created
*           '403':
*               description: Validation error
*           '404':
*               description: Not found
* 
*       security:
*         - bearerAuth: []
*/
router.post("/photos/:id", uploadMiddleware.single("image"), validatorGetPaginaComercio, createItem)

module.exports = router