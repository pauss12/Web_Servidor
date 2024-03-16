const { check } = require("express-validator")
const { validateResults } = require("../utils/handleValidator")

const validatorGetItem = [

    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorCreateItem = [

    check("cifComercio").exists().notEmpty().isString(),
    check("nombreComercio").exists().notEmpty().isString(),
    check("direccion").exists().notEmpty().isString(),
    check("telefono").exists().notEmpty().isString(),
    check("email").exists().notEmpty().isString(),
    check("activo").exists().notEmpty().isBoolean(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }

] 

module.exports = {
    validatorGetItem,
    validatorCreateItem
}