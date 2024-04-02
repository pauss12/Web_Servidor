const express = require("express")
const router = express.Router()
const { getUsers, getUser, createUser } = require("../controllers/users")

const { updateUser, changeRole } = require("../controllers/users")
const { authMiddleware } = require("../Middleware/session")

const { validatorGetItem } = require("../validators/tracks")

const checkRol = require("../Middleware/rol")

/**
 * @openapi
 * /api/users:
 *  get:
 *      tags:
 *      - User
 *      summary: Get users in the System
 *      description: ''
 *      responses:
 *          '200':
 *              description: Returns the users
 *          '500':
 *              description: Server error
 */
router.get("/", getUsers)

/**
*   @openapi
*  /api/users/{id}:
*  get:
*      tags:
*      - User
*      summary: Get user by id
*      description: Get a user by id
*      parameters:
*          -   name: id
*              in: path
*              description: id that need to be fetched
*              required: true
*              schema:
*                  type: string
*      responses:
*          '200':
*              description: Returns the user
*          '500':
*              description: Server error
*/
router.get("/:id", getUser)

/**
 *  @openapi 
 *  /api/users/createUser:
 *  post:
 *      tags:
 *          - User
 *            summary: "Create Iser"
 *            description: Create a new user
 *           requestBody:
 *               content:
 *                  application/json:
 *                     schema:
 *                         $ref: "#/components/schemas/user"
 *           responses:
 *             '200':* description: Returns the inserted object
 *            '401':* description: Validation error
 * 
 *           security:
 *             - bearerAuth: []
 */

router.post("/", createUser)

/** 
 * @openapi
 * /api/auth/update/{id}:
 *  put:
 *      tags:
 *      - User
 *      summary: Update user
 *      description: Update a user by an admin
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
 *                      $ref: "#/components/schemas/user"
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 *      security:
 *          - bearerAuth: []
 */
router.put("/:id", authMiddleware, checkRol(["admin"]), validatorGetItem, changeRole)

module.exports = router