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

const validatorUpdateItem = [

    //Checkear el id de mongo
    check("id").exists().notEmpty().isMongoId(),
    //Checkear si el resto como opcional
    check("nombreComercio").optional().notEmpty(),
    check("cifComercio").optional().notEmpty(),
    check("direccion").optional().notEmpty(),
    check("email").optional().notEmpty(),
    check("telefonoContacto").optional().notEmpty(),
    check("idPagina").optional().notEmpty(),
    check("ciudad").optional().notEmpty(),
    check("actividad").optional().notEmpty(),
    check("textos").optional(),
    check("fotos").optional(),
    check("scoring").optional(),
    check("numeroPuntuaciones").optional(),
    check("reseñas").optional(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }

]

module.exports = { validatorGetItem, validatorCreateItem, validatorUpdateItem }