const { comercioModel, paginaModel } = require('../models')
const { matchedData } = require('express-validator')
const { handleHttpError } = require('../utils/handleError')

const { tokenSigComercio } = require("../utils/handleJwt")
const { encrypt, compare } = require("../utils/handlePassword")
/**
 * Obtener lista de comercios de la base de datos sin ningun tipo de fitro
 * 
 * @param {*} req
 * @param {*} res
 */

const getComercios = async (req, res) => {

    try {
        
        const data = await comercioModel.find({})
        res.status(200).send(data)

    } catch (err) {

        //console.log(err)
        handleHttpError(res, 'ERROR_GET_COMERCIOS')
    }
}

/**
 * Obtener un comercio de la base de datos
 * @param {*} req
 * @param {*} res
 */

const getComercio = async (req, res) => {

    try {

        const { id } = matchedData(req)
        const data = await comercioModel.findById(id)
        res.status(200).send(data)

    } catch (err) {

        //console.log(err)
        handleHttpError(res, "ERROR_GET_COMERCIO")
    }
}

//Funcion para hacer login de un comercio y crear su pagina web
const loginComercio = async (req, res) => {

    try {

        req = matchedData(req)

        const comercio = await comercioModel.findOne({ emailComercio: req.emailComercio })

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
            token: await tokenSigComercio(comercio),
            comercio
        }

        res.send(data)

    } catch (err) {
        //console.log(err)
        handleHttpError(res, "ERROR_LOGIN_USER")
    }
}

//Funcion para crear un comercio
const createComercio = async (req, res) => {

    try {

        req = matchedData(req)

        const passwordComercio = await encrypt(req.passwordComercio)

        const body = { ...req, passwordComercio }

        const dataComercio = await comercioModel.create(body)

        dataComercio.set('passwordComercio', undefined, { strict: false })

        const data = {
            token: await tokenSigComercio(dataComercio),
            user: dataComercio
        }

        res.send(data)

    } catch (err) {

        //console.log(err)
        handleHttpError(res, 'ERROR_CREATE_COMERCIO')
    }
}

/**
 * Actualiza los datos del usuario en la base de datos
 * @param {*} req
 * @param {*} res
 */
const updateComercio = async (req, res) => {

    try {

        const { id, ...body } = matchedData(req)

        const data = await paginaModel.findByIdAndUpdate({ _id: id }, body);

        if (!data)
            return handleHttpError(res, 'PAGE NOT FOUND', 404)
        else
            res.status(200).send(data)

    } catch (err) {
        //console.log(err) 
        handleHttpError(res, 'ERROR_UPDATE_COMERCIOS')
    }
}

/**
 * Borra el usuario que el id recibidio
 * @param {*} req
 * @param {*} res
 */
const deleteComercio = async (req, res) => {

    try {

        const { id } = matchedData(req)

        const data = await comercioModel.deleteOne({ _id: id });

        //Si se elimina el comercio, habria que eliminar sus paginas de comercio
        await paginaModel.deleteOne({ idPagina: id })
        
        res.status(200).send(data)

    } catch (err) {

        //console.log(err)
        handleHttpError(res, 'ERROR_DELETE_ITEM')
    }
}

module.exports = { getComercios, getComercio, deleteComercio, updateComercio, createComercio, loginComercio };

