const { check } = require("express-validator")
const { validateResults } = require("../utils/handleValidator")



const validatorCrearPaginaComercio = [

    
    check("idPagina").optional().notEmpty().isNumeric(),
    check("titulo").optional().notEmpty().isString(),
    check("ciudadComercio").optional().notEmpty(),
    check("actividadComercio").optional().notEmpty(),
    check("resumenComercio").optional().notEmpty(),
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
    check("titulo").optional().notEmpty().isString(),
    check("ciudadComercio").optional().notEmpty(),
    check("actividadComercio").optional().notEmpty(),
    check("resumenComercio").optional().notEmpty().isString(),
    check("textos").optional().isArray(),
    check("fotos").optional().isArray(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = { validatorCrearPaginaComercio, validatorUpdateItemComercio }