const { check } = require("express-validator")
const { validateResults } = require("../utils/handleValidator")

const validatorGetItem = [

    check("cifComercio").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorCreateItem = [

    check("nombreComercio").exists().notEmpty().isString(),
    check("cifComercio").exists().notEmpty().isString(),
    check("direccion").exists().notEmpty().isString(),
    check("email").exists().notEmpty().isString(),
    check("telefonoContacto").exists().notEmpty().isString(),
    check("idPagina").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }

] 

module.exports = { validatorGetItem, validatorCreateItem }