const express = require("express")

const router = express.Router();

const uploadMiddleware = require("../utils/handleStorage")

const { validatorGetPaginaComercio } = require("../validators/paginaComercio")

const { createItem, getFotosStorage, getFotoStorage } = require("../controllers/storage");
const { validatorGetItem } = require("../validators/comercio");

router.get('/photos', getFotosStorage);

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