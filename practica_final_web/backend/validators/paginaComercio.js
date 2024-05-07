const { check } = require("express-validator")
const { validateResults } = require("../utils/handleValidator")


const validatorGetPaginaComercio = [

    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorCrearPaginaComercio = [

    check("titulo").optional().notEmpty().isString(),
    check("ciudadComercio").optional().notEmpty(),
    check("actividadComercio").optional().notEmpty(),
    check("resumenComercio").optional().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorUpdateItemComercio = [

    //Checkear el id de mongo
    check("id").exists().notEmpty().isMongoId(),

    check("idPagina").optional().notEmpty().isNumeric(),
    check("titulo").optional().notEmpty().isString(),
    check("ciudadComercio").optional().notEmpty(),
    check("actividadComercio").optional().notEmpty(),
    check("resumenComercio").optional().notEmpty().isString(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorSubirTexto = [

    check("id").exists().notEmpty().isMongoId(),
    check("textos").exists().notEmpty().isArray(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorPatchComercio = [

    check("id").exists().notEmpty().isMongoId(),
    check("puntuacion").optional().notEmpty().isNumeric(),
    check("comentarios").optional().notEmpty().isString(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = { validatorCrearPaginaComercio, validatorUpdateItemComercio, validatorGetPaginaComercio, validatorSubirTexto, validatorPatchComercio }