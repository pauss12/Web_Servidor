const { check } = require("express-validator")
const { validateResults } = require("../utils/handleValidator")

const validatorGetItem = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorGetUser = [
    check("username").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

/*const validatorGetEmail = [
    check("email").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]*/

const validatorUpdateItem = [
    check("id").exists().notEmpty().isMongoId(),
    // Al menos uno de los siguientes campos debe estar presente para la actualización
    check("nombreDelUsuario").optional(),
    check("email").optional(),
    check("password").optional(),
    check("username").optional(),
    check("biografia").optional(),
    check("instrumentos").optional(),
    check("horarioDeDisponibilidad").optional(),
    check("fotoDePerfil").optional(),
    check("permiteNotificaciones").optional(),
    (req, res, next) => validateResults(req, res, next)
];

module.exports = { validatorGetItem, validatorGetUser, validatorUpdateItem }