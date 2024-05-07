const { usersModel } = require('../models')
const { matchedData } = require('express-validator')
const { handleHttpError } = require('../utils/handleError')
const { encrypt, compare } = require('../utils/handlePassword')

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

        //console.log(err)
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

        //console.log(err)
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

        const { city } = matchedData(req)

        const data = await usersModel.find({ ciudadUsuario: city })

        //Filtrar por los usuarios que tengan recibirOfertas = true
        const dataFiltrada = data.filter(user => user.permiteOfertas === true)

        res.status(200).send(dataFiltrada)

    } catch (err) {

        //console.log(err)
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
 * Actualiza los datos del usuario en la base de datos
 * @param {*} req
 * @param {*} res
 */
const updateItem = async (req, res) => {

    try {

        const body = matchedData(req)

        //Obtengo el user de la BBDD con el id que me llega en la request
        const user = await usersModel.findById({ _id: body.id});

        //Hashear la contraseña que me llega en la request
        const passwordUsuarioHasheada = body.passwordUsuario;

        //Si cambia la contraseña, tengo que volver a encriptarla; si no, la dejo igual. 
        const isPasswordMatch = await compare(passwordUsuarioHasheada, user.passwordUsuario);
        
        if (!isPasswordMatch) {
            body.passwordUsuario = passwordUsuarioHasheada
        }

        const data = await usersModel.findByIdAndUpdate({_id: body.id}, body)

        if (!data)
            return handleHttpError(res, 'Documento no encontrado', 404)
        else
            res.status(200).send(data)


    } catch (err) {
        console.log(err) 
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



module.exports = { getItems, getItem, getUser, updateItem, deleteItem, updateItem };