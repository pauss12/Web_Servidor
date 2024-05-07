const { check } = require("express-validator")

const { validateResults } = require("../utils/handleValidator")


const validatorCreateComercio = [

    check("nombreComercio").exists().notEmpty(),
    check("cifComercio").exists().notEmpty(),
    check("direccionComercio").exists().notEmpty(),
    check("emailComercio").exists().notEmpty(),
    check("passwordComercio").exists().notEmpty(),
    check("telefonoComercio").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

module.exports = { validatorCreateComercio }