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
    check("passwordComercio").exists().notEmpty().isString(),
    check("telefonoContacto").exists().notEmpty().isString(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }

]

const validatorUpdateItemAdmin = [

    //Checkear el id de mongo
    check("id").exists().notEmpty().isMongoId(),
    //Checkear si el resto como opcional
    check("nombreComercio").optional().notEmpty(),
    check("cifComercio").optional().notEmpty(),
    check("direccion").optional().notEmpty(),
    check("email").optional().notEmpty(),
    check("passwordComercio").optional().notEmpty(),
    check("telefonoContacto").optional().notEmpty(),
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

module.exports = { validatorGetItem, validatorCreateItem, validatorUpdateItemAdmin, validatorUpdateItemComercio }