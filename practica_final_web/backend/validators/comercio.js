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
    check("direccionComercio").exists().notEmpty().isString(),
    check("emailComercio").exists().notEmpty().isString(),
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
    check("direccionComercio").optional().notEmpty(),
    check("emailComercio").optional().notEmpty(),
    check("passwordComercio").optional().notEmpty(),
    check("telefonoContacto").optional().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }

]

const validatorLoginComercio = [

    check("emailComercio").exists().notEmpty().isEmail(),
    check("passwordComercio").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]


module.exports = { validatorGetItem, validatorCreateItem, validatorUpdateItemAdmin, validatorLoginComercio }