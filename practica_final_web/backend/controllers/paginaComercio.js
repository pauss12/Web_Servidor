const { paginaModel } = require('../models')

const { matchedData } = require('express-validator')

const { handleHttpError } = require('../utils/handleError')

const { tokenSign } = require("../utils/handleJwt")

const { encrypt, compare } = require("../utils/handlePassword")

/**
 * Obtener lista de paginas de comercio de la base de datos sin ningun tipo de fitro
*/
const getPaginasComercio = async (req, res) => {

    try {

        const data = await paginaModel.find({})
        res.status(200).send(data)

    } catch (err) {

        console.log(err)
        handleHttpError(res, 'ERROR_GET_PAGINAS_COMERCIO')
    }
}

const loginComercio = async (req, res) => {

    try {

        req = matchedData(req)

        /*const comercio = await paginaModel.findOne({ _id: req._id }).select("passwordComercio nombreUsuario role emailUsuario")*/

        const comercio = await paginaModel.findOne({ emailComercio: req.emailComercio }).select("passwordComercio nombreComercio _id emailComercio")

        console.log(comercio)

        if (!comercio) {
            handleHttpError(res, "COMERCIO_NOT_EXISTS", 404)
            return
        }

        const hashPassword = comercio.passwordComercio;

        const check = await compare(req.passwordComercio, hashPassword)

        if (!check) {
            handleHttpError(res, "INVALID_PASSWORD", 401)
            return
        }

        //Si no quisiera devolver el hash del password
        comercio.set('passwordComercio', undefined, { strict: false })

        const data = {
            token: await tokenSign(comercio),
            comercio
        }

        res.send(data)

    } catch (err) {
        console.log(err)
        handleHttpError(res, "ERROR_LOGIN_USER")
    }
}

const createPaginaComercio = async (req, res) => {

    try {

        const body = matchedData(req)

        const data = await paginaModel.create(body)
        res.status(201).send(data)

    } catch (err) {

        console.log(err)

        handleHttpError(res, "ERROR_CREATE_PAGINA_COMERCIO")
    }
}



module.exports = { getPaginasComercio, createPaginaComercio, loginComercio }