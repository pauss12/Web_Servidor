const express = require("express")
const { registerCtrl, loginCtrl, updateUser } = require("../controllers/auth")

const { validatorRegister, validatorLogin } = require("../validators/auth")

const router = express.Router()

/**
*  @openapi 
*  /api/auth/register:
*   post:
*       tags:
*       - User
*       summary: "User registter"
*       description: Register a new user
*       requestBody: 
*           content: 
*               application/json: 
*                   schema:
*                       $ref: "#/components/schemas/register"          
*       responses:
*           '200':
*               description: Returns the inserted object
*           '401':
*               description: Validation error 
* 
*       security:
*         - bearerAuth: []
*/

//POST http://localhost:3000/api/auth/register
router.post("/register", validatorRegister, registerCtrl)

/**
 * @openapi
 * /api/auth/login:
 *  post:
 *      tags:
 *      - User
 *      summary: Login user
 *      description: ''
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/login"
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */

//POST http://localhost:3000/api/auth/login
router.post("/login", validatorLogin, loginCtrl)

module.exports = router