const { check } = require("express-validator")
const { validateResults } = require("../utils/handleValidator")

const validatorGetItem = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorUpdateItem = [

    check("id").exists().notEmpty().isMongoId(),
    
    check("nombreUsuario").optional(),
    check("emailUsuario").optional(),
    check("passwordUsuario").optional(),
    check("edadUsuario").optional(),
    check("sexoUsuario").optional(),
    check("ciudadUsuario").optional(),
    check("interesesUsuario").optional(),
    check("permiteOfertas").optional(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

const validatorGetUserCity = [

    check("city").exists().notEmpty().isString(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = { validatorGetItem, validatorUpdateItem, validatorGetUserCity }