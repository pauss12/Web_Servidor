const express = require("express")
const router = express.Router()

const { registerControl, loginControl } = require("../controllers/auth")
const { validatorRegister, validatorLogin } = require("../validators/auth")

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
*                       $ref: "#/components/schemas/registerUser"          
*       responses:
*           '200':
*               description: Returns the inserted object
*           '401':
*               description: Validation error 
*       security:
*         - bearerAuth: []
*/
router.post("/register", validatorRegister, registerControl)

/**
*  @openapi 
*  /api/auth/login:
*   post:
*       tags:
*       - User
*       summary: "User Login"
*       description: Login a user from the Database
*       requestBody: 
*           content: 
*               application/json: 
*                   schema:
*                       $ref: "#/components/schemas/loginUser"          
*       responses:
*           '200':
*               description: Returns the token and the user data
*           '401':
*               description: Validation error 
*/
router.post("/login", validatorLogin, loginControl)

module.exports = router