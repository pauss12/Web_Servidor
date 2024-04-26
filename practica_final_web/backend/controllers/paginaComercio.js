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



module.exports = { getPaginasComercio }