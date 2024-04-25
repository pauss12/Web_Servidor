const { check } = require("express-validator")
const { validateResults } = require("../utils/handleValidator")

const validatorRegister = [

    check("nombreUsuario").exists().notEmpty().isLength({ min: 3, max: 99 }),
    check("emailUsuario").isString(),
    check("passwordUsuario").exists().notEmpty().isLength({ min: 8, max: 16 }),
    check("edadUsuario").isNumeric().notEmpty(),
    check("ciudadUsuario").isString().notEmpty(),
    check("interesesUsuario").isArray().notEmpty(),
    check("permiteOfertas").isBoolean(),   
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorLogin = [
    
    check("emailUsuario").exists().notEmpty().isEmail(),
    check("passwordUsuario").exists().notEmpty().isLength({ min: 8, max: 16 }),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = { validatorRegister, validatorLogin }