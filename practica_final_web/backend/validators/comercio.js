const { check } = require("express-validator")
const { validateResults } = require("../utils/handleValidator")

const validatorGetItem = [

    check("id").exists().notEmpty().isMongoId(),
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
    check("ciudad").exists().notEmpty().isString(),
    check("actividad").exists().notEmpty().isString(),
    check("textos").exists().isArray(),
    check("fotos").exists().isArray(),
    check("scoring").exists(),
    check("numeroPuntuaciones").exists(),
    check("reseñas").exists().isArray(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }

]

const validatorUpdateComercio = [

    //Checkear el id de mongo
    check("id").exists().notEmpty().isMongoId(),
    //Checkear si el resto como opcional
    check("nombreComercio").optional().notEmpty().isString(),
    check("cifComercio").optional().notEmpty().isString(),
    check("direccion").optional().notEmpty().isString(),
    check("email").optional().notEmpty().isString(),
    check("telefonoContacto").optional().notEmpty().isString(),
    check("idPagina").optional().notEmpty(),
    check("ciudad").optional().notEmpty().isString(),
    check("actividad").optional().notEmpty().isString(),
    check("textos").optional().isArray(),
    check("fotos").optional().isArray(),
    check("scoring").optional(),
    check("numeroPuntuaciones").optional(),
    check("reseñas").optional().isArray(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }

]

module.exports = { validatorGetItem, validatorCreateItem, validatorUpdateComercio }