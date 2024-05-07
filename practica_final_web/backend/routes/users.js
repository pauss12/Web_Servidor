const express = require("express")
const router = express.Router()

const { getItems, getItem, getUser, deleteItem, updateItem } = require("../controllers/users")

const { authMiddleware } = require("../middleware/session")

const { validatorGetItem, validatorGetUser, validatorUpdateItem } = require("../validators/users")

//const { uploadMiddlewareUsuario } = require("../utils/handleStorage")

/**
 * @openapi
 * /api/users:
 *  get:
 *      tags:
 *      - User
 *      summary: Get Users from the database
 *      description: ''
 *      responses:
 *          '200':
 *              description: Returns the Users
 *          '403':
 *              description: Error fetching Users
 */
router.get('/', getItems)

/**
*   @openapi
*  /api/users/{id}:
*  get:
*      tags:
*      - User
*      summary: Get a User by id
*      description: Get a User by id
*      parameters:
*          -   name: id
*              in: path
*              required: true
*              schema:
*                  type: string
*      responses:
*          '200':
*              description: Returns the User
*          '403':
*              description: Error fetching User
*/
router.get('/:id', validatorGetItem, getItem)

/*router.get("/users/:username", validatorGetUser, getUser)*/

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