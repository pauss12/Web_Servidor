const { paginaModel } = require('../models')

const { matchedData } = require('express-validator')

const { handleHttpError } = require('../utils/handleError')

const { verifyToken } = require('../utils/handleJwt')

/**
 * Obtener lista de paginas de comercio de la base de datos sin ningun tipo de fitro
*/
const getPaginasComercio = async (req, res) => {

    try {

        const data = await paginaModel.find({})
        res.status(200).send(data)

    } catch (err) {

        //console.log(err)
        handleHttpError(res, 'ERROR_GET_PAGINAS_COMERCIO')
    }
}

const getPaginaComercio = async (req, res) => {

    console.log("getPaginaComercio")

    try {
        
        const { id } = matchedData(req)

        const data = await paginaModel.findOne({ _id: id })
        res.status(200).send(data)
        

    } catch (err) {

        console.log(err)
        handleHttpError(res, "ERROR_GET_ITEM")

    }
}



const createPaginaComercio = async (req, res) => {

    try {

        const body = matchedData(req)

        const token = req.headers.authorization.split(' ').pop()
        
        const dataToken = await verifyToken(token)

        body.idPagina = dataToken._id;

        const data = await paginaModel.create(body)

        res.status(200).send(data)

    } catch (err) {

        //console.log(err)
        handleHttpError(res, "ERROR_CREATE_PAGINA_COMERCIO")
    }
}

const deletePaginaComercio = async (req, res) => {

    try {

        const { id } = matchedData(req)

        const data = await paginaModel.deleteOne({ _id: id });

        res.status(200).send(data)

    } catch (err) {

        //console.log(err)
        handleHttpError(res, 'ERROR_DELETE_ITEM')
    }
}




module.exports = { getPaginasComercio, createPaginaComercio, deletePaginaComercio, getPaginaComercio }