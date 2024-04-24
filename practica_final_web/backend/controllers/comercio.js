const { comercioModel } = require('../models')
const { matchedData } = require('express-validator')
const { handleHttpError } = require('../utils/handleError')

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

        console.log(err)
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

        console.log(err)

        handleHttpError(res, "ERROR_GET_COMERCIO")
    }
}

//Funcion para crear un comercio
const createComercio = async (req, res) => {

    try {

        //const { body } = req

        const body = matchedData(req)

        const data = await comercioModel.create(body)
        res.status(201).send(data)

    } catch (err) {

        console.log(err)
        handleHttpError(res, 'ERROR_CREATE_COMERCIO')
    }
}

/**
 * Obtener usuario de la base de datos
 * @param {*} req
 * @param {*} res
 */

/*const getComercio = async (req, res) => {

    try {

        const { username } = matchedData(req)
        const data = await comercioModel.find({ username: username })
        res.status(200).send(data)

    } catch (err) {

        console.log(err)
        handleHttpError(res, "ERROR_GET_ITEM")

    }
}*/

/*const getEmail = async (req, res) => {
    try {
        const { email } = matchedData(req)
        const data = await comercioModel.find({ email: email })
        if (data.length > 0)
            res.status(200).send(data)
        else
            handleHttpError(res, "ERROR_EMAIL_DONT_EXIST")
    } catch (err) {
        console.log(err)
        handleHttpError(res, "ERROR_GET_ITEM")
    }
}*/

/**
 * Actualiza los datos del usuario en la base de datos
 * @param {*} req
 * @param {*} res
 */
const updateComercio = async (req, res) => {

    try {

        const { id, ...body } = matchedData(req)

        const data = await comercioModel.findByIdAndUpdate({ _id: id }, body);

        if (!data)
            return handleHttpError(res, 'Documento no encontrado', 404)
        else
            res.status(200).send(data)

    } catch (err) {
        //console.log(err) 
        handleHttpError(res, 'ERROR_UPDATE_COMERCIOS')
    }
}

/*const submitFile = async (req, res) => {
    try {
        const id = req.params.id
        const { body, file } = req
        const data = await comercioModel.findByIdAndUpdate({ _id: id }, { $set: { fotoDePerfil: file.filename } })
        res.status(200).send(data)
    } catch (err) {
        console.log(err)
        handleHttpError(res, 'ERROR_SUBMIT_FILE')
    }
}*/


/**
 * Borra el usuario que el id recibidio
 * @param {*} req
 * @param {*} res
 */
const deleteComercio = async (req, res) => {

    try {

        const { id } = matchedData(req)

        console.log("El id es " + id)

        const data = await comercioModel.deleteOne({ _id: id });

        res.status(200).send(data)

    } catch (err) {

        console.log(err)
        handleHttpError(res, 'ERROR_DELETE_ITEM')
    }
}

/*const verificarUsuario = async (req, res) => {
    try {
        const { id } = matchedData(req)
        const data = await comercioModel.findOneAndUpdate({ _id: id }, { verificado: true })
        res.status(200).send('Cuenta verificada correctamente')
    } catch (err) {
        console.log(err)
        handleHttpError(res, 'ERROR_VERIFICAR_USUARIO')
    }
}*/

module.exports = { getComercios, getComercio, deleteComercio, updateComercio, createComercio};

