const { check } = require("express-validator")
const { validateResults } = require("../utils/handleValidator")

const validatorGetItem = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorGetUser = [
    check("username").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorCreateItem = [

    check("nombreUsuario").isString().notEmpty(),
    check("emailUsuario").isString(),
    check("passwordUsuario").isString().notEmpty(),
    check("edadUsuario").isNumeric().notEmpty(),
    check("ciudadUsuario").isString().notEmpty(),
    check("interesesUsuario").isArray().notEmpty(),
    check("permiteOfertas").isBoolean(),
    check("role").exists().isString().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
    
];

/*const validatorGetEmail = [
    check("email").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]*/

const validatorUpdateItem = [

    check("id").exists().notEmpty().isMongoId(),
    
    check("nombreDelUsuario").optional(),
    check("emailUsuario").optional(),
    check("passwordUsuario").optional(),
    check("edadUsuario").optional(),
    check("ciudadUsuario").optional(),
    check("interesesUsuario").optional(),
    check("permiteOfertas").optional(),
    check("permiteNotificaciones").optional(),
    check("tipoUsuario").optional(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

module.exports = { validatorGetItem, validatorGetUser, validatorUpdateItem, validatorCreateItem }