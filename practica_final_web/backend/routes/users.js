const express = require("express")
const router = express.Router()

const { getUser, deleteItem, updateItem } = require("../controllers/users")

const { authMiddleware } = require("../middleware/session")

const { validatorGetItem, validatorUpdateItem, validatorGetUserCity } = require("../validators/users")

const { checkearComercio } = require("../middleware/rol")

/**
 * @openapi
 * /api/users/{city}:
 *  get:
 *      tags:
 *      - User
 *      summary: Get Users by city
 *      description: Get Users by city with the recibirOfertas "true"
 *      parameters:
 *         -   name: city
 *             in: path
 *             required: true
 *             schema:
 *                 type: string
 *      responses:
 *          '200':
 *              description: Returns the pages from all the merchants with the city filter
 *          '403':
 *              description: Error fetching merchants
 *      security:
 */
router.get('/:city', checkearComercio, validatorGetUserCity, getUser)

/** 
 * @openapi
 * /api/users/{id}:
 *  put:
 *      tags:
 *      - User
 *      summary: Update User
 *      description: Update User
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
 *                      $ref: "#/components/schemas/updateUser"
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '403':
 *              description: Validation error
 *      security:
 *          - bearerAuth: []
 */
router.put('/:id', authMiddleware, validatorUpdateItem, updateItem)

/**
*  @openapi 
*  /api/users/{id}:
*   delete:
*       tags:
*       - User
*       summary: "Delete User"
*       description: "Delete User"
*       parameters:
*           -   name: id
*               in: path
*               required: true
*               schema:
*                   type: string
*       responses:
*           '200':
*               description: User deleted successfully
*           '403':
*               description: Validation error 
* 
*       security:
*         - bearerAuth: []
*/
router.delete("/:id", authMiddleware, validatorGetItem, deleteItem)

module.exports = router