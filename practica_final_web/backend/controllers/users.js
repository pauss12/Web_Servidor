const { usersModel } = require('../models')
const { matchedData } = require('express-validator')
const { handleHttpError } = require('../utils/handleError')

/**
 * Obtener lista de usuarios de la base de datos
 * @param {*} req
 * @param {*} res
 */

const getItems = async (req, res) => {

    try {
        const data = await usersModel.find({})
        res.status(200).send(data)

    } catch (err) {

        console.log(err)
        handleHttpError(res, 'ERROR_GET_ITEMS')
    }
}

/**
 * Obtener usuario de la base de datos
 * @param {*} req
 * @param {*} res
 */

const getItem = async (req, res) => {

    try {

        const { id } = matchedData(req)

        const data = await usersModel.findById(id)

        res.status(200).send(data)

    } catch (err) {

        console.log(err)

        handleHttpError(res, "ERROR_GET_ITEM")
    }
}

/**
 * Obtener usuario de la base de datos
 * @param {*} req
 * @param {*} res
 */

const getUser = async (req, res) => {

    try {

        const { username } = matchedData(req)
        const data = await usersModel.find({ username: username })
        res.status(200).send(data)

    } catch (err) {

        console.log(err)
        handleHttpError(res, "ERROR_GET_ITEM")

    }
}

/*const getEmail = async (req, res) => {
    try {
        const { email } = matchedData(req)
        const data = await usersModel.find({ email: email })
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
 * Crea un nuevo usuario en la base de datos
 * @param {*} req
 * @param {*} res
*/
const createUsuario = async (req, res) => {

    try {

        const body = matchedData(req)

        const data = await usersModel.create(body)

        res.status(201).send(data)

    } catch (err) {

        console.log(err)
        handleHttpError(res, 'ERROR_CREATE_USUARIO')
    }
}


/**
 * Actualiza los datos del usuario en la base de datos
 * @param {*} req
 * @param {*} res
 */
const updateItem = async (req, res) => {

    try {

        const { id, ...body } = matchedData(req)
        const data = await usersModel.findByIdAndUpdate({ _id: id }, body);

        if (!data)
            return handleHttpError(res, 'Documento no encontrado', 404)
        else
            res.status(200).send(data)
    } catch (err) {
        //console.log(err) 
        handleHttpError(res, 'ERROR_UPDATE_ITEMS')
    }
}


/*const submitFile = async (req, res) => {
    try {
        const id = req.params.id
        const { body, file } = req
        const data = await usersModel.findByIdAndUpdate({ _id: id }, { $set: { fotoDePerfil: file.filename } })
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
const deleteItem = async (req, res) => {

    try {
        const { id } = matchedData(req)
        const data = await usersModel.deleteOne({ _id: id });

        res.status(200).send(data)
    } catch (err) {
        //console.log(err)
        handleHttpError(res, 'ERROR_DELETE_ITEM')
    }
}

/*const verificarUsuario = async (req, res) => {
    try {
        const { id } = matchedData(req)
        const data = await usersModel.findOneAndUpdate({ _id: id }, { verificado: true })
        res.status(200).send('Cuenta verificada correctamente')
    } catch (err) {
        console.log(err)
        handleHttpError(res, 'ERROR_VERIFICAR_USUARIO')
    }
}*/

module.exports = { getItems, getItem, getUser, updateItem, deleteItem, createUsuario };