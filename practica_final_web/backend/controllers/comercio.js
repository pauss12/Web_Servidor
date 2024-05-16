const { comercioModel, paginaModel } = require('../models')
const { matchedData } = require('express-validator')
const { handleHttpError } = require('../utils/handleError')

const { tokenSigComercio } = require("../utils/handleJwt")
const { encrypt, compare } = require("../utils/handlePassword")

const jwt = require('jsonwebtoken')

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

        const dataComercio = await comercioModel.findOne({ emailComercio: req.emailComercio })

        if (!dataComercio) {
            handleHttpError(res, "COMERCIO_NOT_EXISTS", 404)
            return
        }

        const hashPassword = dataComercio.passwordComercio;

        const check = await compare(req.passwordComercio, hashPassword)

        if (!check) {
            handleHttpError(res, "INVALID_PASSWORD", 401)
            return
        }

        //Si no quisiera devolver el hash del password
        dataComercio.set('passwordComercio', undefined, { strict: false })

        const data = {
            token: await tokenSigComercio(dataComercio),
            dataComercio
        }

        res.send(data)

    } catch (err) {
        //console.log(err)
        handleHttpError(res, "ERROR_LOGIN_COMERCIO")
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
            dataComercio
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

        const token = req.headers.authorization.split(' ').pop()
        const tokenDecodificado = jwt.decode(token)

        //Comprobar que el id del token y el id de pagina del merchant coinciden
        const comercio = await paginaModel.findOne({ idPagina: tokenDecodificado._id })
        
        if (!comercio) {
            handleHttpError(res, "THERE IS NO MERCHANT`S PAGES", 404)
            return
        }

        if (comercio._id.toString() != id) {
            handleHttpError(res, "ID_MERCHANT_DOES_NOT_MATCH", 401)
            return
        }

        const data = await paginaModel.findByIdAndUpdate({ _id: id }, body);

        if (!data)
            return handleHttpError(res, 'PAGE NOT FOUND', 404)
        else
        {
            //Si ha ido bien, devuelvo los datos actualizados
            const datosActualizados = await paginaModel.findById({ _id:id })

            const data = {
                token: await tokenSigComercio(datosActualizados),
                pagina: datosActualizados
            }

            res.status(200).send(data)
        }

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

