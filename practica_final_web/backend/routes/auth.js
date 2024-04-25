const express = require("express")
const router = express.Router()

const { registerControl, loginControl } = require("../controllers/auth")

/**
*  @openapi 
*  /api/auth/register:
*   post:
*       tags:
*       - User
*       summary: "User registter"
*       description: Register a new user in the Database
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
const { validatorRegister, validatorLogin } = require("../validators/auth")

router.post("/register", validatorRegister, registerControl)

router.post("/login", validatorLogin, loginControl)

module.exports = router