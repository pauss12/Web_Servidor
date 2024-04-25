const express = require("express")
const router = express.Router()

const { registerControl, loginControl } = require("../controllers/auth")

const { validatorRegister, validatorLogin } = require("../validators/auth")

router.post("/register", validatorRegister, registerControl)

router.post("/login", validatorLogin, loginControl)

module.exports = router