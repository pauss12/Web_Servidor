const { comercioModel } = require("../models")
const { handleHttpError } = require("../utils/handleError")
const { verifyToken } = require("../utils/handleJwt")

const checkRol = (roles) => (req, res, next) => {

    try {

        const { user } = req

        const userRol = user.role

        const checkValueRol = roles.includes(userRol)

        if (!checkValueRol) {

            handleHttpError(res, "NOT_ALLOWED", 403)
            return ;
        }

        next()

    } catch (err) {

        handleHttpError(res, "ERROR_PERMISSIONS", 403)
    }
}

//Checkear que el comercio que se va a editar sea del comercio propio
const checkearComercio = async (req, res, next) => {
    
    try {

        if (!req.headers.authorization) {
            handleHttpError(res, "NOT_TOKEN", 401)
            return
        }

        // Nos llega la palabra reservada Bearer (es un estándar) y el Token, así que me quedo con la última parte
        const token = req.headers.authorization.split(' ').pop()
        
        // Verificar el token
        const dataToken = await verifyToken(token)

        if (!dataToken) {
            handleHttpError(res, "NOT_PAYLOAD_DATA", 401)
            retrun
        }

        if (!dataToken._id) {
            handleHttpError(res, "ERROR_ID_TOKEN", 401)
            return
        }

        const comercio = await comercioModel.findById(dataToken._id)

        //Añadimos el usuario a la request
        req.comercio = comercio

        //Pasamos al siguiente middleware
        next()

    } catch (error) {
       
        handleHttpError(res, "NOT_SESSION", 403)
    }
}

module.exports = { checkRol, checkearComercio }