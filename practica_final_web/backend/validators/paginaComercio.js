const { check } = require("express-validator")
const { validateResults } = require("../utils/handleValidator")

const validatorCrearPaginaComercio = [

    check("id").exists().notEmpty().isMongoId(),
    check("ciudad").exists().notEmpty().isString(),
    check("actividad").exists().notEmpty().isString(),
    check("titulo").exists().notEmpty().isString(),
    check("resumen").exists().notEmpty().isString(),
    check("textos").optional().isArray(),
    check("fotos").optional().isArray(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorUpdateItemComercio = [

    //Checkear el id de mongo
    check("id").exists().notEmpty().isMongoId(),

    check("idPagina").optional().notEmpty().isNumeric(),
    check("ciudad").optional().notEmpty(),
    check("actividad").optional().notEmpty(),
    check("textos").optional().isArray(),
    check("fotos").optional().isArray(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = { validatorCrearPaginaComercio, validatorUpdateItemComercio }