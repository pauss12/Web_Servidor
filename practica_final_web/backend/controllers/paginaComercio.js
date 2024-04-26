const { paginaModel } = require('../models')

const { matchedData } = require('express-validator')

const { handleHttpError } = require('../utils/handleError')

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



const createPaginaComercio = async (req, res) => {

    try {

        const body = matchedData(req)

        const data = await paginaModel.create(body)
        res.status(200).send(data)

    } catch (err) {

        console.log(err)

        handleHttpError(res, "ERROR_CREATE_PAGINA_COMERCIO")
    }
}

const deletePaginaComercio = async (req, res) => {

    try {

        const { id } = matchedData(req)

        const data = await paginaModel.deleteOne({ _id: id });

        res.status(200).send(data)

    } catch (err) {

        console.log(err)
        handleHttpError(res, 'ERROR_DELETE_ITEM')
    }
}




module.exports = { getPaginasComercio, createPaginaComercio, deletePaginaComercio }